import { getDbClient } from './getDbClient';

export async function updateUser({
  userId,
  accessToken,
  fid,
  fname,
  withFcastMeLink,
  withFarcasterHandle,
}: {
  userId: string;
  accessToken: string;
  fid: number;
  fname: string;
  withFcastMeLink: boolean;
  withFarcasterHandle: boolean;
}) {
  const client = await getDbClient();
  const users = client.db('db').collection('users');

  console.log('updating', {
    userId,
    accessToken,
    fname,
    withFcastMeLink,
    withFarcasterHandle,
  });

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
        withFarcasterHandle,
      },
    },
    {
      projection: {
        accessSecret: 0,
      },
    }
  );
}
