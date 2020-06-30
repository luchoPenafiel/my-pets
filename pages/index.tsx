import React, { ReactElement } from 'react';
import cookies from 'next-cookies';
import Head from 'next/head';
import getConfig from 'next/config';

const Home = ({ isValidToken }: any): ReactElement => {
  // eslint-disable-next-line no-console
  console.log('isValidToken', isValidToken);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Vetapp</title>
      </Head>
      <p>Mis mascotas</p>
    </>
  );
};

Home.getInitialProps = async (ctx) => {
  const baseURL = await getConfig().publicRuntimeConfig.BASE_URL;
  const { token } = cookies(ctx);

  if (!token) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login',
      });
      ctx.res.end();
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: JSON.stringify({ token }),
  };

  const result = await fetch(`${baseURL}/api/validateToken`, { headers });
  const isValidToken = await result.json();

  if (isValidToken.error) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: '/login',
      });
      ctx.res.end();
    }
  }

  return { isValidToken };
};

export default Home;
