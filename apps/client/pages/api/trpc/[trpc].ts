import { createNextApiHandler } from '@trpc/server/adapters/next';

import { createContext, appRouter } from '@twitcaster/server';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) => {
    console.error(`tRPC failed on ${path}: ${error}`);
  },
});
