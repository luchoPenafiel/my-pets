import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage } from '../services';
import { Container, PageWrapper, Splashscreen, Navbar } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';

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
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Vetapp</title>
      </Head>
      <>
        {loading ? (
          <Splashscreen />
        ) : (
          <>
            <Navbar />
            <PageWrapper>
              <Container>
                <Title1>Mis</Title1>
                <Title1>mascotas</Title1>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati doloribus sequi? Nisi
                  quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti explicabo cumque nulla porro
                  nemo, odio animi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati
                  doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti
                  explicabo cumque nulla porro nemo, odio animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Suscipit obcaecati doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora
                  doloribus corrupti explicabo cumque nulla porro nemo, odio animi.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati doloribus sequi? Nisi
                  quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti explicabo cumque nulla porro
                  nemo, odio animi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati
                  doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti
                  explicabo cumque nulla porro nemo, odio animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Suscipit obcaecati doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora
                  doloribus corrupti explicabo cumque nulla porro nemo, odio animi.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati doloribus sequi? Nisi
                  quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti explicabo cumque nulla porro
                  nemo, odio animi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati
                  doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti
                  explicabo cumque nulla porro nemo, odio animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Suscipit obcaecati doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora
                  doloribus corrupti explicabo cumque nulla porro nemo, odio animi.
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati doloribus sequi? Nisi
                  quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti explicabo cumque nulla porro
                  nemo, odio animi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit obcaecati
                  doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora doloribus corrupti
                  explicabo cumque nulla porro nemo, odio animi.Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Suscipit obcaecati doloribus sequi? Nisi quidem itaque tempora! Minus itaque quod eum tempora
                  doloribus corrupti explicabo cumque nulla porro nemo, odio animi.
                </p>
              </Container>
            </PageWrapper>
          </>
        )}
      </>
    </>
  );
};

export default Home;
