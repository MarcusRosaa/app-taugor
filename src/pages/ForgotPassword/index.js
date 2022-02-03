import { useRef, useState } from 'react';

import {
  Button, Container, Typography, Grid,
  Box, CssBaseline, TextField, Alert,
} from '@mui/material';

import { Link } from 'react-router-dom';

import Copyright from '../../components/Copyright';

import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError('');
      setMessage('');
      await resetPassword(emailRef.current.value);
      setMessage('Instruções para resetar senha enviadas com sucesso para o seu email');
    } catch {
      setError('Falha ao resetar senha');
    }
  }

  return (
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
        <Typography component="h1" variant="h5">
          Resete sua senha
        </Typography>

        {error && (
          <Alert variant="outlined" severity="error" sx={{ width: 1, justifyContent: 'center', mt: '16px' }}>
            {' '}
            {error}
            {' '}
          </Alert>
        )}

        {message && (
        <Alert variant="outlined" severity="success" sx={{ width: 1, justifyContent: 'center', mt: '16px' }}>
          {' '}
          {message}
          {' '}
        </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                inputRef={emailRef}
                required
                fullWidth
                name="resetEmail"
                label="Email"
                type="email"
                id="resetEmail"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Resetar senha
          </Button>
        </Box>
        <Grid container alignItems="flex-end" flexDirection="column">
          <Grid item sx={{ mb: '8px' }}>
            <Link to="/login" variant="body2">
              Logar
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" variant="body2">
              Não possui uma conta? Crie uma aqui
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
