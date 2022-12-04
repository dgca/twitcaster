import { getDbClient } from './getDbClient';

export async function updateUser({
  userId,
  accessToken,
  fid,
  fname,
  withFcastMeLink,
}: {
  userId: string;
  accessToken: string;
  fid: number;
  fname: string;
  withFcastMeLink: boolean;
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
      },
    },
    {
      projection: {
        accessSecret: 0,
      },
    }
  );
}
