import { getDbClient, UserDetails } from '@twitcaster/db-provider';
import { TwitterApi } from 'twitter-api-v2';

export async function sendTweet({
  userId,
  tweet,
}: {
  userId: string;
  tweet: string;
}) {
  const twitterClient = await getUserTwitterClient({ userId });
  return twitterClient.v2.tweet(tweet);
}

async function handleRefreshToken({ userId }: { userId: string }) {
  if (
    typeof process.env.TWITTER_CLIENT_ID !== 'string' ||
    typeof process.env.TWITTER_CLIENT_SECRET !== 'string'
  ) {
    throw new Error('Twitter environment variables not found');
  }

  const dbClient = await getDbClient();
  const users = dbClient.db('db').collection('users');
  const user = await users.findOne<UserDetails>({
    userId,
  });

  if (!user) {
    throw new Error(`Could not find user with id: ${userId}`);
  }

  if (user.expiresAt > new Date().valueOf()) {
    return user;
  }

  const tempClient = new TwitterApi({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  });
  const { accessToken, client, expiresIn, refreshToken } =
    await tempClient.refreshOAuth2Token(user.refreshToken);

  if (!refreshToken) {
    throw new Error('Did not receive a Twitter refresh token');
  }

  const twitterUser = await client.currentUserV2();

  const updateUserResult = await users.findOneAndUpdate(
    {
      userId,
    },
    {
      $set: {
        screenName: twitterUser.data.username,
        accessToken,
        refreshToken,
        expiresAt: new Date().valueOf() + expiresIn * 1000 - 1000 * 60 * 5,
      },
    }
  );

  if (!updateUserResult.ok || !updateUserResult.value) {
    throw new Error('Could not refresh Twitter access token');
  }

  return updateUserResult.value;
}

async function getUserTwitterClient({ userId }: { userId: string }) {
  if (
    typeof process.env.TWITTER_CLIENT_ID !== 'string' ||
    typeof process.env.TWITTER_CLIENT_SECRET !== 'string'
  ) {
    throw new Error('Twitter environment variables not found');
  }

  const user = await handleRefreshToken({ userId });

  return new TwitterApi(user.accessToken);
}
