import {
  Container,
  Heading,
  VStack,
  Stack,
  Text,
  useBreakpointValue,
  ButtonGroup,
  IconButton,
  HStack,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { GiDungeonGate } from 'react-icons/gi';

type Props = {
  children?: React.ReactNode;
  title: string;
  description?: string | string[];
};

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [value];
}

export function Primary({ children, title, description }: Props) {
  return (
    <VStack minHeight="100vh">
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '16', md: '24' }}>
          <Stack spacing={{ base: '8', md: '10' }} align="center">
            <Stack spacing={{ base: '4', md: '6' }} textAlign="center">
              <Stack spacing="4">
                <Text
                  fontWeight="semibold"
                  color="accent"
                  fontSize={{ base: 'md', md: 'lg' }}
                >
                  Twitcaster
                </Text>
                <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
                  {title}
                </Heading>
              </Stack>
            </Stack>
            {description && (
              <Stack spacing={{ base: '4', md: '6' }}>
                {asArray(description).map((item, i) => {
                  return (
                    <Text
                      fontSize={{ base: 'lg', md: 'xl' }}
                      maxW="2xl"
                      color="muted"
                      textAlign="center"
                      key={i}
                    >
                      {item}
                    </Text>
                  );
                })}
              </Stack>
            )}
            <VStack width="100%" mt="8">
              {children}
            </VStack>
          </Stack>
        </Stack>
      </Container>
      <Spacer />
      <Container
        as="footer"
        role="contentinfo"
        py={{ base: '12', md: '16' }}
        width="100%"
      >
        <Stack spacing="1">
          <Stack justify="space-between" direction="row" align="center">
            <Text>
              Made by{' '}
              <Link
                fontWeight="bold"
                color="pink.400"
                href="https://dancortes.dev"
                target="_blank"
              >
                Dan Cortes
              </Link>
            </Text>
            <HStack />
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/dan-cortes-8954b345/"
                aria-label="LinkedIn"
                target="_blank"
                icon={<FaLinkedin fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://github.com/dgca"
                aria-label="GitHub"
                target="_blank"
                icon={<FaGithub fontSize="1.25rem" />}
              />
              <IconButton
                as="a"
                href="https://fcast.me/typeof"
                aria-label="Farcaster"
                target="_blank"
                icon={<GiDungeonGate fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()}
          </Text>
        </Stack>
      </Container>
    </VStack>
  );
}
