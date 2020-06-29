import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Login as LoginComponent } from '../components';

const Login = (): ReactElement => {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Vetapp - Login</title>
      </Head>
      <LoginComponent />
    </>
  );
};

export default Login;
