import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { theme as proTheme } from '@chakra-ui/pro-theme';
import '@fontsource/inter/variable.css';

const themeConfig: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    config: themeConfig,
  },
  proTheme
);
