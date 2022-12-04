import { Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Primary } from '../../layouts/primary/primary';

export default function Error() {
  const [userId, setUserId] = useLocalStorage('userId', '');
  const [screenName, setScreenName] = useLocalStorage('screenName', '');
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    setUserId('');
    setScreenName('');
    setAccessToken('');
  }, [setAccessToken, setScreenName, setUserId]);

  return (
    <Primary
      title="Something went wrong"
      description={[
        'There was a problem connecting your Twitter account. Your access token may be expired.',
        'Please go back and re-authorize your Twitter account.',
      ]}
    >
      <ButtonGroup alignItems="center">
        <Button size="lg" variant="solid" href="/" as={Link}>
          Try Again
        </Button>
      </ButtonGroup>
    </Primary>
  );
}
