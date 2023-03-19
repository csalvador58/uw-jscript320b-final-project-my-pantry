import React from 'react';
import { useTheme } from '@mui/material';
import classes from '../css/NavLinks.module.css';
import { NavLink } from 'react-router-dom';
import ColorModeContext from '../store/ColorModeContext';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { Box } from '@mui/material';

function NavLinks() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      // sx={{ backgroundColor: 'primary.main' }}
      className={classes['nav-link-container']}
    >
      <ul data-testid='nav-links' className={classes.links}>
        <li>
          <NavLink
            to='/home'
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/recipes'
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Recipes
          </NavLink>
        </li>
        {/* Add conditional render */}

        <li>
          <NavLink
            to='/edit'
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Edit
          </NavLink>
        </li>
        <li>
          <IconButton className={classes['dark-mode']} onClick={colorMode.toggleColorMode} color='inherit'>
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </li>
      </ul>
    </Box>
  );
}

export default NavLinks;
