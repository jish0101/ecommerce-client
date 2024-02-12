import { createTheme, localStorageColorSchemeManager, rem } from '@mantine/core';

// const colors = [
//   '#ffe9f1',
//   '#ffd1e0',
//   '#faa1bd',
//   '#f66e99',
//   '#f2437a',
//   '#f02866',
//   '#f0185c',
//   '#d6094d',
//   '#c00043',
//   '#a90039',
// ];

export const theme = createTheme({
  fontFamily: 'Gabarito, sans-serif',
  fontFamilyMonospace: 'Gabarito, Monaco, Courier, monospace',
  headings: { fontFamily: 'Gabarito, Greycliff CF, sans-serif' },
  // colors: {
  //   primaryColor: colors,
  // },
  // primaryShade: 'primaryColor',
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
