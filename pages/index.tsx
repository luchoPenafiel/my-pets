import React, { ReactElement, useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage, setLocalStorage } from '../services';
import { AddButton, CardActionable, Container, PageWrapper, Splashscreen, Navbar, Separetor } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { PetContext } from '../contexts/PetContext';

const Home = (): ReactElement => {
  const { changeStatePet } = useContext(PetContext);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  const handleClickCard = async (pet): Promise<void> => {
    changeStatePet(pet);
    await setLocalStorage('pet', pet);
    Router.push('/detail');
  };

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
                        <CardActionable
                          onClick={() => handleClickCard(pet)}
                          subtitle={pet.resena.especie}
                          title={pet.nombre}
                          key={pet.id}
                          icon={pet.resena.especie}
                        />
                      );
                    })
                  : null}

                <Separetor />
                <AddButton text="Agregar mascota" />
                <Separetor />
              </Container>
            </PageWrapper>
          </>
        )}
      </>
    </>
  );
};

export default Home;
