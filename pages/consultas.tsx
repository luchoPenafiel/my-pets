import React, { ReactElement, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { AddButton, CardActionable, Container, PageWrapper, Splashscreen, Navbar, Separetor } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { getConsultas, getLocalStorage } from '../services';
import { PetContext } from '../contexts/PetContext';
import theme from '../constants/theme';
import IPet from '../interfaces/pet';
import IConsulta from '../interfaces/consulta';

const StickyTitles = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 50px;

  z-index: 2;

  background: ${theme.color.white};

  box-sizing: border-box;
`;

const Consultas = (): ReactElement => {
  const [petData, setPetData] = useState<IPet>();
  const [consultas, setConsulta] = useState<IConsulta[]>();
  const [loading, setLoading] = useState(true);
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
  };

  const loadConsultas = async (petId) => {
    try {
      const response = await getConsultas(petId);
      setConsulta(response);
      setLoading(false);
    } catch (err) {
      //TODO: hacer algo con este error
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleClickCard = (consulta) => {
    // eslint-disable-next-line no-console
    console.log(consulta);
  };

  useEffect(() => {
    if (!!pet.id) {
      setPetData(pet);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  useEffect(() => {
    if (!!petData?.id) {
      loadConsultas(petData.id);
    }
  }, [petData]);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Consultas | Vetapp</title>
      </Head>
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar backButton />
          <PageWrapper>
            <Container>
              <StickyTitles>
                <Title1>Consultas</Title1>
                <Title1>de {petData.nombre}</Title1>
              </StickyTitles>
              <Separetor />

              {consultas.length
                ? consultas.map((consulta) => {
                    return (
                      <CardActionable
                        onClick={() => handleClickCard(consulta)}
                        subtitle={consulta.motivo}
                        title={consulta.fecha}
                        key={consulta.id}
                      />
                    );
                  })
                : null}

              {!!petData.veterinaria ? null : (
                <>
                  <Separetor />
                  <AddButton text="Agregar consulta" />
                  <Separetor />
                </>
              )}
            </Container>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Consultas;
