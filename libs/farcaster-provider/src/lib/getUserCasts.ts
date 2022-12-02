import { fetchFarcaster } from '../utils/fetchFarcaster';

export function getUserCasts(farcasterId: string | number) {
  return fetchFarcaster(`/v2/casts?fid=${farcasterId}`, {
    headers: {
      Authorization: `Bearer ${process.env.FARCASTER_AUTH_TOKEN}`,
    },
  });
}
