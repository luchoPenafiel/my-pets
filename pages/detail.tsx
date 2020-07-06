import React, { ReactElement, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { CardTitle, CardDetail, CardDetailActionable, Container, HeaderPet, Navbar, Splashscreen } from '../components';
import { getLocalStorage } from '../services';
import { PetContext } from '../contexts/PetContext';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import IPet from '../interfaces/pet';

const Sticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 120px;

  z-index: 2;
`;

const Detail = (): ReactElement => {
  const [petData, setPetData] = useState<IPet>();
  const [loading, setLoading] = useState(true);
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setLoading(false);
  };

  useEffect(() => {
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
        <title>Vetapp - Mascota</title>
      </Head>
      <Navbar bgColor="transparent" color="white" backButton />
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <HeaderPet especie={petData.resena.especie} />
          <Container>
            <Sticky>
              <CardTitle subtitle={petData.resena.especie} title={petData.nombre} />
            </Sticky>
            <CardDetail title="Reseña">
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
                    <strong>Sexo</strong> {petData.resena.sexo}
                  </ParagraphMD>
                )}
                {petData?.resena?.pelaje && (
                  <ParagraphMD>
                    <strong>Pelaje</strong> {petData.resena.pelaje}
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

            <CardDetailActionable path="/carnet/[id]" as={`/carnet/${petData.id}`} title="Carnet sanitario">
              <ParagraphMD>Vacuna antirrábica y otras</ParagraphMD>
            </CardDetailActionable>

            <CardDetailActionable path="/consultas/[id]" as={`/consultas/${petData.id}`} title="Consultas">
              <ParagraphMD>Ver el historial de consultas.</ParagraphMD>
            </CardDetailActionable>
          </Container>
        </>
      )}
    </>
  );
};

export default Detail;
