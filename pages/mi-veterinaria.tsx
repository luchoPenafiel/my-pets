import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {
  Button,
  CardDetail,
  Container,
  Map,
  Navbar,
  PageWrapper,
  Separetor,
  StickyTitles,
  Splashscreen,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import theme from '../constants/theme';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { getVeterinaria, getVeterinarias, getLocalStorage } from '../services';
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

const Link = styled.a`
  color: ${theme.color.primary};
`;

const MiVeterinaria = (): ReactElement => {
  const [vetData, setVetData] = useState<IVet[]>();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const user = await getLocalStorage('user');

    if (user.veterinaria) {
      const response = await getVeterinaria(user.veterinaria);
      setVetData([response]);
    } else {
      const veterinarias = await getVeterinarias();
      setVetData(veterinarias);
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
                  {vetData?.length === 1 ? (
                    <>
                      <Title1>Mi</Title1>
                      <Title1>veterinaria</Title1>
                    </>
                  ) : (
                    <Title1>Veterinarias</Title1>
                  )}
                </>
              </StickyTitles>

              <Separetor />

              {vetData?.length === 1 ? (
                <>
                  {vetData[0].ubicacion && <Map markers={vetData} />}

                  <VetName>{vetData[0].nombre}</VetName>

                  {vetData[0].direccion && <ParagraphMD>{vetData[0].direccion}</ParagraphMD>}

                  {vetData[0].telefono && (
                    <ButtonsWrapper>
                      <Button href={`tel:${vetData[0].telefono}`}>
                        <>Llamar</>
                      </Button>
                    </ButtonsWrapper>
                  )}
                </>
              ) : (
                <>
                  {vetData.map((vet) => {
                    return (
                      <CardDetail key={vet.nombre} title={vet.nombre}>
                        <>
                          {vet.direccion && (
                            <ParagraphMD>
                              <strong>Dirección:</strong> {vet.direccion}
                            </ParagraphMD>
                          )}

                          {vet.telefono && (
                            <ParagraphMD>
                              <strong>Teléfono:</strong> <Link href={`tel:${vet.telefono}`}>{vet.telefono}</Link>
                            </ParagraphMD>
                          )}

                          {vet.ubicacion && (
                            <ParagraphMD>
                              <strong>Ubicación:</strong>{' '}
                              <Link
                                href={`https://www.google.com/maps/place/${vet.nombre}/@${vet.ubicacion.latitude},${vet.ubicacion.longitude},16z/data=!3m1!4b1!4m6!3m5!1s0x0:0x0!7e2!8m2!3d${vet.ubicacion.latitude}!4d${vet.ubicacion.longitude}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Ver en Google Maps
                              </Link>
                            </ParagraphMD>
                          )}
                        </>
                      </CardDetail>
                    );
                  })}
                </>
              )}
            </Container>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default MiVeterinaria;
