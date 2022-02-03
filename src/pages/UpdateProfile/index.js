import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import {
  Button, Container, Typography, Grid,
  Box, CssBaseline, TextField, Alert,
} from '@mui/material';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { Link, useNavigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAuth } from '../../contexts/AuthContext';

const theme = createTheme();

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { currentUser, updatePasswordInfo, updateEmailInfo } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Senhas não conferem');
    }

    const promises = [];
    setError('');
    setLoading(true);

    if (emailRef.current.value !== emailRef.current) {
      promises.push(updateEmailInfo(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePasswordInfo(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      history('/', { replace: true });
    }).catch(() => {
      setError('Falha ao editar conta');
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ModeEditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Editar dados do perfil
          </Typography>

          {error && (
          <Alert variant="outlined" severity="error" sx={{ width: 1, justifyContent: 'center', mt: '16px' }}>
            {' '}
            {error}
            {' '}
          </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={firstNameRef}
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Primeiro nome"
                  autoComplete="given-name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputRef={lastNameRef}
                  fullWidth
                  id="lastName"
                  label="Sobrenome"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={emailRef}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={currentUser.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={passwordRef}
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Deixe em branco para manter igual"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  inputRef={passwordConfirmRef}
                  fullWidth
                  name="passwordConfirm"
                  label="Confirmar Senha"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                  placeholder="Deixe em branco para manter igual"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Editar perfil
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/" variant="body2">
                  Cancelar
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
