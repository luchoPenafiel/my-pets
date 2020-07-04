/* eslint-disable import/extensions */
import React, { useEffect, ReactElement } from 'react';
import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../constants/theme';
import { LoadingProvider } from '../contexts/LoadingContext';
import { PetProvider } from '../contexts/PetContext';

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
  }
  html, body {
    height: 100%;
    overflow-x: hidden;
  }
  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none; }
  ${normalize()}
`;

const themeMaterial = createMuiTheme({
  palette: {
    primary: {
      main: theme.color.primary,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [theme.fontFamily.primary, 'sans-serif'].join(','),
    fontSize: 18,
  },
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <LoadingProvider>
      <PetProvider>
        <ThemeProvider theme={themeMaterial}>
          <Component {...pageProps} />
          <GlobalStyles />
        </ThemeProvider>
      </PetProvider>
    </LoadingProvider>
  );
}

export default MyApp;
