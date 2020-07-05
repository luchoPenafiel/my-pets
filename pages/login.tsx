import React, { ReactElement, useContext } from 'react';
import Head from 'next/head';
import { Login as LoginComponent, Splashscreen } from '../components';
import { LoadingContext } from '../contexts/LoadingContext';

const Login = (): ReactElement => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vetapp - Login</title>
      </Head>
      {isLoading ? <Splashscreen /> : <LoginComponent />}
    </>
  );
};

export default Login;
