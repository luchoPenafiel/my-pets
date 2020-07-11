import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Button, CardDetail, Container, Navbar, PageWrapper, StickyTitles, Separetor } from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import Router from 'next/router';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin-bottom: 15px;
  }
`;

const Ajustes = (): ReactElement => {
  const logout = () => {
    try {
      window.localStorage.clear();
      Router.replace('/');
    } catch (err) {
      Router.replace('/');
    }
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Ajustes | Vetapp</title>
      </Head>
      <Navbar />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <Title1>Ajustes</Title1>
          </StickyTitles>
          <Separetor />
          <CardDetail title="General">
            <ParagraphMD>
              <strong>Nombre</strong> Luciano Peñafiel
            </ParagraphMD>
          </CardDetail>
          <CardDetail title="Datos de Contacto">
            <>
              <ParagraphMD>
                <strong>Tel. Móvil</strong> Luciano Peñafiel
              </ParagraphMD>
              <ParagraphMD>
                <strong>Tel. Fijo</strong> Luciano Peñafiel
              </ParagraphMD>
              <ParagraphMD>
                <strong>Dirección</strong> Luciano Peñafiel
              </ParagraphMD>
              <ParagraphMD>
                <strong>Email</strong> Luciano Peñafiel
              </ParagraphMD>
            </>
          </CardDetail>

          <ButtonsWrapper>
            <Button>
              <>Editar datos</>
            </Button>
            <Button variant="outlined" color="secondary" onClick={logout}>
              <>Cerrar sesión</>
            </Button>
          </ButtonsWrapper>
        </Container>
      </PageWrapper>
    </>
  );
};

export default Ajustes;
