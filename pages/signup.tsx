import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {
  Button,
  CenterButton,
  Container,
  InputWrapper,
  ErrorText,
  Loading,
  Navbar,
  PageWrapper,
  Separetor,
  StickyTitles,
} from '../components';
import { Title1 } from '../components/Types/Titles/Titles';
import { ParagraphMD } from '../components/Types/Paragraphs/Paragraphs';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { addUser, signup as signupService, setLocalStorage } from '../services';

const Signup = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setErrorService('');

    try {
      const uid = await signupService(formData);
      const dataToAdd = {
        nombre: formData.nombre,
        email: formData.email,
        uid,
      };

      const userData = await addUser(dataToAdd);

      await setLocalStorage('user', userData);

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
        <title>Crear Usuario | Mis Mascotas</title>
        <meta
          name="description"
          content="Mis Mascotas es una aplicación que te permite hacer el seguimiento de controles médicos y el carnet sanitario de tus mascotas."
        />
      </Head>
      <Navbar previusScreen="login" withDrawer={false} />
      <PageWrapper>
        <Container>
          <Separetor />
          <StickyTitles>
            <>
              <Title1>Crear</Title1>
              <Title1>usuario</Title1>
            </>
          </StickyTitles>
          <ParagraphMD>
            Completaá tus datos para crear una cuenta y empezar a llevar toda la información de tus mascotas de manera
            fácil.
          </ParagraphMD>

          <Separetor />

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper>
              <TextField
                name="nombre"
                label="Nombre"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'nombre',
                    ref: register({ required: 'Tienes que ingresar tu nombre' }),
                  },
                }}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="email"
                label="Email"
                fullWidth
                type="email"
                InputProps={{
                  inputProps: {
                    name: 'email',
                    ref: register({ required: 'Tienes que ingresar tu email' }),
                  },
                }}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="password"
                label="Contraseña"
                fullWidth
                type="password"
                InputProps={{
                  inputProps: {
                    name: 'password',
                    ref: register({
                      required: 'Tienes que ingresar una contraseña',
                      minLength: {
                        value: 6,
                        message: 'La contraseña debe tener al menos 6 caracteres',
                      },
                    }),
                  },
                }}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </InputWrapper>

            <ErrorText>{errorService}</ErrorText>
            <Separetor />
            <CenterButton>
              <Button type="submit">
                <>Crear usuario</>
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

export default Signup;
