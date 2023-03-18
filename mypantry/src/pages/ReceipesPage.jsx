import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import UserContext from '../store/UserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classes from '../css/RecipesPage.module.css';
import recipesObj from '../store/respExample.json';
import RecipeCard from '../components/RecipeCard';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.edamam.com/api/recipes/v2';
const APP_ID = process.env.REACT_APP_EDAMAM_RECIPE_ID;
const API_KEY = process.env.REACT_APP_EDAMAM_RECIPE_API;
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
  // const appUser = useContext(UserContext);
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  let myPantryData;

  // useEffect(() => {
  //   if (!appUser.loginInfo) {
  //     navigate('/');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [appUser.loginInfo]);

  const formik = useFormik({
    initialValues: defaultFormikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('values');
      console.log(values);

      // create string from query input
      const queryStr = values.query;
      const query = queryStr.replace(/,/g, '%2C').replace(/ /g, '%20');
      console.log('query');
      console.log(query);

      // create string from exclude input
      const excludeStr = values.exclude;
      const arrayExclude = excludeStr.split(/,\s|,\s*|\s*,\s*/);
      const exclude = arrayExclude
        .map((item) => `&excluded=${item.replace(/ /g, '%20')}`)
        .join('');
      console.log('exclude');
      console.log(exclude);

      // create url
      const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;

      fetch('url')
        .then(function (data) {
          return data.json();
        })
        .then(function (responseJson) {
          console.log('responseJson');
          console.log(responseJson);
          // set data in local storage
          myPantryData = JSON.stringify(responseJson);
          localStorage.setItem(LOCAL_STORE_TEMP_RECIPES, myPantryData);
          setNewData(myPantryData);
        })
        .catch((e) => alert('Error in request, try again ' + e));

      resetFormik();
      // resetEditDataState();
    },
  });

  useEffect(() => {
    console.log('Loading recipes...');
    if (JSON.parse(localStorage.getItem(LOCAL_STORE_TEMP_RECIPES))) {
      console.log('ls is valid')
      setNewData(JSON.parse(localStorage.getItem(LOCAL_STORE_TEMP_RECIPES)));
    }
  }, []);

  const handleClose = () => {
    resetFormik();
    navigate('/home');
  };

  const resetFormik = () => {
    formik.resetForm();
  };

  // const myPantryData = JSON.parse(
  //   localStorage.getItem('myPantry-temp-recipes')
  // );
  console.log('myPantryData');
  console.log(myPantryData);
  console.log('newData flag');
  console.log(newData);
  const initRecipeDB = myPantryData ? myPantryData : recipesObj;

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
                <Button
                  color='secondary'
                  variant='contained'
                  type='button'
                  onClick={resetFormik}
                >
                  Clear
                </Button>
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
              {
                console.log(initRecipeDB)
                // && initRecipeDB.hits.map((recipe) => {
                //   return (
                //     <Grid
                //       key={uuidv4()}
                //       item
                //       xs={12}
                //       sm={6}
                //       md={4}
                //       p={1}
                //       zeroMinWidth
                //     >
                //       <RecipeCard food={recipe} />
                //     </Grid>
                //   );
                // })
              }
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default RecipesPage;
