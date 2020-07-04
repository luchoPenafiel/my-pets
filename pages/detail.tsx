import React, { ReactElement, useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { PetContext } from '../contexts/PetContext';
import { CardTitle, Container, HeaderPet, Navbar, Splashscreen } from '../components';
import { getLocalStorage } from '../services';
import IPet from '../interfaces/pet';

const Detail = (): ReactElement => {
  const [petData, setPetData] = useState<IPet>();
  const [loading, setLoading] = useState(true);
  const { pet } = useContext(PetContext);

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setLoading(false);
  };

  useEffect(() => {
    if (!!pet.id) {
      setPetData(pet);
      setLoading(false);
    } else {
      getDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <title>Vetapp - Mascota</title>
      </Head>
      <Navbar bgColor="transparent" color="white" backButton />
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <HeaderPet especie={petData.resena.especie} />
          <Container>
            <CardTitle subtitle={petData.resena.especie} title={petData.nombre} />
          </Container>
        </>
      )}
    </>
  );
};

export default Detail;
