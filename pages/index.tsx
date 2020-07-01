import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage } from '../services';

const Home = (): ReactElement => {
  useEffect(() => {
    const validateAuth = async () => {
      try {
        const owner = await getLocalStorage('user');
        const pets = await getPets(owner.id);
        // eslint-disable-next-line no-console
        console.log('pets', pets);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('err', err);
        Router.push('/login');
      }
    };

    validateAuth();
  }, []);

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

export default Home;
