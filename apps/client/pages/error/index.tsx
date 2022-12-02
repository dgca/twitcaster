import { Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';
import { Primary } from '../../layouts/primary/primary';

export default function Error() {
  return (
    <Primary
      title="Something went wrong"
      description="There was a problem connecting your Twitter account. Please go back and try again."
    >
      <ButtonGroup alignItems="center">
        <Button size="lg" variant="solid" href="/" as={Link}>
          Try Again
        </Button>
      </ButtonGroup>
    </Primary>
  );
}
