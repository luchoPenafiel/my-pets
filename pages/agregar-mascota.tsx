import React, { ReactElement, useState } from 'react';
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
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Select as Dropdown, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { addPet, getLocalStorage } from '../services';

const AagregarMascota = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const user = await getLocalStorage('user');
      await addPet({ ...formData, tutor: user.id });

      setIsLoading(false);
      Router.push('/');
    } catch (err) {
      setErrorService(err.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Mascota | Mis Mascotas</title>
      </Head>
      <Navbar previusScreen="index" />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <>
              <Title1>Agregar</Title1>
              <Title1>mascota</Title1>
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
                  defaultValue=""
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
                  defaultValue=""
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
              />
            </InputWrapper>

            <ErrorText>{errorService}</ErrorText>

            <Separetor />
            <CenterButton>
              <Button type="submit">
                <>Crear mascota</>
              </Button>
            </CenterButton>
            <Separetor />
          </form>
        </Container>
      </PageWrapper>
      {isLoading && <Loading />}
    </>
  );
};

export default AagregarMascota;
