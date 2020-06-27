import React, { ReactElement } from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

const Home = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <p>Mis mascotas</p>
    </>
  );
};

Home.getInitialProps = async ({ res }) => {
  const baseURL = await getConfig().serverRuntimeConfig.BASE_URL;
  const response: any = await fetch(`${baseURL}/api/checkAuthState`);
  const userAuth = await response.json();

  if (!userAuth.auth) {
    if (res) {
      res.writeHead(302, {
        Location: '/login',
      });
      res.end();
    }
  }

  return { userAuth };
};

export default Home;
