import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Stack,
  StackDivider,
  Switch,
  Text,
} from '@chakra-ui/react';

export function SettingsForm() {
  return (
    <Container py={{ base: '4', md: '8' }}>
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
          <FormControl id="name">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '1.5', md: '8' }}
              justify="space-between"
            >
              <FormLabel variant="inline">Farcaster Username</FormLabel>
              <Input maxW={{ md: '3xl' }} placeholder="" />
            </Stack>
          </FormControl>
          <FormControl id="email">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '1.5', md: '8' }}
              justify="space-between"
            >
              <FormLabel variant="inline">Include fcast.me link?</FormLabel>
              <Switch size="lg" />
              <Spacer />
            </Stack>
          </FormControl>
          <FormControl id="email">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: '1.5', md: '8' }}
              justify="space-between"
            >
              <FormLabel variant="inline">
                Include @farcaster_xyz handle?
              </FormLabel>
              <Switch size="lg" />
              <Spacer />
            </Stack>
          </FormControl>

          <Flex direction="row-reverse">
            <Button variant="primary">Save</Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
}
