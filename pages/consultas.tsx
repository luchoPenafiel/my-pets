import React, { ReactElement, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {
  AddButton,
  Button,
  CardActionable,
  Container,
  EmptyState,
  PageWrapper,
  Splashscreen,
  Navbar,
  Separetor,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { getConsultas, getLocalStorage, setLocalStorage } from '../services';
import { PetContext } from '../contexts/PetContext';
import { ConsultContext } from '../contexts/ConsultContext';
import theme from '../constants/theme';
import IPet from '../interfaces/pet';
import IConsulta from '../interfaces/consulta';
import Router from 'next/router';
import formatDate from '../utils/formatDate';

const StickyTitles = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;

  z-index: 2;

  background: ${theme.color.white};
  border-bottom: 10px solid ${theme.color.white};

  box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 100px;
`;

const Consultas = (): ReactElement => {
  const [petData, setPetData] = useState<IPet>();
  const [consultas, setConsulta] = useState<IConsulta[]>();
  const [loading, setLoading] = useState(true);
  const { pet } = useContext(PetContext);
  const { changeStateConsult } = useContext(ConsultContext);

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
    changeStateConsult(consulta);

    try {
      setLocalStorage('consulta', consulta);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('LocalStorage no disponible');
    }

    Router.push('/consulta');
  };

  const handleAddConsultButton = () => {
    Router.push('/agregar-consulta');
  };

  const handleClickEmptyStateButton = () => {
    Router.replace('/mi-veterinaria');
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
        <title>Consultas | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="mascota" />
          <PageWrapper>
            <Container>
              {consultas.length ? (
                <>
                  <Separetor />
                  <StickyTitles>
                    <Title1>Consultas</Title1>
                    <Title1>de {petData.nombre}</Title1>
                  </StickyTitles>
                  <Separetor />
                  {consultas.map((consulta) => {
                    return (
                      <CardActionable
                        onClick={() => handleClickCard(consulta)}
                        subtitle={consulta.motivo}
                        title={formatDate(consulta.fecha)}
                        key={consulta.id}
                      />
                    );
                  })}
                </>
              ) : (
                <EmptyState>
                  {petData.veterinaria ? (
                    <>
                      <ParagraphMD>{petData.nombre} no tiene consultas cargadas todavía.</ParagraphMD>
                      <ParagraphMD>¡Pide turno a la veterinaria!</ParagraphMD>
                      <ButtonWrapper>
                        <Button onClick={handleClickEmptyStateButton}>
                          <>Mi Veterinaria</>
                        </Button>
                      </ButtonWrapper>
                    </>
                  ) : (
                    <>
                      <ParagraphMD>{petData.nombre} no tiene consultas cargadas todavía.</ParagraphMD>
                      <ParagraphMD>¡Vamos a cargar la primera!</ParagraphMD>
                      <ButtonWrapper>
                        <Button onClick={handleAddConsultButton}>
                          <>Agregar consulta</>
                        </Button>
                      </ButtonWrapper>
                    </>
                  )}
                </EmptyState>
              )}

              {!petData.veterinaria && consultas.length ? (
                <>
                  <Separetor />
                  <AddButton text="Agregar consulta" onTap={handleAddConsultButton} />
                  <Separetor />
                </>
              ) : null}
            </Container>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Consultas;
