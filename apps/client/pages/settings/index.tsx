import {
  SettingsForm,
  FormValues,
} from '../../components/SettingsForm/SettingsForm';
import { Primary } from '../../layouts/primary/primary';
import { format } from 'date-fns';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  Container,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

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

function HowItWorks() {
  return (
    <Container
      py={{ base: '4', md: '8' }}
      justifyContent="center"
      display="flex"
    >
      <Accordion allowToggle width="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                How it works
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack alignItems="stretch">
              <Text>
                After authenticating with Twitter, Twitcaster will periodically
                post your Farcaster casts to Twitter. It checks for new casts
                every 5 minutes, so you will likely see a short delay between
                your cast and when it shows up on Twitter.
              </Text>
              <Text>
                Twitcaster ignores casts that are replies to another cast. I.e.
                it will only tweet top-level casts.
              </Text>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}

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
              nickname: user.screenName,
              name: 'Your Name Here',
              avatar: '/assets/yee-avatar.jpg',
              locked: false,
              verified: true,
            },
            display: 'default',
            text: `That doesn't look very scary. More like a six-foot turkey.
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
      <Box width="100%" maxWidth="800px">
        <HowItWorks />
        <FormProvider {...formMethods}>
          <Stack width="100%" as="form" onSubmit={handleSubmit(onSubmit)}>
            <SettingsForm loading={isSubmitting} />
          </Stack>
        </FormProvider>
      </Box>
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
