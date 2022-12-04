import {
  SettingsForm,
  FormValues,
} from '../../components/SettingsForm/SettingsForm';
import { Primary } from '../../layouts/primary/primary';
import { format } from 'date-fns';
import { Card, Stack, useToast } from '@chakra-ui/react';

import FakeTweet from '../../vendor/fake-tweet';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useForm, FormProvider } from 'react-hook-form';
import { useIsClient, useReadLocalStorage } from 'usehooks-ts';
import { useSaveSettings } from '../../hooks/useSaveSettings';
import { useGet } from '../../hooks/useGet';
import { LoadingOverlay } from '../../components/LoadingOverlay/LoadingOverlay';

type User = {
  accessToken: string;
  fname: string;
  screenName: string;
  userId: string;
  withFcastMeLink: boolean;
};

function BootstrappedSettingsForm({ user }: { user: User }) {
  const toast = useToast();
  const userId = useReadLocalStorage<string>('userId') ?? '';
  const formMethods = useForm<FormValues>({
    defaultValues: {
      fname: user.fname,
      withFcastMeLink: user.withFcastMeLink,
    },
  });

  const { handleSubmit, watch } = formMethods;
  const [withFcastMeLink] = watch(['withFcastMeLink']);

  const { isSubmitting, submit } = useSaveSettings();

  const onSubmit = (data: FormValues) => {
    submit({
      userId,
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Your settings are saved!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: ({ message }) => {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
      ...data,
    });
  };

  return (
    <>
      <Card
        className="tweet-wrapper"
        borderRadius="8"
        overflow="hidden"
        width="100%"
        maxWidth="600px"
      >
        <FakeTweet
          config={{
            user: {
              nickname: 'yee_dinosaur',
              name: 'Yee Dino',
              avatar: '/assets/yee-avatar.jpg',
              locked: false,
              verified: true,
            },
            display: 'default',
            text: `Fool me once, shame on yee. Fool me twice...
            ${withFcastMeLink ? 'https://fcast.me/typeof' : ''}\xa0`,
            image: '',
            date: format(new Date(), 'h:mm a • MMM d, yyyy'),
            app: 'Twitcaster',
            retweets: 32000,
            quotedTweets: 100,
            likes: 12700,
          }}
        />
      </Card>
      <FormProvider {...formMethods}>
        <Stack width="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
          <SettingsForm loading={isSubmitting} />
        </Stack>
      </FormProvider>
      <style jsx global>{`
        .tweet-wrapper .tweet {
          max-width: 100%;
          width: 100%;
        }

        .tweet-wrapper .user-name {
          display: flex;
        }

        .tweet-wrapper .txt {
          white-space: pre-line;
        }
      `}</style>
    </>
  );
}

export default function Settings() {
  const router = useRouter();
  const userId = useReadLocalStorage<string>('userId') ?? '';
  const screenName = useReadLocalStorage<string>('screenName') ?? '';
  const accessToken = useReadLocalStorage<string>('accessToken') ?? '';
  const isClient = useIsClient();

  const { data, status } = useGet<{ user: User | null }>(
    `/api/user?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  useEffect(() => {
    if (!userId || (status === 'READY' && !data?.user)) {
      router.replace('/error');
    }
  }, [data?.user, router, status, userId]);

  return (
    <Primary
      title="Settings"
      description={`Welcome, @${
        isClient && screenName
      }! Set up your automation below.`}
    >
      <LoadingOverlay loading={status === 'LOADING'} />
      {status === 'READY' && data?.user && (
        <BootstrappedSettingsForm user={data.user} />
      )}
    </Primary>
  );
}
