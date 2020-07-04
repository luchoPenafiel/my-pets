/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { ReactElement } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import getConfig from 'next/config';

class MyDocument extends NextDocument {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): ReactElement {
    const baseUrl = getConfig().publicRuntimeConfig.BASE_URL;

    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/favicon/apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${baseUrl}/favicon/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${baseUrl}/favicon/favicon-16x16.png`} />
          <link rel="manifest" href={`${baseUrl}/manifest.json`} />
          <link rel="mask-icon" href={`${baseUrl}/favicon/safari-pinned-tab.svg`} color="#5C0F8B" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="apple-touch-icon" href={`${baseUrl}/favicon/apple-touch-icon.png`} />
          <link rel="apple-touch-startup-image" href={`${baseUrl}/favicon/apple-touch-icon.png`} />

          <meta name="apple-mobile-web-app-title" content="Vetapp" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="viewport"
            content="viewport-fit=cover, user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
          />

          <link
            href={`${baseUrl}/splashscreens/iphone5_splash.png`}
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/iphone6_splash.png`}
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/iphoneplus_splash.png`}
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/iphonex_splash.png`}
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/iphonexr_splash.png`}
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/iphonexsmax_splash.png`}
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/ipad_splash.png`}
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/ipadpro1_splash.png`}
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/ipadpro3_splash.png`}
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href={`${baseUrl}/splashscreens/ipadpro2_splash.png`}
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
