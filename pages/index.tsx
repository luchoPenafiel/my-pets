import React, { ReactElement, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Router from 'next/router';
import { getPets, getLocalStorage, setLocalStorage } from '../services';
import {
  AddButton,
  Button,
  CardActionable,
  CenterButton,
  Container,
  PageWrapper,
  Splashscreen,
  Navbar,
  Separetor,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { PetContext } from '../contexts/PetContext';
import theme from '../constants/theme';
import { LoadingContext } from '../contexts/LoadingContext';
import IUser from '../interfaces/user';

const StickyTitles = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;

  z-index: 2;

  background: ${theme.color.white};
  border-bottom: 10px solid ${theme.color.white};

  box-sizing: border-box;
`;

const Home = (): ReactElement => {
  const { changeStatePet } = useContext(PetContext);
  const { changeStateLoading } = useContext(LoadingContext);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [userData, setUserData] = useState<IUser>();

  const handleClickCard = async (pet): Promise<void> => {
    changeStatePet(pet);
    await setLocalStorage('pet', pet);
    Router.push('/mascota');
  };

  const addPet = () => {
    Router.push('/agregar-mascota');
  };

  useEffect(() => {
    changeStateLoading(false);
    const validateAuth = async () => {
      try {
        const owner = await getLocalStorage('user');
        setUserData(owner);
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
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
                <Separetor />
                {pets.length ? (
                  <StickyTitles>
                    <Title1>Mis</Title1>
                    <Title1>mascotas</Title1>
                  </StickyTitles>
                ) : (
                  <StickyTitles>
                    <Title1>Hola</Title1>
                    <Title1>{userData.nombre}</Title1>
                  </StickyTitles>
                )}
                <Separetor />

                {!pets.length && (
                  <>
                    <ParagraphMD>¡Que bueno que estés acá! Nos pone muy felices.</ParagraphMD>
                    <ParagraphMD>Ahora vamos a agregar tu primer mascota.</ParagraphMD>
                  </>
                )}

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

                {!userData?.veterinaria && !pets.length ? (
                  <>
                    <CenterButton>
                      <Button onClick={addPet}>
                        <>Agregar mascota</>
                      </Button>
                    </CenterButton>
                    <Separetor />
                  </>
                ) : null}

                {!userData?.veterinaria && pets.length ? (
                  <>
                    <AddButton onTap={addPet} text="Agregar mascota" />
                    <Separetor />
                  </>
                ) : null}
              </Container>
            </PageWrapper>
          </>
        )}
      </>
    </>
  );
};

export default Home;
