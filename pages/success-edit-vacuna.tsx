import React, { ReactElement } from 'react';
import Head from 'next/head';
import { CenterButton, Button, Container, Separetor, EmptyState, Navbar, PageWrapper } from '../components';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';

const SuccessEditVacuna = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna | Vetapp</title>
      </Head>
      <Navbar />
      <PageWrapper>
        <Container>
          <EmptyState title="¡Genial!">
            <>
              <ParagraphMD>Editaste la vacuna con éxito</ParagraphMD>

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

export default SuccessEditVacuna;
