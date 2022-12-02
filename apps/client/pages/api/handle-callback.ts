import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
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
        },
        body: req.body,
      }
    );

    const data = await response.json();

    if (
      response.status.toString().startsWith('4') ||
      response.status.toString().startsWith('5')
    ) {
      throw data;
    }

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(
      err ?? {
        error: 'Something went wrong',
      }
    );
  }
}

export const config = {
  api: {
    bodyParse: false,
  },
};
