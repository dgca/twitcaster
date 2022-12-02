import {
  getRequestToken,
  handleTwitterCallback,
} from '@twitcaster/twitter-provider';
import * as express from 'express';

const app = express();
app.use(express.json());

app.get('/api/request-token', async function (req, res) {
  const response = await getRequestToken('http://localhost:4200');

  console.log({ response });

  res.send({ url: response.url });
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
    res.status(500).send({
      error: 'Could not get Twitter user details, please try again',
    });
    return;
  }

  res.status(200).send({
    data: {
      userDetails,
    },
  });
});

const server = app.listen(process.env.API_PORT, () => {
  console.log(`Listening at http://localhost:${process.env.API_PORT}/api`);
});

server.on('error', console.error);
