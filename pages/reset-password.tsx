import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  CenterButton,
  Container,
  EmptyState,
  InputWrapper,
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
import { passwordResetEmail } from '../services';

const ResetPassword = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState({ show: false, title: '', message: '' });
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ email }: any) => {
    setLoading(true);

    try {
      await passwordResetEmail(email);
      setConfirmationMessage({
        show: true,
        title: '¡Genial!',
        message: 'Te enviamos un email a tu cuenta con las instrucciones para que recuperes tu clave.',
      });
      setLoading(false);
    } catch (err) {
      setConfirmationMessage({
        show: true,
        title: 'Oops',
        message: 'No pudimos enviarte el email, porfavor, vuelve a intentar.',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>Cambiar contraseña | Mis Mascotas</title>
      </Head>
      <Navbar previusScreen="ajustes" withDrawer={false} />
      <PageWrapper>
        <Container>
          {confirmationMessage.show ? (
            <EmptyState title={confirmationMessage.title}>
              <ParagraphMD>{confirmationMessage.message}</ParagraphMD>
            </EmptyState>
          ) : (
            <>
              <Separetor />
              <StickyTitles>
                <>
                  <Title1>Cambiar</Title1>
                  <Title1>contraseña</Title1>
                </>
              </StickyTitles>
              <ParagraphMD>
                Para cambiar tu contraseña solo debes ingresar a continuación tu email y te enviaremos las instrucciones
                de como seguir.
              </ParagraphMD>
              <Separetor />

              <form onSubmit={handleSubmit(onSubmit)}>
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

                <Separetor />

                <CenterButton>
                  <Button type="submit">
                    <>Cambiar</>
                  </Button>
                </CenterButton>
              </form>
            </>
          )}
        </Container>
      </PageWrapper>
      {loading && <Loading />}
    </>
  );
};

export default ResetPassword;
