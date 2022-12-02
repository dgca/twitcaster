import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';
import '@fontsource/inter/variable.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Twitcaster</title>
      </Head>
      <main>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default CustomApp;
