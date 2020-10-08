import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import { CardDetail, Container, Navbar, PageWrapper, Separetor, StickyTitles, Splashscreen } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import formatDate from '../utils/formatDate';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage } from '../services';

const VacunaAntirrabica = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [vacunState, setVacunState] = useState<any>();
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setVacunState(response.carnetSanitario.vacAntirrabica);
    setLoading(false);
  };

  useEffect(() => {
    if (!!pet.id) {
      setVacunState(pet.carnetSanitario.vacAntirrabica);
      setLoading(false);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna Antirrábica | Vetapp</title>
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
          </Container>
        </PageWrapper>
      )}
    </>
  );
};

export default VacunaAntirrabica;
