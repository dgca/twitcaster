import { Box, Spinner } from '@chakra-ui/react';

export type FormValues = {
  fname: string;
  hasFcastMeLink: boolean;
  hasFarcasterHandle: boolean;
};

export function LoadingOverlay({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(60, 60, 60, 0.2)"
    >
      <Spinner size="xl" />
    </Box>
  );
}
