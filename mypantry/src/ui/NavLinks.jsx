import React from 'react';
import classes from '../css/NavLinks.module.css';
import { Link } from 'react-router-dom';

function NavLinks() {
  return (
    <div className={classes.bottom}>
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
        {false && <li>
          <Link className={classes.link} to='/edit'>
            Edit
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default NavLinks;
