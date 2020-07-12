import React, { ReactElement } from 'react';
import Head from 'next/head';
import {
  AddButton,
  Button,
  CardActionable,
  CenterButton,
  Container,
  PageWrapper,
  Splashscreen,
  Navbar,
  Separetor,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const AagregarMascota = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Mascota | Vetapp</title>
      </Head>
      <Navbar previusScreen="index" />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <>
              <Title1>Agregar</Title1>
              <Title1>mascota</Title1>
            </>
          </StickyTitles>
          <Separetor />
        </Container>
      </PageWrapper>
    </>
  );
};

export default AagregarMascota;
