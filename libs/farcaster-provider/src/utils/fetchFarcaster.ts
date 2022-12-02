export function fetchFarcaster(endpoint: string, requestInit?: RequestInit) {
  return fetch(`https://api.farcaster.xyz${endpoint}`, requestInit);
}
