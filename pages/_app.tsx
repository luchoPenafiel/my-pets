/* eslint-disable import/extensions */
import React, { useEffect, ReactElement } from 'react';
import { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../constants/theme';
import { LoadingProvider } from '../contexts/LoadingContext';
import { PetProvider } from '../contexts/PetContext';

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
  }

  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  
    overflow: hidden;
    height: 100%;
  }

  ${normalize()}
`;

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
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
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
          <GlobalStyles />
        </ThemeProvider>
      </PetProvider>
    </LoadingProvider>
  );
}

export default MyApp;
