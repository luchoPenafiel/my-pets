import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button, Container, Map, Navbar, PageWrapper, Separetor, StickyTitles, Splashscreen } from '../components';
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

const MiVeterinaria = (): ReactElement => {
  const [vetData, setVetData] = useState<IVet[]>();
  const [vetsLocation, setVetsLocations] = useState([{ lat: 0, lng: 0 }]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const user = await getLocalStorage('user');

    if (user.veterinaria) {
      const response = await getVeterinaria(user.veterinaria);
      setVetData(response);
    } else {
      const veterinarias = await getVeterinarias();
      setVetData(veterinarias);

      const locations = [];

      veterinarias.map((vet) => {
        if (vet.ubicacion) {
          locations.push({ lat: vet.ubicacion.latitude, lng: vet.ubicacion.longitude });
        }
      });

      setVetsLocations(locations);
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

              {vetData?.length === 1 ? (
                <>
                  {vetData[0].ubicacion && (
                    <Map markers={[{ lat: vetData[0].ubicacion.latitude, lng: vetData[0].ubicacion.longitude }]} />
                  )}

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
                  <Map markers={vetsLocation} />

                  {vetData.map((vet) => {
                    return (
                      <div key={vet.nombre}>
                        <VetName>{vet.nombre}</VetName>
                        {vet.direccion && <ParagraphMD>{vet.direccion}</ParagraphMD>}
                        {vet.telefono && <a href={`tel:${vet.telefono}`}>{vet.telefono}</a>}

                        <Separetor />
                      </div>
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
