import React, { ReactElement, useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Button,
  CenterButton,
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
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Select as Dropdown, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { getLocalStorage, setLocalStorage, updatePet } from '../services';
import { PetContext } from '../contexts/PetContext';
import IPet from '../interfaces/pet';

const EditarMascota = (): ReactElement => {
  const { pet, changeStatePet } = useContext(PetContext);
  const [petData, setPetData] = useState<IPet>();

  const [loadInitialData, setLoadInitialData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errorService, setErrorService] = useState('');
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      await updatePet({ petId: petData.id, ...formData });

      changeStatePet({ ...petData, ...formData });
      await setLocalStorage('pet', { ...petData, ...formData });

      setIsLoading(false);

      Router.push('/mascota');
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  const cancelChanges = () => {
    Router.back();
  };

  const loadDataFromLocalStorage = async () => {
    const data = await getLocalStorage('pet');
    setPetData(data);
    setLoadInitialData(false);
  };

  useEffect(() => {
    if (pet.id) {
      setPetData(pet);
      setLoadInitialData(false);
    } else {
      loadDataFromLocalStorage();
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Editar Mascota | Mis Mascotas</title>
      </Head>
      {loadInitialData ? (
        <Splashscreen />
      ) : (
        <>
          <Navbar previusScreen="mascota" />
          <PageWrapper>
            <Container>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Editar</Title1>
                  <Title1>a {petData.nombre}</Title1>
                </>
              </StickyTitles>
              <Separetor />
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                  <TextField
                    name="nombre"
                    label="Nombre *"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        name: 'nombre',
                        ref: register({ required: 'Tienes que ingresar el nombre de tu mascota' }),
                      },
                    }}
                    defaultValue={petData.nombre}
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre?.message}
                  />
                </InputWrapper>

                <InputWrapper>
                  <FormControl fullWidth error={Boolean(errors?.resena?.especie)}>
                    <InputLabel>Especie *</InputLabel>
                    <Controller
                      as={
                        <Dropdown>
                          <MenuItem value="Canino">Canino</MenuItem>
                          <MenuItem value="Felino">Felino</MenuItem>
                          <MenuItem value="Otros">Otros</MenuItem>
                        </Dropdown>
                      }
                      name="resena[especie]"
                      rules={{ required: 'Seleccione una opción' }}
                      control={control}
                      defaultValue={petData.resena?.especie}
                    />
                    <FormHelperText>{errors?.resena?.especie?.message}</FormHelperText>
                  </FormControl>
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="resena[raza]"
                    label="Raza *"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        name: 'resena[raza]',
                        ref: register({ required: 'Tienes que ingresar una raza' }),
                      },
                    }}
                    error={Boolean(errors?.resena?.raza)}
                    helperText={errors?.resena?.raza?.message}
                    defaultValue={petData.resena?.raza}
                  />
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="resena[pelaje]"
                    label="Pelaje"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        name: 'resena[pelaje]',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors.pelaje)}
                    helperText={errors.pelaje?.message}
                    defaultValue={petData.resena?.pelaje}
                  />
                </InputWrapper>

                <InputWrapper>
                  <FormControl fullWidth error={Boolean(errors?.resena?.sexo)}>
                    <InputLabel>Sexo</InputLabel>
                    <Controller
                      as={
                        <Dropdown>
                          <MenuItem value="hembra">Hembra</MenuItem>
                          <MenuItem value="macho">Macho</MenuItem>
                        </Dropdown>
                      }
                      name="resena[sexo]"
                      control={control}
                      defaultValue={petData.resena?.sexo}
                    />
                    <FormHelperText>{errors?.resena?.sexo?.message}</FormHelperText>
                  </FormControl>
                </InputWrapper>

                <InputWrapper>
                  <TextField
                    name="resena[fechaNacimiento]"
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        name: 'resena[fechaNacimiento]',
                        ref: register(),
                      },
                    }}
                    error={Boolean(errors?.resena?.fechaNacimiento)}
                    helperText={errors?.resena?.fechaNacimiento?.message}
                    defaultValue={petData.resena?.fechaNacimiento}
                  />
                </InputWrapper>

                <ErrorText>{errorService}</ErrorText>

                <Separetor />
                <CenterButton>
                  <>
                    <Button type="submit">
                      <>Guardar cambios</>
                    </Button>

                    <Button onClick={cancelChanges} type="button" color="secondary" variant="outlined">
                      <>Cancelar</>
                    </Button>
                  </>
                </CenterButton>
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

export default EditarMascota;
