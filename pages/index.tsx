import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage } from '../services';
import { AddButton, CardActionable, Container, PageWrapper, Splashscreen, Navbar } from '../components';

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
            <PageWrapper
              titleLine1="Mis"
              titleline2="mascotas"
              footer={
                <Container>
                  <AddButton text="Agregar mascota" />
                </Container>
              }
            >
              <Container>
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
