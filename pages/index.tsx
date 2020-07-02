import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage } from '../services';
import { CardActionable, Container, PageWrapper, Separetor, Splashscreen, Navbar } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';

const Home = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const owner = await getLocalStorage('user');
        const pets = await getPets(owner.id);

        setPets(pets);
        setLoading(false);
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
                <Separetor />
                {pets.length
                  ? pets.map((pet) => {
                      return (
                        <CardActionable href="/detail" subtitle={pet.resena.especie} title={pet.nombre} key={pet.id} />
                      );
                    })
                  : null}
                {pets.length
                  ? pets.map((pet) => {
                      return (
                        <CardActionable href="/detail" subtitle={pet.resena.especie} title={pet.nombre} key={pet.id} />
                      );
                    })
                  : null}
              </Container>
            </PageWrapper>
          </>
        )}
      </>
    </>
  );
};

export default Home;
