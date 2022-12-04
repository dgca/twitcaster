import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

import { Primary } from '../../layouts/primary/primary';
import { useLocalStorage } from 'usehooks-ts';

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
    accessToken,
  }: {
    screenName: string;
    userId: string;
    accessToken: string;
  }) => void;
  onError: (error: unknown) => void;
}) {
  try {
    const response = await fetch('/api/handle-callback', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
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
      accessToken: result.data.userDetails.accessToken,
    });
  } catch (error) {
    console.error(error);
    onError(error);
  }
}

export default function Callback({
  oauthToken,
  oauthVerifier,
}: {
  oauthToken?: string;
  oauthVerifier?: string;
}) {
  const router = useRouter();

  const hasFetched = useRef(false);
  const [userId, setUserId] = useLocalStorage('userId', '');
  const [screenName, setScreenName] = useLocalStorage('screenName', '');
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    if (hasFetched.current) {
      return;
    }
    hasFetched.current = true;

    handleCallback({
      oauthToken,
      oauthVerifier,
      onSuccess: ({ screenName, userId, accessToken }) => {
        setUserId(userId);
        setScreenName(screenName);
        setAccessToken(accessToken);

        router.replace('/settings');
      },
      onError: (error) => {
        router.replace('/error');
      },
    });
  }, [
    oauthToken,
    oauthVerifier,
    router,
    setScreenName,
    setUserId,
    setAccessToken,
  ]);

  return (
    <Primary
      title="Loading..."
      description="This should only take a second ⏳"
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      oauthToken: context.query.oauth_token,
      oauthVerifier: context.query.oauth_verifier,
    },
  };
};
