import { getUser, updateUser } from '@twitcaster/db-provider';
import {
  getRequestToken,
  handleTwitterCallback,
} from '@twitcaster/twitter-provider';
import * as express from 'express';
import { fetchFarcaster } from '@twitcaster/farcaster-provider';

const app = express();
app.use(express.json());

app.get('/api/request-token', async function (req, res) {
  if (!process.env.NEXT_ORIGIN) {
    throw new Error('NEXT_ORIGIN not found');
  }

  const response = await getRequestToken(process.env.NEXT_ORIGIN);

  res.send({ url: response.url });
});

app.get('/api/user', async function (req, res) {
  const userId = req.query.userId;
  const accessToken = req.headers.authorization;

  if (typeof userId !== 'string' || typeof accessToken !== 'string') {
    return res.status(400).send({
      error: 'Invalid request',
    });
  }

  const user = await getUser({
    userId,
    accessToken: accessToken.replace('Bearer ', ''),
  });

  res.send({ user });
});

app.get('/api/farcaster-user', async function (req, res) {
  const { fname } = req.query;

  if (typeof fname !== 'string') {
    return res.status(400).send({
      error: 'Invalid fname value',
    });
  }

  try {
    const response = await fetchFarcaster(
      `/v2/user-by-username?username=${fname}`
    );
    const data = await response.json();
    res.status(response.status).send(data);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Something went wrong. Please try again';
    res.status(500).send({
      error: message,
    });
  }
});

app.post('/api/handle-callback', async function (req, res) {
  const { oauthToken, oauthVerifier } = req.body;

  console.log(oauthToken, oauthVerifier, req.body);

  if (
    !oauthToken ||
    !oauthVerifier ||
    typeof oauthToken !== 'string' ||
    typeof oauthVerifier !== 'string'
  ) {
    res.status(400).send({
      error: 'Ivalid oauthToken or oauthVerifier',
    });
    return;
  }

  const userDetails = await handleTwitterCallback(oauthToken, oauthVerifier);

  if (!userDetails) {
    return res.status(500).send({
      error: 'Could not get Twitter user details, please try again',
    });
  }

  res.status(200).send({
    data: {
      userDetails,
    },
  });
});

app.post('/api/save-settings', async function (req, res) {
  const { userId, fname, withFcastMeLink, withFarcasterHandle } = req.body;
  const accessToken = req.headers.authorization;

  if (
    typeof userId !== 'string' ||
    typeof fname !== 'string' ||
    typeof withFcastMeLink !== 'boolean' ||
    typeof withFarcasterHandle !== 'boolean' ||
    typeof accessToken !== 'string'
  ) {
    return res.status(400).send({
      error: 'Invalid request',
    });
  }

  const farcasterUser = await fetchFarcaster(
    `/v2/user-by-username?username=${fname}`
  ).then((res) => res.json());

  const fid = farcasterUser?.result?.user?.fid;

  if (!fid || typeof fid !== 'number') {
    return res.status(400).send({
      error: `Could not find farcaster user with name: ${fname}`,
    });
  }

  const result = await updateUser({
    userId,
    accessToken: accessToken.replace('Bearer ', ''),
    fid,
    fname,
    withFcastMeLink,
    withFarcasterHandle,
  });

  if (!result.ok || !result.value) {
    return res.status(500).send({
      error: 'Could not update user, please try again',
    });
  }

  res.status(200).send({
    user: result.value,
  });
});

const server = app.listen(process.env.API_PORT, () => {
  console.log(`Listening at http://localhost:${process.env.API_PORT}/api`);
});

server.on('error', console.error);
