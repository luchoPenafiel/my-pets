import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import { Container, CardDetail, Navbar, PageWrapper, Separetor, StickyTitles } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ConsultContext } from '../contexts/ConsultContext';
import IConsult from '../interfaces/consulta';
import { getLocalStorage } from '../services';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import formatDate from '../utils/formatDate';

const Consulta = (): ReactElement => {
  const [consultData, setConsultData] = useState<IConsult>();
  const { consult } = useContext(ConsultContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('consulta');
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
        <title>Consulta | Vetapp</title>
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
        </Container>
      </PageWrapper>
    </>
  );
};

export default Consulta;