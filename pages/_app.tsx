/* eslint-disable import/extensions */
import React, { useEffect, ReactElement } from 'react';
import { AppProps } from 'next/app';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
  }
  body {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
`;

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
