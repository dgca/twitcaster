import { type UserDetails, upsertUser } from '@twitcaster/db-provider';
import TwitterApi from 'twitter-api-v2';
import { tokenStore } from '../utils/tokenStore';

async function getTwitterUserDetails(
  oauthToken: string,
  oauthVerifier: string
): Promise<UserDetails | null> {
  try {
    const oauthSecret = tokenStore.getSecret(oauthToken);

    if (
      typeof process.env.TWITTER_API_KEY !== 'string' ||
      typeof process.env.TWITTER_API_KEY_SECRET !== 'string'
    ) {
      throw new Error('Twitter environment variables not found');
    }

    if (!oauthSecret) {
      throw new Error(`Could not find OAuth secret for token: ${oauthToken}`);
    }

    if (!oauthVerifier) {
      throw new Error(`Could not find OAuth verifier for token: ${oauthToken}`);
    }

    const tempClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_KEY_SECRET,
      accessToken: oauthToken,
      accessSecret: oauthSecret,
    });

    const { accessToken, accessSecret, screenName, userId } =
      await tempClient.login(oauthVerifier);

    return { accessToken, accessSecret, screenName, userId };
  } catch (error) {
    console.error('Error creating Twitter client for user', error);
    return null;
  }
}

export async function handleTwitterCallback(
  oauthToken: string,
  oauthVerifier: string
) {
  const userDetails = await getTwitterUserDetails(oauthToken, oauthVerifier);

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
