import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import { useIsClient } from 'usehooks-ts';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { useGet } from '../hooks/useGet';
import { Primary } from '../layouts/primary/primary';

import { trpc } from '@twitcaster/trpc-next';

export default function Home() {
  const isClient = useIsClient();

  const { data, status } = useGet<{ url: string }>('/api/request-token');

  const blah = trpc.example.hello.useQuery();

  console.log(blah.data);

  return (
    <Box position="relative">
      <LoadingOverlay loading={isClient && status === 'LOADING'} />
      <Primary
        title="Farcaster to Twitter Crossposting"
        description={[
          'Automatically post your Farcaster casts to Twitter. Promote your Farcaster account and make your thoughts go farther.',
          'Connect your Twitter account to get started.',
        ]}
      >
        <ButtonGroup alignItems="center">
          {isClient && (
            <Button
              size="lg"
              variant="solid"
              colorScheme="twitter"
              as={'a'}
              href={data?.url || ''}
              disabled={Boolean(status !== 'READY')}
            >
              Connect Twitter
            </Button>
          )}
        </ButtonGroup>
      </Primary>
    </Box>
  );
}
