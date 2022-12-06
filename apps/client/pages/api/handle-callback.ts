import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handleCallback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `${process.env.API_ORIGIN}/api/handle-callback`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-secret': process.env.API_SECRET ?? '',
        },
        body: JSON.stringify(req.body),
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
