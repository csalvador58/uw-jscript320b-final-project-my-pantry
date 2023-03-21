import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeCORSRequest } from '../script/CorsRequest';
import PropTypes from 'prop-types';

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

function RecipeForm({ classes, setNewData }) {
  const navigate = useNavigate();
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

      //********************************************************************************
      const url = `https://cors-anywhere.herokuapp.com/${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&random=true&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;
      // const url = `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}${exclude}&random=true&field=label&field=images&field=source&field=url&field=shareAs&field=ingredientLines&field=calories&field=cuisineType&field=mealType&field=dishType`;

      makeCORSRequest('GET', url)
        // .then((response) => response.json())
        .then((response) => {
          const data = JSON.parse(response);
          // console.log(data);
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
        .catch((error) => {
          console.log('error', error.status, error.statusText);
        });

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
    <form onSubmit={formik.handleSubmit}>
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
    </form>
  );
}

export default RecipeForm;

RecipeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  setNewData: PropTypes.func.isRequired,
};
