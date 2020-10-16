import React, { ReactElement } from 'react';
import Head from 'next/head';
import { CenterButton, Button, Container, Separetor, EmptyState, Navbar, PageWrapper } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const SuccessConsult = (): ReactElement => {
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
      <Navbar />
      <PageWrapper>
        <Container>
          <EmptyState title="¡Genial!">
            <>
              <ParagraphMD>Consulta editada con éxito</ParagraphMD>

              <Separetor />
              <CenterButton>
                <Button href="/consultas" color="primary">
                  <>Volver a las consutlas</>
                </Button>
              </CenterButton>
            </>
          </EmptyState>
        </Container>
      </PageWrapper>
    </>
  );
};

export default SuccessConsult;
