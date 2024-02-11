import {
  createTheme,
  localStorageColorSchemeManager,
  rem,
  // MantineThemeColors,
  // MantineColorShade,
} from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Gabarito, sans-serif',
  fontFamilyMonospace: 'Gabarito, Monaco, Courier, monospace',
  headings: { fontFamily: 'Gabarito, Greycliff CF, sans-serif' },
  // colors: MantineThemeColors,
  // primaryShade: MantineColorShade,
  fontSizes: {
    xs: rem(10),
    sm: rem(13),
    md: rem(16),
    lg: rem(18),
    xl: rem(22),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
  sizes: {
    h1: {
      fontWeight: '100',
      fontSize: rem(36),
      lineHeight: '1.4',
    },
    h2: { fontSize: rem(30), lineHeight: '1.5' },
    h6: { fontWeight: '900' },
  },
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: 'appTheme',
});
