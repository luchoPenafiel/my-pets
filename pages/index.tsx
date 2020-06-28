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
  const baseURL = await getConfig().publicRuntimeConfig.BASE_URL;
  const url = `${baseURL}/api/checkAuthState`;
  const response: any = await fetch(url);
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
