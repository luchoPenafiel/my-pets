import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  CenterButton,
  Container,
  CardDetail,
  Navbar,
  PageWrapper,
  Separetor,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ConsultContext } from '../contexts/ConsultContext';
import IConsult from '../interfaces/consulta';
import { getLocalStorage } from '../services';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import formatDate from '../utils/formatDate';
import IUser from '../interfaces/user';

const Consulta = (): ReactElement => {
  const [consultData, setConsultData] = useState<IConsult>();
  const { consult } = useContext(ConsultContext);
  const [userData, setUserData] = useState<IUser>();

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('consulta');
    const owner = await getLocalStorage('user');
    setUserData(owner);
    setConsultData(response);
  };

  useEffect(() => {
    if (!!consult.id) {
      setConsultData(consult);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Consulta | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <Navbar previusScreen="consultas" />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <Title1>Consulta</Title1>
          </StickyTitles>
          <Separetor />
          <CardDetail title="Detalle">
            <>
              {consultData?.fecha && (
                <ParagraphMD>
                  <strong>Fecha</strong> {formatDate(consultData.fecha)}
                </ParagraphMD>
              )}
              {consultData?.motivo && (
                <ParagraphMD>
                  <strong>Motivo de consulta</strong> {consultData.motivo}
                </ParagraphMD>
              )}
              {consultData?.doctor && (
                <ParagraphMD>
                  <strong>Profesional que atendió</strong> {consultData.doctor}
                </ParagraphMD>
              )}
              {consultData?.controlEn && (
                <ParagraphMD>
                  <strong>Próximo control</strong> {formatDate(consultData.controlEn)}
                </ParagraphMD>
              )}
            </>
          </CardDetail>
          {consultData?.diagnostico && (
            <CardDetail title="Diagóstico">
              <ParagraphMD>{consultData.diagnostico}</ParagraphMD>
            </CardDetail>
          )}
          {consultData?.tratamiento?.domicilio && (
            <CardDetail title="Tratamiento">
              <ParagraphMD>{consultData.tratamiento.domicilio}</ParagraphMD>
            </CardDetail>
          )}
          {!userData?.veterinaria && (
            <CenterButton>
              <Button variant="outlined" href="/editar-consulta" color="primary">
                <>Editar</>
              </Button>
            </CenterButton>
          )}
        </Container>
      </PageWrapper>
    </>
  );
};

export default Consulta;
