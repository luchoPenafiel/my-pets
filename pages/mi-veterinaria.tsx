import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button, Container, Map, Navbar, PageWrapper, Separetor, StickyTitles, Splashscreen } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import theme from '../constants/theme';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { getVeterinaria, getLocalStorage } from '../services';
import IVet from '../interfaces/vet';

const VetName = styled.p`
  margin: 0;
  margin-bottom: 10px;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphLG};
  font-weight: ${theme.fontStyle.semibold};

  color: ${theme.color.primary};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 40px 0;

  a {
    margin-bottom: 10px;
  }
`;

const MiVeterinaria = (): ReactElement => {
  const [vetData, setVetData] = useState<IVet>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const user = await getLocalStorage('user');

    if (user.veterinaria) {
      const response = await getVeterinaria(user.veterinaria);
      setVetData(response);
    }

    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Mi veterinaria | Vetapp</title>
      </Head>
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Mi</Title1>
                  <Title1>veterinaria</Title1>
                </>
              </StickyTitles>
              <Separetor />

              {vetData?.ubicacion && <Map lat={vetData.ubicacion.latitude} lng={vetData.ubicacion.longitude} />}

              <VetName>{vetData?.nombre}</VetName>

              {vetData?.direccion && <ParagraphMD>{vetData.direccion}</ParagraphMD>}

              <ButtonsWrapper>
                {vetData?.telefono && (
                  <Button href={`tel:${vetData.telefono}`}>
                    <>Llamar</>
                  </Button>
                )}
              </ButtonsWrapper>
            </Container>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default MiVeterinaria;
