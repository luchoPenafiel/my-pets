import React, { ReactElement, useContext, useState, useEffect } from 'react';
import Head from 'next/head';
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
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { PetContext } from '../contexts/PetContext';
import { getLocalStorage, addCarnet, setLocalStorage } from '../services';
import Router from 'next/router';
import IPet from '../interfaces/pet';

const AgregarVacuna = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');

  const [otrasVacunasState, setOtrasVacunasState] = useState([{ nombre: '', fecha: '', proximaDosis: '' }]);

  const [petData, setPetData] = useState<IPet>();
  const { pet } = useContext(PetContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    if (!formData.vacAntirrabica.proximaDosis && !formData.otrasVacunas.nombre) {
      setErrorService('Tienes que completar al menos una vacuna.');

      return;
    }

    setIsLoading(true);
    setErrorService('');

    const body = {
      petId: petData.id,
      carnetSanitario: {
        vacAntirrabica: formData.vacAntirrabica,
        otrasVacunas: [formData.otrasVacunas],
      },
    };

    try {
      await addCarnet({ ...body });
      await setLocalStorage('pet', { ...petData, carnetSanitario: body.carnetSanitario });
      setIsLoading(false);

      Router.push('/carnet');
    } catch (err) {
      setErrorService('Algo salió mal, vuelve a intentar en unos minutos.');
      setIsLoading(false);
    }
  };

  const updatePetData = async () => {
    const petFromLocalStorage = await getLocalStorage('pet');
    setPetData(petFromLocalStorage);
  };

  useEffect(() => {
    if (pet.id) {
      setPetData(pet);
    } else {
      updatePetData();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Vacunas | Vetapp</title>
      </Head>
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

            <CardDetail title="Otras vacunas">
              <>
                <SmallSeparetor />
                {otrasVacunasState.map((vacuna) => {
                  return (
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
                  );
                })}
              </>
            </CardDetail>

            {errorService && <ErrorText>{errorService}</ErrorText>}

            <CenterButton>
              <Button type="submit">
                <>Agregar</>
              </Button>
            </CenterButton>
          </form>
        </Container>
      </PageWrapper>
      {isLoading && <Loading />}
    </>
  );
};

export default AgregarVacuna;
