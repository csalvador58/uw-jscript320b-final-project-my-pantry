import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../store/UserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classes from '../css/RecipesPage.module.css';
import recipesObj from '../store/respExample.json';
import RecipeCard from '../components/RecipeCard';
import { v4 as uuidv4 } from 'uuid';
import FadeCard from '../components/FadeCard';

const BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const API_KEY = process.env.REACT_APP_EDAMAM_RECIPE_API;
const APP_ID = process.env.REACT_APP_EDAMAM_RECIPE_ID;
const LOCAL_STORE_TEMP_RECIPES = 'myPantry-temp-recipes';

const validationSchema = yup.object({
  query: yup
    .string('Ingredients')
    .required('Please enter ingredients and separate with a comma (,)'),
  exclude: yup.string('Ingredients to exclude'),
});

const defaultFormikValues = {
  query: '',
  exclude: '',
};

function RecipesPage() {
  const appUser = useContext(UserContext);
  const [newData, setNewData] = useState(recipesObj);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

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

  const formik = useFormik({
    initialValues: defaultFormikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // create string from query input
      const queryStr = values.query;
      const query = queryStr.replace(/,/g, '%2C').replace(/ /g, '%20');

      // create string from exclude input
      let exclude;
      if (values.exclude) {
        const excludeStr = values.exclude;
        const arrayExclude = excludeStr.split(/,\s|,\s*|\s*,\s*/);
        exclude = arrayExclude
          .map((item) => `&excluded=${item.replace(/ /g, '%20')}`)
          .join('');
      } else {
        exclude = '';
      }

      // create url
      // const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;

      //********************************************************************************
      // const url = `https://cors-anywhere.herokuapp.com/${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;
      const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
        // fetch(url, {
        //   mode: 'no-cors'
        // })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          try {
            // Error check test. If the attempt to read the error field in responseJson fails, data from API is good and catch block will save data.
            if (data[0].error) {
              console.log(
                'Error is present from fetch. Data will not be saved.'
              );
            }
          } catch (info) {
            setNewData(data);

            const recipesData = JSON.stringify(data);
            localStorage.setItem(LOCAL_STORE_TEMP_RECIPES, recipesData);
          }
        })
        .catch((e) => {
          if (e instanceof SyntaxError) {
            console.log(e, true);
          } else {
            console.log(e, false);
          }
        });

      //***************************************************************************************

      //   const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;

      // fetch(url)
      //   .then(function (data) {
      //     return data.json();
      //   })
      //   .then(function (responseJson) {
      //     try {
      //       // Error check test. If the attempt to read the error field in responseJson fails, data from API is good and catch block will save data.
      //       if (responseJson[0].error) {
      //         console.log(
      //           'Error is present from fetch. Data will not be saved.'
      //         );
      //       }
      //     } catch (info) {
      //       setNewData(responseJson);

      //       const data = JSON.stringify(responseJson);
      //       localStorage.setItem(LOCAL_STORE_TEMP_RECIPES, data);
      //     }
      //   })
      //   .catch((e) => {
      //     if (e instanceof SyntaxError) {
      //       console.log(e, true);
      //     } else {
      //       console.log(e, false);
      //     }
      //   });

      resetFormik();
    },
  });

  const handleClose = () => {
    resetFormik();
    navigate('/home');
  };

  const resetFormik = () => {
    formik.resetForm();
  };

  return (
    <>
      <Box data-testid='form-input' className={classes['form-input-container']}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            className={classes['form-input-grid']}
            container
            spacing={2}
            direction='column'
            columns={12}
          >
            <h2 className={classes.title}>Find A Recipe</h2>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='query'
                name='query'
                label='Describe the food you like'
                value={formik.values.query}
                onChange={formik.handleChange}
                error={formik.touched.query && Boolean(formik.errors.query)}
                helperText={
                  formik.touched.query
                    ? formik.errors.query
                    : 'i.e. Chicken and rice or pasta and vegetables, etc'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='exclude'
                name='exclude'
                label='List any ingredients to exclude. Separate words with a comma (,)'
                value={formik.values.exclude}
                onChange={formik.handleChange}
                error={formik.touched.exclude && Boolean(formik.errors.exclude)}
                helperText={
                  formik.touched.exclude
                    ? formik.errors.exclude
                    : 'i.e. peanuts, kiwi, etc. Please separate ingredients with a comma (,)'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.center}>
                <Button color='primary' variant='contained' type='submit'>
                  Submit
                </Button>
                {/* <Button
                  color='secondary'
                  variant='contained'
                  type='button'
                  onClick={resetFormik}
                >
                  Clear
                </Button> */}
                <Button
                  variant='contained'
                  color='secondary'
                  type='button'
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </Grid>
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
                      <FadeCard>
                        <RecipeCard food={recipe} />
                      </FadeCard>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default RecipesPage;
