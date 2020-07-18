import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
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
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

const AgregarConsulta = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorService, setErrorService] = useState('');
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (formData) => {
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Agregar Consulta | Vetapp</title>
      </Head>
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
                    ref: register({ required: 'Tienes que ingresar la fecha de la consulta' }),
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
                InputProps={{
                  inputProps: {
                    name: 'motivo',
                    ref: register({ required: 'Tienes que ingresar el motivo de la consulta' }),
                  },
                }}
                error={Boolean(errors.motivo)}
                helperText={errors.motivo?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="diagnostico"
                label="Diagnóstico *"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'diagnostico',
                    ref: register({ required: 'Tienes que ingresar el diagnostico' }),
                  },
                }}
                error={Boolean(errors.diagnostico)}
                helperText={errors.diagnostico?.message}
              />
            </InputWrapper>

            <InputWrapper>
              <TextField
                name="tratamiendo[domicilio]"
                label="Tratamiento"
                fullWidth
                InputProps={{
                  inputProps: {
                    name: 'tratamiendo[domicilio]',
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
            <CenterButton>
              <Button type="submit">
                <>Agregar consulta</>
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

export default AgregarConsulta;
