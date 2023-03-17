import React, { useContext, useEffect } from 'react';
import UserContext from '../store/UserContext';
import { v4 as uuidv4 } from 'uuid';
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
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  item: yup.string('Name of pantry item').required('Please enter a name'),
  type: yup.string('Food Type').required('Please enter a type'),
  quantity: yup.number('Enter quantity').required('Please enter a qty'),
  units: yup.string('Unit of measure').required('Please enter a unit'),
  favorite: yup.string('Favorite?').required('Favorite?'),
});

const defaultFormikValues = {
  item: '',
  type: '',
  quantity: '',
  units: '',
  favorite: false,
};

function FormInputPage() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appUser.loginInfo) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appUser.loginInfo]);

  const formik = useFormik({
    initialValues: defaultFormikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const actionObject = {
        type: 'add',
        data: {
          uid: appUser.loginInfo,
          collection: 'pantry',
          pantryObj: {
            name: values.item,
            type: values.type,
            qty: values.quantity,
            unit: values.units,
            favorite: values.favorite,
            id: uuidv4(),
          },
        },
      };
      appUser.updatePantry(actionObject);
    },
  });

  const handleClose = () => {
    formik.values.item = '';
    formik.values.type = '';
    formik.values.quantity = '';
    formik.values.units = '';
    formik.values.favorite = false;
    navigate('/pantry');
  };

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
