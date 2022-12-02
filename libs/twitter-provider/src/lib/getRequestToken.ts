import TwitterApi from 'twitter-api-v2';
import { tokenStore } from '../utils/tokenStore';

export async function getRequestToken(urlPrefix: string) {
  if (
    typeof process.env.TWITTER_API_KEY !== 'string' ||
    typeof process.env.TWITTER_API_KEY_SECRET !== 'string'
  ) {
    throw new Error('Twitter environment variables not found');
  }

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
  });

  const authLink = await client.generateAuthLink(`${urlPrefix}/callback`);
  const oauthToken = authLink.oauth_token;
  const oauthTokenSecret = authLink.oauth_token_secret;

  tokenStore.storeSecret(oauthToken, oauthTokenSecret);

  return authLink;
}
