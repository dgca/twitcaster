import { getDbClient } from './getDbClient';

export async function getUser({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) {
  const client = await getDbClient();
  const users = client.db('db').collection('users');
  return users.findOne(
    {
      userId,
      accessToken,
    },
    {
      projection: {
        accessSecret: 0,
      },
    }
  );
}

export async function getFullUserObjectByUserId({
  userId,
}: {
  userId: string;
}) {
  const client = await getDbClient();
  const users = client.db('db').collection('users');
  return users.findOne({
    userId,
  });
}
