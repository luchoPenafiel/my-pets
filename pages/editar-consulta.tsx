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
import IConsult from '../interfaces/consulta';
import { ConsultContext } from '../contexts/ConsultContext';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage, updateConsult } from '../services';
import IPet from '../interfaces/pet';
import IUser from '../interfaces/user';

const EditarConsulta = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplashScreen, setShowSplasScreen] = useState(true);
  const [errorService, setErrorService] = useState('');

  const [intialData, setInitialData] = useState<IConsult>();
  const [petData, setPetData] = useState<IPet>();
  const [userData, setUserData] = useState<IUser>();

  const { consult } = useContext(ConsultContext);
  const { pet } = useContext(PetContext);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      let data = {
        petID: petData.id,
        consultID: intialData.id,
        ownerID: userData.id,
        tutorData: userData,
        petName: petData.nombre,
        consultData: {
          ...formData,
        },
      };

      if (intialData.controlID) {
        data = {
          ...data,
          consultData: {
            ...data.consultData,
            controlID: intialData.controlID,
          },
        };
      }

      await updateConsult(data);
      Router.push('/success-edit-consult');
      setIsLoading(false);
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  const loadInitialData = async () => {
    if (consult.id) {
      setInitialData(consult);
    } else {
      const dataFromLocalStorage = await getLocalStorage('consulta');

      setInitialData(dataFromLocalStorage);
    }

    if (pet.id) {
      setPetData(pet);
    } else {
      const dataFromLocalStorage = await getLocalStorage('pet');

      setPetData(dataFromLocalStorage);
    }

    const useDataFromLocalStorage = await getLocalStorage('user');
    setUserData(useDataFromLocalStorage);

    setShowSplasScreen(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Editar Consulta | Mis Mascotas</title>
      </Head>
      {showSplashScreen ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="consulta" />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Editar</Title1>
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
                        ref: register({ required: 'Tienes que ingresar la fecha de la consulta' }),
                      },
                    }}
                    defaultValue={intialData.fecha}
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
                        ref: register({ required: 'Tienes que ingresar el motivo de la consulta' }),
                      },
                    }}
                    defaultValue={intialData.motivo}
                    error={Boolean(errors.motivo)}
                    helperText={errors.motivo?.message}
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
                        ref: register({ required: 'Tienes que ingresar el diagnostico' }),
                      },
                    }}
                    defaultValue={intialData.diagnostico}
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
                    defaultValue={intialData.tratamiento.domicilio}
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
                    defaultValue={intialData.controlEn}
                    error={Boolean(errors.controlEn)}
                    helperText={errors.controlEn?.message}
                  />
                </InputWrapper>

                <ErrorText>{errorService}</ErrorText>

                <Separetor />
                <ButtonsWrapper>
                  <Button type="submit">
                    <>Guardar cambios</>
                  </Button>

                  <Button type="button" variant="outlined" color="secondary">
                    <>Cancelar cambios</>
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

export default EditarConsulta;
