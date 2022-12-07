import { getDbClient } from './getDbClient';

export async function updateUser({
  userId,
  accessToken,
  fid,
  fname,
  withFcastMeLink,
  withHashTagOnly,
}: {
  userId: string;
  accessToken: string;
  fid: number;
  fname: string;
  withFcastMeLink: boolean;
  withHashTagOnly: boolean;
}) {
  const client = await getDbClient();
  const users = client.db('db').collection('users');

  return users.findOneAndUpdate(
    {
      userId,
      accessToken,
    },
    {
      $set: {
        fid,
        fname,
        withFcastMeLink,
        withHashTagOnly,
      },
    },
    {
      projection: {
        accessSecret: 0,
      },
    }
  );
}
