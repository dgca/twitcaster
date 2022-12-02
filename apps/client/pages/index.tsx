import { Button, ButtonGroup } from '@chakra-ui/react';
import { NextPage } from 'next';
import { Primary } from '../layouts/primary/primary';

const Home: NextPage<{ twitterLoginUrl: string }> = ({ twitterLoginUrl }) => {
  return (
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
          href={twitterLoginUrl}
        >
          Connect Twitter
        </Button>
      </ButtonGroup>
    </Primary>
  );
};

Home.getInitialProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_ORIGIN ?? ''}/api/request-token`
  ).then((res) => res.json());

  return {
    twitterLoginUrl: response.url,
  };
};

export default Home;
