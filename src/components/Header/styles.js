import { withStyles } from '@material-ui/core/styles';
import { Button, MenuItem } from '@mui/material';

export const NavMenuButton = withStyles({
  root: {
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(211,211,211, 0.3)',
    },
    '&.active': {
      backgroundColor: '#fff',
      color: '#2676D2',
    },
    '&.not_active': {
      color: '#fff',
    },
  },
})(Button);

export const MobileNavMenu = withStyles({
  root: {
    '&.active': {
      backgroundColor: '#2676D2',
      color: '#fff',
    },
    '&.not_active': {
      color: '#2676D2',
    },
  },
})(MenuItem);
