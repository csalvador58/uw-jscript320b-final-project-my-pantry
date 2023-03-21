import React, { useCallback, useContext, useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../store/UserContext';
import { Box, Grid } from '@mui/material';
import recipesObj from '../store/respExample.json';
import classes from '../css/RecipesPage.module.css';
import RecipeForm from '../components/RecipeForm';

const LOCAL_STORE_TEMP_RECIPES = 'myPantry-temp-recipes';

function RecipesPage() {
  const appUser = useContext(UserContext);
  const [newData, setNewData] = useState(recipesObj);
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    if (!appUser.loginInfo) navigateToHome();
  }, [appUser.loginInfo, navigateToHome]);

  useEffect(() => {
    if (appUser.loginInfo) {
      console.log('Loading recipes from local...');
      try {
        if (JSON.parse(localStorage.getItem(LOCAL_STORE_TEMP_RECIPES))) {
          const errorCheck = JSON.parse(
            localStorage.getItem(LOCAL_STORE_TEMP_RECIPES)
          );

          try {
            // This will throw error if
            if (errorCheck[0].error) {
              console.log(
                'Data from local storage if not valid from last API fetch. It will not be used.'
              );
            }
          } catch (info) {
            // Local storage data is good to use.
            console.log(
              'Data from local storage is ok to use and will be loaded'
            );
            setNewData(
              JSON.parse(localStorage.getItem(LOCAL_STORE_TEMP_RECIPES))
            );
          }
        } else {
          console.log('No data to local storage data to load from.');
        }
      } catch (error) {
        console.log(
          `Temp browser storage has an error reading local storage data for My Pantry. Clearing store data: myPantry-temp-recipes`
        );
        localStorage.removeItem(LOCAL_STORE_TEMP_RECIPES);
      }
    }
  }, [appUser.loginInfo]);

  return (
    <>
      <Box data-testid='form-input' className={classes['form-input-container']}>
        <Grid
          className={classes['form-input-grid']}
          container
          spacing={2}
          direction='column'
          columns={12}
        >
          <RecipeForm classes={classes} setNewData={setNewData} />

          <Grid container item xs={12}>
            {newData &&
              newData.hits.map((recipe) => {
                return (
                  <Grid
                    key={uuidv4()}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    p={1}
                    zeroMinWidth
                  >
                    <RecipeCard food={recipe} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default RecipesPage;
