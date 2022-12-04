import { Button, ButtonGroup, Box } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useMemo } from 'react';
import { useIsClient, useLocalStorage } from 'usehooks-ts';
import { LoadingOverlay } from '../components/LoadingOverlay/LoadingOverlay';
import { useGet } from '../hooks/useGet';
import { Primary } from '../layouts/primary/primary';

export default function Home() {
  const [userId] = useLocalStorage('userId', '');
  const [screenName] = useLocalStorage('screenName', '');
  const [accessToken] = useLocalStorage('accessToken', '');
  const isClient = useIsClient();

  const hasTwitterAuth = Boolean(userId && screenName && accessToken);

  const { data, status } = useGet<{ url: string }>(
    '/api/request-token',
    undefined,
    hasTwitterAuth
  );

  const buttonHref = useMemo(() => {
    if (hasTwitterAuth) {
      return '/settings';
    }
    return data?.url || '';
  }, [data?.url, hasTwitterAuth]);

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
              as={hasTwitterAuth ? NextLink : 'a'}
              href={buttonHref}
              disabled={!hasTwitterAuth && Boolean(status !== 'READY')}
            >
              {hasTwitterAuth ? 'Edit Settings' : 'Connect Twitter'}
            </Button>
          )}
        </ButtonGroup>
      </Primary>
    </Box>
  );
}
