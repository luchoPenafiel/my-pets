import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Button,
  ButtonsWrapper,
  Container,
  ErrorText,
  InputWrapper,
  Loading,
  PageWrapper,
  Navbar,
  Separetor,
  Splashscreen,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { PetContext } from '../contexts/PetContext';
import { addVacuna, getLocalStorage, setLocalStorage } from '../services';
import IPet from '../interfaces/pet';
import IUser from '../interfaces/user';

const AgregarVacuna = (): ReactElement => {
  const [showSplashScreen, setShowSplasScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');

  const [petData, setPetData] = useState<IPet>();
  const [userData, setUserData] = useState<IUser>();

  const { pet, changeStatePet } = useContext(PetContext);
  const { register, handleSubmit, errors } = useForm();

  const loadInitialUserData = async () => {
    const userFromLocalStorage = await getLocalStorage('user');
    setUserData(userFromLocalStorage);

    setShowSplasScreen(false);
  };

  const loadInitialData = async () => {
    const petFromLocalStorage = await getLocalStorage('pet');
    setPetData(petFromLocalStorage);
  };

  const onSubmit = async (data) => {
    if (!data.fecha && !data.proximaDosis) {
      setErrorService('Debe agregar al menos una fecha');

      return;
    }

    setErrorService('');
    setIsLoading(true);

    const newOtrasVacunas: any = petData.carnetSanitario?.otrasVacunas || [];
    newOtrasVacunas.push(data);

    const carnetSanitario = {
      vacAntirrabica: { ...petData.carnetSanitario?.vacAntirrabica },
      otrasVacunas: [...newOtrasVacunas],
    };

    try {
      await addVacuna({
        petId: petData.id,
        petName: petData.nombre,
        tutorData: userData,
        carnetSanitario,
        vacunControl: data,
      });

      changeStatePet({ ...petData, carnetSanitario });
      await setLocalStorage('pet', { ...petData, carnetSanitario });

      Router.replace('/success-vacuna');
      setIsLoading(false);
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pet.id) {
      setPetData(pet);
      setShowSplasScreen(false);
    } else {
      loadInitialData();
      loadInitialUserData();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Vacuna | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      {showSplashScreen ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="carnet" />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Agregar</Title1>
                  <Title1>vacuna</Title1>
                </>
              </StickyTitles>
              <Separetor />

              <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                  <TextField
                    name="nombre"
                    label="Nombre"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'nombre',
                        ref: register({ required: 'El nombre es obligatório.' }),
                      },
                    }}
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="fecha"
                    label="Fecha"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'fecha',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.fecha)}
                    helperText={errors.fecha?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="proximaDosis"
                    label="Próxima dosis"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'proximaDosis',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.proximaDosis)}
                    helperText={errors.proximaDosis?.message}
                  />
                </InputWrapper>

                <ErrorText>{errorService}</ErrorText>

                <Separetor />

                <ButtonsWrapper>
                  <Button type="submit" color="primary">
                    <>Agregar</>
                  </Button>

                  <Button href="/carnet" color="secondary" variant="outlined">
                    <>Cancelar</>
                  </Button>
                </ButtonsWrapper>
              </form>
            </Container>
          </PageWrapper>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default AgregarVacuna;
