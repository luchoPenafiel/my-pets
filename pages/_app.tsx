/* eslint-disable import/extensions */
import React, { useEffect, ReactElement, useState } from 'react';
import { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from '../constants/theme';
import { LoadingProvider } from '../contexts/LoadingContext';
import { PetProvider } from '../contexts/PetContext';
import { ConsultProvider } from '../contexts/ConsultContext';
import { Container, EmptyState, PageWrapper, Separetor } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

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

  #main-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  }

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
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if (window) {
      if (!window.navigator.onLine) {
        setOnline(false);
      }

      window.addEventListener('offline', function (e) {
        setOnline(false);
      });

      window.addEventListener('online', function (e) {
        setOnline(true);
      });
    }
  }, []);

  return (
    <LoadingProvider>
      <PetProvider>
        <ConsultProvider>
          <ThemeProvider theme={themeMaterial}>
            <div id="main-container">
              {online ? (
                <Component {...pageProps} />
              ) : (
                <Container>
                  <PageWrapper>
                    <EmptyState title="oops">
                      <>
                        <ParagraphMD>
                          Parece que no tienes internet y no podemos recuperar los datos de tus mascotas.
                        </ParagraphMD>

                        <ParagraphMD>Revisa tu conexión y vuelve a intentarlo.</ParagraphMD>
                      </>
                    </EmptyState>
                  </PageWrapper>
                </Container>
              )}
            </div>
            <GlobalStyles />
          </ThemeProvider>
        </ConsultProvider>
      </PetProvider>
    </LoadingProvider>
  );
}

export default MyApp;
