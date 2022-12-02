import { useUserStore } from '../../stores/userStore';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { VStack } from '@chakra-ui/react';
import { Primary } from '../../layouts/primary/primary';

async function handleCallback({
  oauthToken,
  oauthVerifier,
  onSuccess,
  onError,
}: {
  oauthToken?: string;
  oauthVerifier?: string;
  onSuccess: ({
    screenName,
    userId,
  }: {
    screenName: string;
    userId: string;
  }) => void;
  onError: (error: unknown) => void;
}) {
  try {
    const response = await fetch('/api/handle-callback', {
      method: 'POST',
      body: JSON.stringify({
        oauthToken,
        oauthVerifier,
      }),
    });

    const result = await response.json();

    if (response.status !== 200) {
      throw new Error(result || 'Something went wrong');
    }

    onSuccess({
      screenName: result.data.userDetails.screenName,
      userId: result.data.userDetails.userId,
    });
  } catch (error) {
    console.error(error);
    onError(error);
  }
}

const Callback: NextPage = ({
  oauthToken,
  oauthVerifier,
}: {
  oauthToken?: string;
  oauthVerifier?: string;
}) => {
  const router = useRouter();
  const userStore = useUserStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    handleCallback({
      oauthToken,
      oauthVerifier,
      onSuccess: ({ screenName, userId }) => {
        userStore.setUserData({
          screenName,
          userId,
        });
        router.replace('/settings');
      },
      onError: (error) => {
        router.replace('/error');
      },
    });
  }, [oauthToken, oauthVerifier, router, userStore]);

  return (
    <Primary
      title="Loading..."
      description="This should only take a second ⏳"
    />
  );
};

Callback.getInitialProps = async (context) => {
  return {
    oauthToken: context.query.oauth_token,
    oauthVerifier: context.query.oauth_verifier,
  };
};

export default Callback;
