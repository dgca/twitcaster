import type { NextApiRequest, NextApiResponse } from 'next';

export default async function farcasterUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fname = req.query.fname;

    const response = await fetch(
      `${process.env.API_ORIGIN}/api/farcaster-user?fname=${fname}`,
      {
        headers: {
          Authorization: req.headers.authorization ?? '',
          'x-api-secret': process.env.API_SECRET ?? '',
        },
      }
    );

    const data = await response.json();
    res.status(response.status).send(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong';
    res.status(500).send({
      error: message,
    });
  }
}
