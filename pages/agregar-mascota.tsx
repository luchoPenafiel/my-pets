import React, { ReactElement } from 'react';
import Head from 'next/head';
import {
  AddButton,
  Button,
  CardActionable,
  CenterButton,
  Container,
  InputWrapper,
  PageWrapper,
  Splashscreen,
  Navbar,
  Separetor,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

const AagregarMascota = (): ReactElement => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formData) => {
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Mascota | Vetapp</title>
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

            {/* TODO: esto debe ser un select */}
            <InputWrapper>
              <TextField
                name="especie"
                label="Especie *"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'especie',
                    ref: register({ required: 'Tienes que ingresar una especie' }),
                  },
                }}
                error={Boolean(errors.especie)}
                helperText={errors.especie?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="raza"
                label="Raza *"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'raza',
                    ref: register({ required: 'Tienes que ingresar una raza' }),
                  },
                }}
                error={Boolean(errors.raza)}
                helperText={errors.raza?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="pelaje"
                label="Pelaje"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'pelaje',
                    ref: register(),
                  },
                }}
                error={Boolean(errors.pelaje)}
                helperText={errors.pelaje?.message}
              />
            </InputWrapper>

            {/* TODO: falta agregar fecha de nacimiento y sexo */}
          </form>
        </Container>
      </PageWrapper>
    </>
  );
};

export default AagregarMascota;
