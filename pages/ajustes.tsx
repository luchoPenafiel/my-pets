import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import {
  Button,
  CardDetail,
  Container,
  Navbar,
  PageWrapper,
  StickyTitles,
  Separetor,
  Splashscreen,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD, ParagraphSM } from '../components/Types/Paragraphs/Paragraphs';
import Router from 'next/router';
import { getUserData, getLocalStorage, setLocalStorage } from '../services';
import IUser from '../interfaces/user';
import pkg from '../package.json';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    margin-bottom: 15px;
  }
`;

const Version = styled.div`
  text-align: center;
`;

const Ajustes = (): ReactElement => {
  const [userData, setUserData] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const logout = () => {
    try {
      window.localStorage.clear();
      Router.replace('/');
    } catch (err) {
      Router.replace('/');
    }
  };

  const loadUserData = async () => {
    try {
      const user = await getLocalStorage('user');
      const response = await getUserData(user.id);

      setUserData(response);

      setLocalStorage('user', response);
      setLoading(false);
    } catch (err) {
      //TODO: hacer algo con este error
      // eslint-disable-next-line no-console
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Ajustes | Vetapp</title>
      </Head>
      {loading ? (
        <Splashscreen />
      ) : (
        <>
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
                  <strong>Nombre</strong> {userData.nombre}
                </ParagraphMD>
              </CardDetail>
              <CardDetail title="Datos de Contacto">
                <>
                  {userData?.celular && (
                    <ParagraphMD>
                      <strong>Tel. Móvil</strong> {userData.celular}
                    </ParagraphMD>
                  )}
                  {userData?.telFijo && (
                    <ParagraphMD>
                      <strong>Tel. Fijo</strong> {userData.telFijo}
                    </ParagraphMD>
                  )}
                  {userData?.direccion && (
                    <ParagraphMD>
                      <strong>Dirección</strong> {userData.direccion}
                    </ParagraphMD>
                  )}
                  {userData?.email && (
                    <ParagraphMD>
                      <strong>Email</strong> {userData.email}
                    </ParagraphMD>
                  )}
                </>
              </CardDetail>

              <Separetor />

              <ButtonsWrapper>
                <Button variant="outlined" color="secondary" onClick={logout}>
                  <>Cerrar sesión</>
                </Button>
              </ButtonsWrapper>

              <Separetor />

              <Version>
                <ParagraphSM>v.{pkg.version}</ParagraphSM>
              </Version>
            </Container>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Ajustes;
