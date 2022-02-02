import {
  Card, CardContent, Button, Typography, Box, Alert,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';

import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useNavigate();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history('/login');
    } catch {
      setError('Ocorreu uma falha ao deslogar');
    }
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          width: 1,
          mt: '32px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card sx={{
          width: 1,
          maxWidth: 600,
          ml: '16px',
          mr: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <CardContent sx={{ width: 1 }}>
            <Typography variant="h5" fontWeight="600" textAlign="center" color="text.primary" gutterBottom>
              Seu perfil
            </Typography>

            {error && (
            <Alert variant="outlined" severity="error" sx={{ width: 1, justifyContent: 'center' }}>
              {' '}
              {error}
              {' '}
            </Alert>
            )}

            <Box
              sx={{
                width: 1,
                maxWidth: 300,
                ml: 'auto',
                mr: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography fontSize="17px" color="text.primary" sx={{ ml: '16px' }} fontWeight="600">
                Email:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: '16px' }}>
                {currentUser.email}
              </Typography>
            </Box>

          </CardContent>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: '16px', mb: '8px', maxWidth: '200px', p: 0,
            }}
          >
            <Link to="/update-profile" style={{ width: '100%', padding: '6px 16px' }}>
              Editar Perfil
            </Link>
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: '8px', mb: '16px', maxWidth: '200px' }}
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </Card>
      </Box>
    </>
  );
}
