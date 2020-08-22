import React, { ReactElement, useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Button,
  CardDetail,
  CenterButton,
  Container,
  ErrorText,
  InputWrapper,
  Loading,
  PageWrapper,
  Navbar,
  Separetor,
  SmallSeparetor,
  StickyTitles,
  Splashscreen,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { PetContext } from '../contexts/PetContext';
import { updateCarnet, getLocalStorage, setLocalStorage } from '../services';
import IPet from '../interfaces/pet';

const AgregarVacuna = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplashScreen, setShowSplasScreen] = useState(true);
  const [errorService, setErrorService] = useState('');

  const [petData, setPetData] = useState<IPet>();

  const { pet, changeStatePet } = useContext(PetContext);
  const { register, handleSubmit, errors } = useForm();

  const loadInitialData = async () => {
    if (pet.id) {
      setPetData(pet);
    } else {
      const petFromLocalStorage = await getLocalStorage('pet');
      setPetData(petFromLocalStorage);
    }

    setShowSplasScreen(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const onSubmit = async ({ vacAntirrabica, otrasVacunas }) => {
    setIsLoading(true);

    const carnetSanitario = {
      vacAntirrabica,
      otrasVacunas: [otrasVacunas],
    };

    try {
      await updateCarnet({ petId: petData.id, carnetSanitario });

      changeStatePet({ ...petData, carnetSanitario });
      await setLocalStorage('pet', { ...petData, carnetSanitario });

      setIsLoading(false);

      Router.back();
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Vacunas | Vetapp</title>
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
                  <Title1>vacunas</Title1>
                </>
              </StickyTitles>
              <Separetor />

              <form onSubmit={handleSubmit(onSubmit)}>
                <CardDetail title="Vacuna Antirrábica">
                  <>
                    <SmallSeparetor />
                    <InputWrapper>
                      <TextField
                        name="vacAntirrabica[fecha]"
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: {
                            name: 'vacAntirrabica[fecha]',
                            ref: register(),
                          },
                        }}
                        error={Boolean(errors.vacAntirrabica?.fecha)}
                        helperText={errors.vacAntirrabica?.fecha?.message}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <TextField
                        name="vacAntirrabica[proximaDosis]"
                        label="Próxima dosis"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: {
                            name: 'vacAntirrabica[proximaDosis]',
                            ref: register(),
                          },
                        }}
                        error={Boolean(errors.vacAntirrabica?.proximaDosis)}
                        helperText={errors.vacAntirrabica?.proximaDosis?.message}
                      />
                    </InputWrapper>
                  </>
                </CardDetail>

                <CardDetail title="Otra vacuna">
                  <>
                    <InputWrapper>
                      <TextField
                        name="otrasVacunas[nombre]"
                        label="Nombre"
                        fullWidth
                        InputProps={{
                          inputProps: {
                            name: 'otrasVacunas[nombre]',
                            ref: register(),
                          },
                        }}
                        error={Boolean(errors.otrasVacunas?.nombre)}
                        helperText={errors.otrasVacunas?.nombre?.message}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <TextField
                        name="otrasVacunas[fecha]"
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: {
                            name: 'otrasVacunas[fecha]',
                            ref: register(),
                          },
                        }}
                        error={Boolean(errors.otrasVacunas?.fecha)}
                        helperText={errors.otrasVacunas?.fecha?.message}
                      />
                    </InputWrapper>

                    <InputWrapper>
                      <TextField
                        name="otrasVacunas[proximaDosis]"
                        label="Próxima dosis"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputProps: {
                            name: 'otrasVacunas[proximaDosis]',
                            ref: register(),
                          },
                        }}
                        error={Boolean(errors.otrasVacunas?.proximaDosis)}
                        helperText={errors.otrasVacunas?.proximaDosis?.message}
                      />
                    </InputWrapper>
                  </>
                </CardDetail>

                <ErrorText>{errorService}</ErrorText>

                <CenterButton>
                  <Button type="submit" color="primary">
                    <>Agregar</>
                  </Button>
                </CenterButton>
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
