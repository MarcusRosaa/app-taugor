import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Avatar, Button, Tooltip, MenuItem,
} from '@mui/material';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';

import logo from '../../assets/images/taugorLogo.png';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['perfil', 'dashboard'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogout() {

  }

  return (
    <AppBar position="static">
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              >
                <Button
                  sx={{
                    color: '#1565c0',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    padding: '0',
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
