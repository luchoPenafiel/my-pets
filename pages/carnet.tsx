/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage } from '../services';
import {
  AddButton,
  Button,
  CardActionable,
  Container,
  EmptyState,
  Navbar,
  Splashscreen,
  PageWrapper,
  Separetor,
  StickyTitles,
} from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { Title1 } from '../components/Types/Titles/Titles';
import IPet from '../interfaces/pet';
import formatDate from '../utils/formatDate';
import Router from 'next/router';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 100px;
`;

const CarnetSanitario = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState<IPet>();
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setLoading(false);
  };

  const handleClickVacunAntirrabica = (): void => {
    Router.push('/vacuna-antirrabica');
  };

  const handleClickVacuna = (idx): void => {
    Router.push(`/vacuna/${idx}`);
  };

  const handleAddVacunButton = (): void => {
    if (petData?.carnetSanitario?.vacAntirrabica?.fecha || petData?.carnetSanitario?.vacAntirrabica?.proximaDosis) {
      Router.push('/agregar-vacuna');
    } else {
      Router.push('/switch-vacuna');
    }
  };

  useEffect(() => {
    setLoading(true);

    if (!!pet.id) {
      setPetData(pet);
      setLoading(false);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Carnet Sanitario | Mis Mascotas</title>
      </Head>
      <Navbar previusScreen="mascota" />
      {loading ? (
        <Splashscreen />
      ) : (
        <PageWrapper>
          <Container>
            {petData?.carnetSanitario &&
            (petData?.carnetSanitario?.otrasVacunas?.length ||
              petData?.carnetSanitario?.vacAntirrabica?.fecha ||
              petData?.carnetSanitario?.vacAntirrabica?.proximaDosis) ? (
              <>
                <Separetor />
                <StickyTitles>
                  <Title1>Carnet Sanitario</Title1>
                </StickyTitles>
                <Separetor />

                {(petData?.carnetSanitario?.vacAntirrabica?.fecha ||
                  petData?.carnetSanitario?.vacAntirrabica?.proximaDosis) && (
                  <CardActionable
                    onClick={handleClickVacunAntirrabica}
                    subtitle={
                      petData?.carnetSanitario?.vacAntirrabica?.fecha
                        ? formatDate(petData?.carnetSanitario?.vacAntirrabica?.fecha)
                        : null
                    }
                    title="Antirrábica"
                  />
                )}

                {petData?.carnetSanitario?.otrasVacunas?.length
                  ? petData.carnetSanitario.otrasVacunas.map((vacuna, idx) => {
                      if (vacuna.nombre) {
                        return (
                          <CardActionable
                            onClick={() => handleClickVacuna(idx)}
                            subtitle={vacuna.fecha ? formatDate(vacuna.fecha) : ''}
                            title={vacuna.nombre}
                            key={`${vacuna.nombre}-${idx}`}
                          />
                        );
                      }
                    })
                  : null}

                {!petData.veterinaria &&
                  (petData?.carnetSanitario?.otrasVacunas?.length ||
                    petData?.carnetSanitario?.vacAntirrabica?.fecha ||
                    petData?.carnetSanitario?.vacAntirrabica?.proximaDosis) && (
                    <>
                      <Separetor />
                      <AddButton text="Agrega vacuna" onTap={handleAddVacunButton} />
                      <Separetor />
                    </>
                  )}
              </>
            ) : (
              <EmptyState>
                <>
                  <ParagraphMD>{petData.nombre} no tiene vacunas cargadas todavía.</ParagraphMD>
                  <ParagraphMD>
                    {petData.veterinaria ? '¡Pide turno a la veterinaria!' : '¡Vamos a cargar la primera!'}
                  </ParagraphMD>
                  <ButtonWrapper>
                    {petData.veterinaria ? (
                      <Button href="/mi-veterinaria">
                        <>Mi Veterinaria</>
                      </Button>
                    ) : (
                      <Button href="/switch-vacuna">
                        <>Agregar vacuna</>
                      </Button>
                    )}
                  </ButtonWrapper>
                </>
              </EmptyState>
            )}
          </Container>
        </PageWrapper>
      )}
    </>
  );
};

export default CarnetSanitario;
