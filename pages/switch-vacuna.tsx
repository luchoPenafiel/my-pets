import React, { ReactElement } from 'react';
import Head from 'next/head';
import { CenterButton, Button, Container, Separetor, EmptyState, Navbar, PageWrapper } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const SwitchVacuna = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna | Vetapp</title>
      </Head>
      <Navbar previusScreen="carnet" />
      <PageWrapper>
        <Container>
          <EmptyState title="🤔">
            <>
              <ParagraphMD>¿Qué vacuna vas a cargar primero?</ParagraphMD>

              <Separetor />
              <CenterButton>
                <Button href="/agregar-vacuna-antirrabica">
                  <>Vacuna antirrábica</>
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
