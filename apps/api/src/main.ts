import { getUser, updateUser } from '@twitcaster/db-provider';
import {
  getRequestToken,
  handleTwitterCallback,
} from '@twitcaster/twitter-provider';
import * as express from 'express';
import {
  FarcasterMonitor,
  fetchFarcaster,
} from '@twitcaster/farcaster-provider';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(function useSecret(request, response, next) {
  if (
    !request.headers['x-api-secret'] ||
    request.headers['x-api-secret'] !== process.env.API_SECRET
  ) {
    return response.status(400).send({
      error: 'Invalid x-api-secret header',
    });
  }
  next();
});

const farcasterMonitor = new FarcasterMonitor();

app.get('/api/request-token', async function (req, res) {
  const response = await getRequestToken();

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
  const { state, code } = req.body;

  if (
    !state ||
    !code ||
    typeof state !== 'string' ||
    typeof code !== 'string'
  ) {
    res.status(400).send({
      error: 'Ivalid twitter state or code',
    });
    return;
  }

  const userDetails = await handleTwitterCallback({
    state,
    code,
  });

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
  const { userId, fname, withFcastMeLink } = req.body;
  const accessToken = req.headers.authorization;

  if (
    typeof userId !== 'string' ||
    typeof fname !== 'string' ||
    typeof withFcastMeLink !== 'boolean' ||
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
  });

  if (!result.ok || !result.value) {
    return res.status(500).send({
      error: 'Could not update user, please try again',
    });
  }

  farcasterMonitor.addListener(userId);

  res.status(200).send({
    user: result.value,
  });
});

const server = app.listen(process.env.API_PORT, () => {
  console.log(`Listening at http://localhost:${process.env.API_PORT}/api`);
});

server.on('error', console.error);
