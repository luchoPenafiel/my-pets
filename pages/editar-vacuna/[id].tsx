import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import {
  Button,
  ButtonsWrapper,
  Container,
  ErrorText,
  InputWrapper,
  Navbar,
  Loading,
  PageWrapper,
  Separetor,
  StickyTitles,
  Splashscreen,
} from '../../components';
import { Title1 } from '../../components/Types/Titles/Titles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { PetContext } from '../../contexts/PetContext';
import { addVacuna, getLocalStorage, setLocalStorage } from '../../services';
import IPet from '../../interfaces/pet';
import IUser from '../../interfaces/user';

const Vacuna = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [errorService, setErrorService] = useState('');

  const { pet, changeStatePet } = useContext(PetContext);
  const [petData, setPetData] = useState<IPet>();
  const [userData, setUserData] = useState<IUser>();
  const [vacunState, setVacunState] = useState<any>();

  const { register, handleSubmit, errors } = useForm();

  const router = useRouter();
  const { id } = router.query;

  const getDataFromLocalStorage = async () => {
    const response = await getLocalStorage('pet');
    setPetData(response);
    setVacunState(response.carnetSanitario);
  };

  const loadInitialUserData = async () => {
    const userFromLocalStorage = await getLocalStorage('user');
    setUserData(userFromLocalStorage);

    setShowSplashScreen(false);
  };

  const onSubmit = async (formData) => {
    if (!formData.fecha && !formData.proximaDosis) {
      setErrorService('Debe agregar al menos una fecha');

      return;
    }

    setErrorService('');
    setIsLoading(true);

    const newOtherVacuns = vacunState.otrasVacunas.filter(
      (vacuna) => vacuna.nombre !== vacunState.otrasVacunas[Number(id)].nombre,
    );

    newOtherVacuns.push(formData);

    const carnetSanitario = {
      vacAntirrabica: { ...vacunState.vacAntirrabica },
      otrasVacunas: [...newOtherVacuns],
    };

    try {
      const data = {
        petId: petData.id,
        petName: petData.nombre,
        tutorData: userData,
        carnetSanitario,
        vacunControl: formData,
      };

      await addVacuna(data);

      changeStatePet({ ...petData, carnetSanitario });
      await setLocalStorage('pet', { ...petData, carnetSanitario });

      Router.replace('/success-edit-vacuna');
      setIsLoading(false);
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!!pet.id) {
      setVacunState(pet.carnetSanitario);
      setShowSplashScreen(false);
    } else {
      getDataFromLocalStorage();
      loadInitialUserData();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Vacuna | Vetapp</title>
      </Head>
      <Navbar previusScreen={`vacuna/${id}`} />
      {showSplashScreen ? (
        <Splashscreen />
      ) : (
        <PageWrapper>
          <Container>
            <Separetor />
            <StickyTitles>
              <Title1>Editar Vacuna</Title1>
            </StickyTitles>
            <Separetor />

            <form onSubmit={handleSubmit(onSubmit)}>
              <InputWrapper>
                <TextField
                  name="nombre"
                  label="Nombre de la vacuna"
                  fullWidth
                  InputProps={{
                    inputProps: {
                      name: 'nombre',
                      ref: register({ required: 'Tienes que ingresar el nombre de la vacuna' }),
                    },
                  }}
                  defaultValue={vacunState.otrasVacunas[Number(id)].nombre}
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
                  defaultValue={vacunState.otrasVacunas[Number(id)].fecha}
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
                  defaultValue={vacunState.otrasVacunas[Number(id)].proximaDosis}
                  error={Boolean(errors.proximaDosis)}
                  helperText={errors.proximaDosis?.message}
                />
              </InputWrapper>
              <ErrorText>{errorService}</ErrorText>

              <Separetor />

              <ButtonsWrapper>
                <Button type="submit">
                  <>Guardar cambios</>
                </Button>
                <Button href="/carnet" color="secondary" variant="outlined">
                  <>Cancelar</>
                </Button>
              </ButtonsWrapper>
            </form>
          </Container>
        </PageWrapper>
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default Vacuna;
