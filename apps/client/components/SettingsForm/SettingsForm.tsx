import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Stack,
  StackDivider,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { LoadingOverlay } from '../LoadingOverlay/LoadingOverlay';

export type FormValues = {
  fname: string;
  withFcastMeLink: boolean;
};

export function SettingsForm({ loading }: { loading: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Container py={{ base: '4', md: '8' }} position="relative">
      <LoadingOverlay loading={loading} />
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              Twitcaster Options
            </Text>
            <Text color="muted" fontSize="sm">
              Customize your bridge to the bird app
            </Text>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl isRequired isInvalid={!!errors.fname}>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '1.5', md: '8' }}
              justify="space-between"
            >
              <FormLabel variant="inline">Farcaster Username</FormLabel>
              <VStack width="100%" alignItems="flex-start">
                <Input
                  {...register('fname', {
                    required: true,
                  })}
                  maxW={{ md: '3xl' }}
                  type="text"
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </VStack>
              <Spacer />
            </Stack>
          </FormControl>
          <FormControl>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '1.5', md: '8' }}
              justify="space-between"
            >
              <FormLabel variant="inline">Include fcast.me link?</FormLabel>
              <Switch {...register('withFcastMeLink')} size="lg" />
              <Spacer />
            </Stack>
          </FormControl>

          <Flex direction="row-reverse">
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
}
