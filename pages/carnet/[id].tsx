import React, { ReactElement, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const CarnetSanitario = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Carnet Sanitario | Vetapp</title>
      </Head>
      <div>{id}</div>
    </>
  );
};

export default CarnetSanitario;
