import React, {useContext} from 'react';
import UserContext from '../store/UserContext';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import unitOfMeasure from '../store/units.json';
import foodType from '../store/foods.json';
import classes from '../css/FormInputPage.module.css';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const validationSchema = yup.object({
  item: yup.string('Name of pantry item').required('Please enter a name'),
  type: yup.string('Food Type').required('Please enter a type'),
  quantity: yup.number('Enter quantity').required('Please enter a qty'),
  units: yup.string('Unit of measure').required('Please enter a unit'),
  favorite: yup.string('Favorite?').required('Favorite?'),
});

function FormInputPage() {
  const [user] = useAuthState(auth);
  const appUser = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      item: '',
      type: '',
      quantity: '',
      units: '',
      favorite: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
      console.log(values.item);
      console.log(values.type);
      console.log(values.quantity);
      console.log(values.units);
      console.log(values.favorite);
      // create action object:
      if (user) {
        const userUID = user.id;
        const actionObject = {
          type: 'add',
          data: {
            uid: userUID,
            collection: 'pantry',
            pantryObj: {
              name: values.item,
              type: values.type,
              qty: values.quantity,
              unit: values.units,
              favorite: values.favorite,
            },
            updatePantryObj: {},
            recipeObj: {
              name: '',
              ingredients: [],
              favorite: false,
            },
            updateRecipeObj: {
              ingredients: [],
            },
          },
          isIngredient: false,
        };
        appUser.updatePantry(actionObject);
      }
    },
  });

  const handleClose = () => {};

  return (
    <Box data-testid='form-input' className={classes['form-input-container']}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          className={classes['form-input-grid']}
          container
          spacing={2}
          direction='column'
          columns={12}
        >
          <h2 className={classes.title}>Edit Item</h2>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id='item'
              name='item'
              label='Item'
              value={formik.values.item}
              onChange={formik.handleChange}
              error={formik.touched.item && Boolean(formik.errors.item)}
              helperText={
                formik.touched.item
                  ? formik.errors.item
                  : 'i.e. Chicken thighs, apple, etc'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              id='type'
              name='type'
              label='Type'
              value={formik.values.type}
              onChange={formik.handleChange}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={
                formik.touched.type ? formik.errors.type : 'i.e. fruit'
              }
            >
              {foodType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ width: { xs: '50%' } }}>
              <TextField
                fullWidth
                id='quantity'
                name='quantity'
                label='Quantity'
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </FormControl>
            <FormControl sx={{ width: { xs: '50%' } }}>
              <TextField
                select
                id='units'
                name='units'
                label='Unit'
                value={formik.values.units}
                onChange={formik.handleChange}
                error={formik.touched.units && Boolean(formik.errors.units)}
              >
                {unitOfMeasure.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id='isFavorite'>Favorite?</FormLabel>
              <RadioGroup
                row
                aria-labelledby='favorite'
                name='favorite'
                value={formik.values.favorite}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  key='yes'
                  value='true'
                  control={<Radio />}
                  label='Yes'
                />
                <FormControlLabel
                  key='no'
                  value='false'
                  control={<Radio />}
                  label='No'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes.center}>
          <Button color='primary' variant='contained' type='submit'>
            Submit
          </Button>
          <Button variant='contained' color='secondary' onClick={handleClose}>
            Close
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default FormInputPage;
