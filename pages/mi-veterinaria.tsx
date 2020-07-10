import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Container, Navbar, PageWrapper } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import theme from '../constants/theme';

const StickyTitles = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 60px;

  z-index: 2;

  background: ${theme.color.white};

  box-sizing: border-box;
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
          <StickyTitles>
            <Title1>Mi</Title1>
            <Title1>Veterinaria</Title1>
          </StickyTitles>
        </Container>
      </PageWrapper>
    </>
  );
};

export default MiVeterinaria;
