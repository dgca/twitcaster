export type UserDetails = {
  userId: string;
  screenName: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  fid?: null;
  fname?: string;
  withFcastMeLink?: boolean;
  withHashTagOnly?: boolean;
};
