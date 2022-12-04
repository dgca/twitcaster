import TwitterApi from 'twitter-api-v2';
import { tokenStore } from '../utils/tokenStoreV2';

export async function getRequestToken() {
  if (
    typeof process.env.TWITTER_CLIENT_ID !== 'string' ||
    typeof process.env.TWITTER_CLIENT_SECRET !== 'string' ||
    typeof process.env.NEXT_ORIGIN !== 'string'
  ) {
    throw new Error('Twitter environment variables not found');
  }

  const client = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  });

  const authLink = await client.generateOAuth2AuthLink(
    `${process.env.NEXT_ORIGIN}/callback`,
    {
      scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    }
  );

  const { codeVerifier, state } = authLink;

  tokenStore.storeVerifier({ state, codeVerifier });

  return authLink;
}
