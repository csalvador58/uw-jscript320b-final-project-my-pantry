import React from 'react';
import classes from '../css/NavLinks.module.css';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

function NavLinks() {
  return (
    <Box sx={{backgroundColor: 'primary.main'}} className={classes['nav-link-container']}>
      <ul data-testid='nav-links' className={classes.links}>
        <li>
          <Link className={classes.link} to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/pantry'>
            Pantry
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/recipes'>
            Recipes
          </Link>
        </li>
        {/* Add conditional render */}
        {true && <li>
          <Link className={classes.link} to='/edit'>
            Edit
          </Link>
        </li>}
      </ul>
    </Box>
  );
}

export default NavLinks;
