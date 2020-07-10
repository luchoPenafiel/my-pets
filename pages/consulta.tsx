import React, { ReactElement, useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Container, CardDetail, Navbar, PageWrapper, Separetor } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import theme from '../constants/theme';
import { ConsultContext } from '../contexts/ConsultContext';
import IConsult from '../interfaces/consulta';
import { getLocalStorage } from '../services';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import formatDate from '../utils/formatDate';

const StickyTitles = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;

  z-index: 2;

  background: ${theme.color.white};

  box-sizing: border-box;
`;

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
            </>
          </CardDetail>
        </Container>
      </PageWrapper>
    </>
  );
};

export default Consulta;
