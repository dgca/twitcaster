import { type UserDetails, upsertUser } from '@twitcaster/db-provider';
import TwitterApi from 'twitter-api-v2';
import { tokenStore } from '../utils/tokenStoreV2';

type HandleCallbackArgs = {
  state: string;
  code: string;
};

async function getTwitterUserDetails({
  state,
  code,
}: HandleCallbackArgs): Promise<UserDetails | null> {
  try {
    const codeVerifier = tokenStore.getVerifier(state);

    if (
      typeof process.env.TWITTER_CLIENT_ID !== 'string' ||
      typeof process.env.TWITTER_CLIENT_SECRET !== 'string' ||
      typeof process.env.CLIENT_ORIGIN !== 'string'
    ) {
      throw new Error('Twitter environment variables not found');
    }

    if (!code) {
      throw new Error(`Could not find code`);
    }

    if (!codeVerifier) {
      throw new Error(`Could not find verifier`);
    }

    const tempClient = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });

    const { client, accessToken, refreshToken, expiresIn } =
      await tempClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: `${process.env.CLIENT_ORIGIN}/callback`,
      });

    if (!refreshToken) {
      throw new Error('Did not receive refresh token');
    }

    const user = await client.currentUserV2();
    const userId = user.data.id;
    const screenName = user.data.username;
    // We'll set the expiration date of the token as five minutes
    // before it actually expires just to be safe
    const expiresAt = new Date().valueOf() + expiresIn * 1000 - 1000 * 60 * 5;

    return { accessToken, refreshToken, expiresAt, userId, screenName };
  } catch (error) {
    console.error('Error creating Twitter client for user', error);
    return null;
  }
}

export async function handleTwitterCallback({
  state,
  code,
}: HandleCallbackArgs) {
  const userDetails = await getTwitterUserDetails({ state, code });

  if (!userDetails) {
    return null;
  }

  const upsertResult = await upsertUser(userDetails);

  if (!upsertResult) {
    return null;
  }

  return {
    screenName: userDetails.screenName,
    userId: userDetails.userId,
    accessToken: userDetails.accessToken,
  };
}
