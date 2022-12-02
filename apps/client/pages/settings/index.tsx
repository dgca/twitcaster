import { SettingsForm } from '../../components/SettingsForm/SettingsForm';
import { Primary } from '../../layouts/primary/primary';
import { useUserStore } from '../../stores/userStore';
import { format } from 'date-fns';
import { Card } from '@chakra-ui/react';

import FakeTweet from '../../vendor/fake-tweet';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const userStore = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!userStore.screenName) {
      router.replace('/');
    }
  }, [router, userStore.screenName]);

  return (
    <Primary
      title="Settings"
      description={`Welcome, @${userStore.screenName}!`}
    >
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
            https://fcast.me/typeof @farcaster_xyz`,
            image: '',
            date: format(new Date(), 'h:mm a • MMM d, yyyy'),
            app: 'Twitcaster',
            retweets: 32000,
            quotedTweets: 100,
            likes: 12700,
          }}
        />
      </Card>
      <SettingsForm />
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
    </Primary>
  );
}
