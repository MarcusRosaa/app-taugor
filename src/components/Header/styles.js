import { withStyles } from '@material-ui/core/styles';
import MuiMenuItem from '@material-ui/core/MenuItem';

export const menuTheme = ({
  MenuItem: withStyles({
    root: {
      justifyContent: 'center',
    },
  })(MuiMenuItem),
});
