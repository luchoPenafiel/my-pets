import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage } from '../services';
import { Splashscreen } from '../components';

const Home = (): ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const owner = await getLocalStorage('user');
        const pets = await getPets(owner.id);

        setLoading(false);

        // eslint-disable-next-line no-console
        console.log('pets', pets);
      } catch (err) {
        Router.push('/login');
      }
    };

    validateAuth();
  }, []);

  return (
    <>
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <Head>
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <title>Vetapp</title>
          </Head>

          <p>Mis mascotas</p>
        </>
      )}
    </>
  );
};

export default Home;
