import React, { ReactElement } from 'react';
import Head from 'next/head';
import { CenterButton, Button, Container, Separetor, EmptyState, Navbar, PageWrapper } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const SwitchVacuna = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <Navbar previusScreen="carnet" />
      <PageWrapper>
        <Container>
          <EmptyState title="🤔">
            <>
              <ParagraphMD>¿Qué vacuna vas a agregar?</ParagraphMD>

              <Separetor />
              <CenterButton>
                <Button href="/agregar-vacuna-antirrabica">
                  <>Antirrábica</>
                </Button>
              </CenterButton>

              <Separetor />
              <CenterButton>
                <Button href="/agregar-vacuna">
                  <>Otra vacuna</>
                </Button>
              </CenterButton>
            </>
          </EmptyState>
        </Container>
      </PageWrapper>
    </>
  );
};

export default SwitchVacuna;
