import {
  getDbClient,
  getFullUserObjectByUserId,
} from '@twitcaster/db-provider';
import { sendTweet } from '@twitcaster/twitter-provider';
import { fetchFarcaster } from './fetchFarcaster';
import { get } from 'lodash';

type Listener = {
  timeoutId: ReturnType<typeof setTimeout> | null;
  lastCastHash: string | null;
  lastCastTimestamp: number | null;
};

// Check for new tweets every five minutes
const POLLING_INTERVAL = 1000 * 60 * 5;
const TWEET_MAX_LENGTH = 280;

export class FarcasterMonitor {
  // Map<userId, Listener>
  listeners: Map<string, Listener> = new Map();

  constructor() {
    this.init();
  }

  init = async () => {
    const dbClient = await getDbClient();
    const cursor = dbClient
      .db('db')
      .collection('users')
      .find({
        fid: {
          $gt: 0,
        },
      });

    while (await cursor.hasNext()) {
      const user = await cursor.next();

      if (isValidUser(user)) {
        this.addListener(user.userId);
      }
    }
  };

  addListener = (userId: string) => {
    if (this.listeners.has(userId)) {
      return;
    }

    this.listeners.set(userId, {
      timeoutId: null,
      lastCastHash: null,
      lastCastTimestamp: null,
    });

    this.checkForNewCasts(userId);
  };

  removeListener = (userId: string) => {
    clearTimeout(this.listeners.get(userId)?.timeoutId ?? undefined);
    this.listeners.delete(userId);
  };

  checkForNewCasts = async (userId: string) => {
    try {
      const user = await getFullUserObjectByUserId({ userId });

      if (!user || !isValidUser(user)) {
        this.removeListener(userId);
        return;
      }

      const data = await fetchFarcaster(`/v2/casts?fid=${user.fid}`).then(
        (res) => res.json()
      );

      const casts = get<Cast[]>(data, 'result.casts', []);

      if (!Array.isArray(casts)) {
        return;
      }

      await this.processNewCasts(user, casts);
    } finally {
      const userListener = this.listeners.get(userId);

      if (userListener) {
        clearTimeout(userListener.timeoutId ?? undefined);

        userListener.timeoutId = setTimeout(() => {
          this.checkForNewCasts(userId);
        }, POLLING_INTERVAL);
      }
    }
  };

  processNewCasts = async (user: User, casts: Cast[]) => {
    const userListener = this.listeners.get(user.userId);

    if (!userListener) {
      return;
    }

    const filteredCasts = casts.filter((cast) => {
      // Removes casts which are replies to another cast
      return !cast.parentAuthor;
    });

    if (filteredCasts.length === 0) {
      return;
    }

    const latestCast = filteredCasts[0];

    // If `userListener.lastCastTimestamp` is null, the user just signed up
    // so we'll skip tweeting and just set the latest timestamp and hash below
    if (userListener.lastCastTimestamp !== null) {
      const storedTimestamp = userListener.lastCastTimestamp;
      const newCasts = filteredCasts.filter((cast) => {
        return cast.timestamp > storedTimestamp;
      });
      await this.tweetCasts(user, newCasts);
    }

    userListener.lastCastHash = latestCast.hash;
    userListener.lastCastTimestamp = latestCast.timestamp;
  };

  tweetCasts = async (user: User, casts: Cast[]) => {
    for (const cast of casts) {
      let tweetBody =
        cast.text.length > TWEET_MAX_LENGTH
          ? cast.text.substring(0, TWEET_MAX_LENGTH - 3) + '...'
          : cast.text;

      if (user.withFcastMeLink) {
        const withLink = `${tweetBody}\n\nhttps://fcast.me/${user.fname}`;
        tweetBody = withLink.length > TWEET_MAX_LENGTH ? tweetBody : withLink;
      }

      try {
        await sendTweet({
          userId: user.userId,
          tweet: tweetBody,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
}

function isValidEntity<T extends Record<string, unknown>>(
  maybeEntity: unknown,
  comparator: T
): maybeEntity is T {
  if (maybeEntity === null || typeof maybeEntity !== 'object') {
    return false;
  }
  const asValidType = maybeEntity as T;

  return Object.entries(comparator).every(([key, value]) => {
    return key in asValidType && typeof asValidType[key] === typeof value;
  });
}

type User = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  fid: number;
  fname: string;
  withFcastMeLink: boolean;
};

function isValidUser(
  maybeUser: null | Record<string, unknown>
): maybeUser is User {
  return isValidEntity<User>(maybeUser, {
    userId: '',
    accessToken: '',
    refreshToken: '',
    fid: 0,
    fname: '',
    withFcastMeLink: true,
  });
}

type Cast = {
  hash: string;
  parentAuthor?: unknown;
  text: string;
  timestamp: number;
};
