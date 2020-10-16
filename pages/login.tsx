import React, { ReactElement, useContext, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Login as LoginComponent, Loading } from '../components';
import { LoadingContext } from '../contexts/LoadingContext';
import { login, setLocalStorage } from '../services';

const Login = (): ReactElement => {
  const [errorService, setErrorService] = useState('');
  const { isLoading, changeStateLoading } = useContext(LoadingContext);

  const handleLogin = async (email, password) => {
    changeStateLoading(true);
    try {
      const user = await login(email, password);
      await setLocalStorage('user', user);

      Router.push('/');
    } catch ({ message }) {
      setErrorService(message);
      changeStateLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <LoginComponent errorService={errorService} handleLogin={handleLogin} />
      {isLoading && <Loading />}
    </>
  );
};

export default Login;
