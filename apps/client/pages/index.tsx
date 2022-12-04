import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { useGet } from '../hooks/useGet';
import { Primary } from '../layouts/primary/primary';

export default function Home() {
  const { data, status } = useGet<{ url: string }>('/api/request-token');
  const url = data?.url;

  return (
    <Box position="relative">
      <LoadingOverlay loading={status === 'LOADING'} />
      <Primary
        title="Farcaster to Twitter Crossposting"
        description={[
          'Automatically post your Farcaster casts to Twitter. Promote your Farcaster account and make your thoughts go farther.',
          'Connect your Twitter account to get started.',
        ]}
      >
        <ButtonGroup alignItems="center">
          <Button
            size="lg"
            variant="solid"
            colorScheme="twitter"
            as="a"
            href={url || ''}
            disabled={Boolean(status !== 'READY')}
          >
            Connect Twitter
          </Button>
        </ButtonGroup>
      </Primary>
    </Box>
  );
}
