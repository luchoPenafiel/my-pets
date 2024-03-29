import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  ButtonsWrapper,
  CardDetail,
  CenterButton,
  Container,
  Navbar,
  PageWrapper,
  Separetor,
  StickyTitles,
  Splashscreen,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import formatDate from '../utils/formatDate';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage } from '../services';
import IPet from '../interfaces/pet';

const VacunaAntirrabica = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [vacunState, setVacunState] = useState<any>();
  const [petState, setPetState] = useState<IPet>();
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetState(response);
    setVacunState(response.carnetSanitario.vacAntirrabica);
    setLoading(false);
  };

  useEffect(() => {
    if (!!pet.id) {
      setVacunState(pet.carnetSanitario.vacAntirrabica);
      setPetState(pet);
      setLoading(false);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna Antirrábica | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <Navbar previusScreen="carnet" />
      {loading ? (
        <Splashscreen />
      ) : (
        <PageWrapper>
          <Container>
            <Separetor />
            <StickyTitles>
              <Title1>Vacuna Antirrábica</Title1>
            </StickyTitles>
            <Separetor />
            <CardDetail title="Detalle">
              <>
                {vacunState?.fecha && (
                  <ParagraphMD>
                    <strong>Fecha</strong> {formatDate(vacunState.fecha)}
                  </ParagraphMD>
                )}
                {vacunState?.proximaDosis && (
                  <ParagraphMD>
                    <strong>Próxima dósis</strong> {formatDate(vacunState.proximaDosis)}
                  </ParagraphMD>
                )}
              </>
            </CardDetail>

            {!petState.veterinaria && (
              <>
                <Separetor />
                <CenterButton>
                  <Button href="/agregar-vacuna-antirrabica" variant="outlined">
                    <>Editar</>
                  </Button>
                </CenterButton>
              </>
            )}
          </Container>
        </PageWrapper>
      )}
    </>
  );
};

export default VacunaAntirrabica;
