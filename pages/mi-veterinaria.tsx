import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Container, Map, Navbar, PageWrapper, Separetor, StickyTitles } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import theme from '../constants/theme';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const VetName = styled.p`
  margin: 0;
  margin-bottom: 10px;

  font-family: ${theme.fontFamily.primary};
  font-size: ${theme.fontSize.desktop.paragraphLG};
  font-weight: ${theme.fontStyle.semibold};

  color: ${theme.color.primary};
`;

const MiVeterinaria = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Mi veterinaria | Vetapp</title>
      </Head>
      <Navbar />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <>
              <Title1>Mi</Title1>
              <Title1>Veterinaria</Title1>
            </>
          </StickyTitles>
          <Separetor />
          <Map lat={-31.539} lng={-68.5277} />
          <VetName>Veterinaria Dr. Chapatín</VetName>
          <ParagraphMD>Av Siempre Viva 123 (oeste)</ParagraphMD>
        </Container>
      </PageWrapper>
    </>
  );
};

export default MiVeterinaria;
