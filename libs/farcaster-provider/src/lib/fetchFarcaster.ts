export function fetchFarcaster(endpoint: string, requestInit?: RequestInit) {
  if (!process.env.FARCASTER_AUTH_TOKEN) {
    throw new Error('Farcaster auth token not found');
  }

  return fetch(`https://api.farcaster.xyz${endpoint}`, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: `Bearer ${process.env.FARCASTER_AUTH_TOKEN}`,
    },
  });
}
