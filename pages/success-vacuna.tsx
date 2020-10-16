import React, { ReactElement } from 'react';
import Head from 'next/head';
import { CenterButton, Button, Container, Separetor, EmptyState, Navbar, PageWrapper } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const SuccessVacuna = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna | Mis Mascotas</title>
      </Head>
      <Navbar />
      <PageWrapper>
        <Container>
          <EmptyState title="¡Genial!">
            <>
              <ParagraphMD>Agregaste una vacuna con éxito</ParagraphMD>
              <ParagraphMD>Te notificaremos de ella para que no se olvide</ParagraphMD>

              <Separetor />
              <CenterButton>
                <Button href="/carnet" color="primary">
                  <>Volver al carnet</>
                </Button>
              </CenterButton>
            </>
          </EmptyState>
        </Container>
      </PageWrapper>
    </>
  );
};

export default SuccessVacuna;
