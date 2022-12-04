import { getDbClient } from './getDbClient';
import type { UserDetails } from './types';

export async function upsertUser({
  userId,
  screenName,
  accessToken,
  refreshToken,
  expiresAt,
}: UserDetails) {
  try {
    const client = await getDbClient();
    const db = client.db('db');
    const users = db.collection('users');
    const user = await users.findOne({ userId });

    let result = null;

    if (user) {
      result = await users.updateOne(
        {
          userId,
        },
        {
          $set: {
            screenName,
            accessToken,
            refreshToken,
            expiresAt,
          },
        }
      );
    } else {
      result = await users.insertOne({
        userId,
        screenName,
        accessToken,
        refreshToken,
        expiresAt,
        fid: null,
        fname: '',
        withFcastMeLink: true,
      });
    }

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}
