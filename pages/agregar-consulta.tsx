import React, { ReactElement, useState, useEffect, useContext } from 'react';
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
  StickyTitles,
  Splashscreen,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { addConsult, getLocalStorage, setLocalStorage } from '../services';
import { PetContext } from '../contexts/PetContext';
import IPet from '../interfaces/pet';
import IUser from '../interfaces/user';

const AgregarConsulta = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplashScreen, setShowSplasScreen] = useState(true);
  const [errorService, setErrorService] = useState('');

  const [petData, setPetData] = useState<IPet>();
  const [userData, setUserData] = useState<IUser>();

  const { pet, changeStatePet } = useContext(PetContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const data = {
        petID: petData.id,
        petName: petData.nombre,
        ownerData: userData,
        consultData: { ...formData },
        petResena: petData.resena,
      };

      await addConsult({ ...data });

      if (!!formData.eog.peso) {
        const dataToUpdate = {
          ...petData,
          resena: {
            ...petData.resena,
            ultimoPeso: formData.eog.peso,
          },
        };

        changeStatePet(formData);
        await setLocalStorage('pet', dataToUpdate);
      }

      setIsLoading(false);

      Router.push('/success-add-consult');
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  const loadInitialData = async () => {
    if (pet.id) {
      setPetData(pet);
    } else {
      const petFromLocalStorage = await getLocalStorage('pet');
      setPetData(petFromLocalStorage);
    }

    const user = await getLocalStorage('user');
    setUserData(user);

    setShowSplasScreen(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Consulta | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      {showSplashScreen ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="consultas" />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Agregar</Title1>
                  <Title1>consulta</Title1>
                </>
              </StickyTitles>
              <Separetor />

              <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                  <TextField
                    name="fecha"
                    label="Fecha de la consulta *"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'fecha',
                        ref: register({ required: 'Ingresá la fecha de la consulta' }),
                      },
                    }}
                    error={Boolean(errors.fecha)}
                    helperText={errors.fecha?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="motivo"
                    label="Motivo de la consulta *"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'motivo',
                        ref: register({ required: 'Ingresá el motivo de la consulta' }),
                      },
                    }}
                    error={Boolean(errors.motivo)}
                    helperText={errors.motivo?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="eog[peso]"
                    label="Peso"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'eog[peso]',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.eog?.peso)}
                    helperText={errors.eog?.peso?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="diagnostico"
                    label="Diagnóstico *"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'diagnostico',
                        ref: register({ required: 'Ingresá el diagnostico' }),
                      },
                    }}
                    error={Boolean(errors.diagnostico)}
                    helperText={errors.diagnostico?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="tratamiento[domicilio]"
                    label="Tratamiento"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'tratamiento[domicilio]',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.tratamiendo?.domicilio)}
                    helperText={errors.tratamiendo?.domicilio?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="controlEn"
                    label="Próximo control"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'controlEn',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.controlEn)}
                    helperText={errors.controlEn?.message}
                  />
                </InputWrapper>

                <ErrorText>{errorService}</ErrorText>

                <Separetor />
                <ButtonsWrapper>
                  <Button type="submit">
                    <>Agregar consulta</>
                  </Button>
                  <Button href="consultas" variant="outlined" color="secondary">
                    <>Cancelar</>
                  </Button>
                </ButtonsWrapper>
                <Separetor />
              </form>
            </Container>
          </PageWrapper>
        </>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default AgregarConsulta;
