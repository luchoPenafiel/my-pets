import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  CardDetail,
  CenterButton,
  Container,
  Navbar,
  PageWrapper,
  Separetor,
  StickyTitles,
  Splashscreen,
} from '../../components';
import { Title1 } from '../../components/Types/Titles/Titles';
import { ParagraphMD } from '../../components/Types/Paragraphs/Paragraphs';
import formatDate from '../../utils/formatDate';
import { PetContext } from '../../contexts/PetContext';
import { getLocalStorage } from '../../services';
import { useRouter } from 'next/router';
import IPet from '../../interfaces/pet';

const Vacuna = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [vacunState, setVacunState] = useState<any>();

  const [petState, setPetState] = useState<IPet>();
  const { pet } = useContext(PetContext);

  const router = useRouter();
  const { id } = router.query;

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetState(response);
    setVacunState(response.carnetSanitario.otrasVacunas);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    if (!!pet.id) {
      setVacunState(pet.carnetSanitario.otrasVacunas);
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
        <title>Vacuna | Vetapp</title>
      </Head>
      <Navbar previusScreen="carnet" />
      {loading ? (
        <Splashscreen />
      ) : (
        <PageWrapper>
          <Container>
            <Separetor />
            <StickyTitles>
              <Title1>Vacuna {vacunState[Number(id)].nombre}</Title1>
            </StickyTitles>
            <Separetor />

            <CardDetail title="Detalle">
              <>
                {vacunState[Number(id)]?.fecha && (
                  <ParagraphMD>
                    <strong>Fecha</strong> {formatDate(vacunState[Number(id)].fecha)}
                  </ParagraphMD>
                )}
                {vacunState[Number(id)]?.proximaDosis && (
                  <ParagraphMD>
                    <strong>Próxima dósis</strong> {formatDate(vacunState[Number(id)].proximaDosis)}
                  </ParagraphMD>
                )}
              </>
            </CardDetail>

            {!petState.veterinaria && (
              <>
                <Separetor />
                <CenterButton>
                  <Button variant="outlined" href={`/editar-vacuna/${id}`}>
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

export default Vacuna;
