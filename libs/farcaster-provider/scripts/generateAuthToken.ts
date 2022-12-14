import { Wallet, utils } from 'ethers';
import canonicalize = require('canonicalize');
import * as dotenv from 'dotenv';

dotenv.config();

async function generateBearerToken(timestamp: number) {
  if (!process.env.FARCASTER_MNEMONIC) {
    throw new Error('Farcaster Mnemonic not found');
  }

  const wallet = Wallet.fromMnemonic(process.env.FARCASTER_MNEMONIC);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const payload = canonicalize({
    method: 'generateToken',
    params: {
      timestamp,
    },
  });

  if (!payload) {
    throw new Error('Payload is undefined');
  }

  const signature = Buffer.from(
    utils.arrayify(await wallet.signMessage(payload))
  ).toString('base64');

  return `eip191:${signature}`;
}

async function getAuthToken() {
  const timestamp = new Date().valueOf();
  const payload = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${await generateBearerToken(timestamp)}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      method: 'generateToken',
      params: {
        timestamp,
      },
    }),
  };

  const response = await fetch('https://api.farcaster.xyz/v2/auth', payload);

  if (response.status !== 200) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  return data.result.token.secret;
}

async function generateAuthToken() {
  const token = await getAuthToken();
  console.log(`
  Farcaster Auth Token:
  ${token}
  `);
}

generateAuthToken();
