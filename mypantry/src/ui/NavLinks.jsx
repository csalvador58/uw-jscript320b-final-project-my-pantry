import React from 'react';
import classes from '../css/NavLinks.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

function NavLinks() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ backgroundColor: 'primary.main' }}
      className={classes['nav-link-container']}
    >
      {true && (
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
              to='/pantry'
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Pantry
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
          {true && (
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
          )}
        </ul>
      )}
    </Box>
  );
}

export default NavLinks;
