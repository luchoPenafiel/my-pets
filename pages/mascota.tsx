import React, { ReactElement, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CardTitle, CardDetail, CardDetailActionable, Container, HeaderPet, Navbar, Splashscreen } from '../components';
import { getLocalStorage } from '../services';
import { PetContext } from '../contexts/PetContext';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import IPet from '../interfaces/pet';
import Router from 'next/router';

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 120px;

  z-index: 2;
`;

const Capitalize = styled.span`
  text-transform: capitalize;
`;

const Mascota = (): ReactElement => {
  const [authState, setAuthState] = useState(false);
  const [petData, setPetData] = useState<IPet>();
  const [loading, setLoading] = useState(true);
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setLoading(false);
  };

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const user = await getLocalStorage('user');
        if (user) {
          setAuthState(true);
        } else {
          Router.push('/login');
        }
      } catch (err) {
        Router.push('/login');
      }
    };

    validateAuth();
  }, []);

  useEffect(() => {
    if (authState) {
      if (!!pet.id) {
        setPetData(pet);
        setLoading(false);
      } else {
        getDataFromLocalStorage();
      }
    }
  }, [authState]);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <Navbar bgColor="transparent" color="white" previusScreen="index" />
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <HeaderPet especie={petData?.resena?.especie} />
          <Container>
            <Sticky>
              <CardTitle subtitle={petData?.resena?.especie} title={petData?.nombre} />
            </Sticky>
            <CardDetail title="Reseña" pathButton={!petData.veterinaria && '/editar-mascota'}>
              <>
                {petData?.resena?.especie && (
                  <ParagraphMD>
                    <strong>Especie</strong> {petData.resena.especie}
                  </ParagraphMD>
                )}
                {petData?.resena?.raza && (
                  <ParagraphMD>
                    <strong>Raza</strong> {petData.resena.raza}
                  </ParagraphMD>
                )}
                {petData?.resena?.sexo && (
                  <ParagraphMD>
                    <strong>Sexo</strong> <Capitalize>{petData.resena.sexo}</Capitalize>
                  </ParagraphMD>
                )}
                {petData?.resena?.pelaje && (
                  <ParagraphMD>
                    <strong>Pelaje</strong> {petData.resena.pelaje}
                  </ParagraphMD>
                )}
                {petData?.resena?.ultimoPeso && (
                  <ParagraphMD>
                    <strong>Último peso</strong> {petData.resena.ultimoPeso} Kg
                  </ParagraphMD>
                )}
                {petData?.resena?.fechaNacimiento && (
                  <ParagraphMD>
                    <strong>Fecha de nacimiento</strong> {petData.resena.fechaNacimiento}
                  </ParagraphMD>
                )}
                {petData?.resena?.fechaCastracion && (
                  <ParagraphMD>
                    <strong>Fecha de castración</strong> {petData.resena.fechaCastracion}
                  </ParagraphMD>
                )}
              </>
            </CardDetail>
            <CardDetailActionable path="/consultas" title="Consultas">
              <ParagraphMD>Ver el historial de consultas.</ParagraphMD>
            </CardDetailActionable>

            <CardDetailActionable path="/carnet" title="Carnet sanitario">
              <ParagraphMD>Vacuna antirrábica y otras</ParagraphMD>
            </CardDetailActionable>
          </Container>
        </>
      )}
    </>
  );
};

export default Mascota;
