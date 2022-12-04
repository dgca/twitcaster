import type { NextApiRequest, NextApiResponse } from 'next';

export default async function saveSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);

    const response = await fetch(
      `${process.env.API_ORIGIN}/api/save-settings`,
      {
        method: 'POST',
        headers: {
          Authorization: req.headers.authorization ?? '',
          'content-type': 'application/json',
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
