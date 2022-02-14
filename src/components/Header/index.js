import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Avatar, Button, Tooltip, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';

import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/taugorLogo.png';

import { useAuth } from '../../contexts/AuthContext';
import { NavMenuButton, MobileNavMenu } from './styles';

const settings = ['perfil', 'dashboard'];

export default function Header({ page }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [listTasksButtonSelected, setListTasksButtonSelected] = useState(false);
  const [createTaskButtonSelected, setCreateTaskButtonSelected] = useState(false);

  const { logout } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    if (page === '/') {
      setListTasksButtonSelected(true);
    } else if (page === 'new-task') {
      setCreateTaskButtonSelected(true);
    }
  }, [page]);

  async function handleLogout() {
    try {
      await logout();
      history('/login');
    } catch (error) {
      console.log(error);
    }
  }

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  function handleListTasks() {
    handleCloseNavMenu();

    setCreateTaskButtonSelected(false);
    setListTasksButtonSelected(true);

    history('/');
  }

  function handleCreateTask() {
    handleCloseNavMenu();

    setListTasksButtonSelected(false);
    setCreateTaskButtonSelected(true);

    history('/new-task');
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 999 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: {
              xs: 'space-between',
              md: 'unset',
            },
          }}
        >
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              height: 1,
              width: 1,
              maxHeight: { md: 200 },
              maxWidth: { md: 200 },
            }}
          >
            <Box
              component="img"
              sx={{
                height: 1,
                width: 1,
              }}
              alt="logo"
              src={logo}
            />
          </Box>
          <Box sx={{ flexGrow: { xs: 0, md: 1 }, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="conta do usuário atual"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <MobileNavMenu
                onClick={handleListTasks}
                className={listTasksButtonSelected ? 'active' : 'not_active'}
              >
                <ViewListIcon sx={{ mr: '5px', mb: '2px' }} />
                <Typography textAlign="center">Solicitações</Typography>
              </MobileNavMenu>

              <MobileNavMenu
                onClick={handleCreateTask}
                className={createTaskButtonSelected ? 'active' : 'not_active'}
              >
                <AddIcon sx={{ mr: '5px', mb: '2px' }} />
                <Typography textAlign="center">Nova solicitação</Typography>
              </MobileNavMenu>
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              height: 1,
              width: 1,
              maxHeight: { xs: 200 },
              maxWidth: { xs: 200 },
            }}
          >
            <Box
              component="img"
              sx={{
                height: 1,
                width: 1,
              }}
              alt="logo"
              src={logo}
            />
          </Box>
          <Box sx={{
            flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', m: '0 16px',
          }}
          >

            <NavMenuButton
              variant={listTasksButtonSelected ? 'contained' : 'outlined'}
              onClick={handleListTasks}
              sx={{
                my: 2,
                mx: '10px',
                display: 'flex',
              }}
              className={listTasksButtonSelected ? 'active' : 'not_active'}
            >
              <ViewListIcon sx={{ mr: '5px' }} />
              Solicitações
            </NavMenuButton>
            <NavMenuButton
              variant={createTaskButtonSelected ? 'contained' : 'outlined'}
              onClick={handleCreateTask}
              sx={{
                my: 2,
                mx: '10px',
                display: 'flex',
              }}
              className={createTaskButtonSelected ? 'active' : 'not_active'}
            >
              <AddIcon sx={{ mr: '5px' }} />
              Nova solicitação
            </NavMenuButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  style={{ justifyContent: 'center', padding: 0 }}
                  key={setting}
                  onClick={handleCloseUserMenu}
                >
                  <Typography textTransform="capitalize" textAlign="center" display="flex" width="100%">
                    <Link
                      style={{ textDecoration: 'none', width: '100%', padding: '6px 16px' }}
                      to={setting === 'perfil' ? '/profile' : '/'}
                    >
                      {setting}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                style={{ justifyContent: 'center' }}
                onClick={handleCloseUserMenu}
                sx={{ p: 0 }}
              >
                <Button
                  sx={{
                    color: '#1565c0',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    padding: '6px 16px',
                    width: 1,
                  }}
                  variant="text"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Header.propTypes = {
  page: PropTypes.string,
};

Header.defaultProps = {
  page: undefined,
};
