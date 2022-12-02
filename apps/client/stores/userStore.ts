import create from 'zustand';

type UserState = {
  screenName: string;
  userId: string;
  setUserData: (data: { screenName: string; userId: string }) => void;
};

export const useUserStore = create<UserState>()((set) => ({
  screenName: '',
  userId: '',
  setUserData: ({ screenName, userId }) =>
    set((state) => ({
      screenName: screenName ?? state.screenName,
      userId: userId ?? state.userId,
    })),
}));
