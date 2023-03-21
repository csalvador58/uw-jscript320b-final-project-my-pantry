import React, { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../store/UserContext';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import unitOfMeasure from '../store/units.json';
import foodType from '../store/foods.json';
import classes from '../css/FormInputPage.module.css';

const validationSchema = yup.object({
  item: yup.string('Name of pantry item').required('Please enter a name'),
  type: yup.string('Food Type').required('Please enter a type'),
  quantity: yup.number('Enter quantity').required('Please enter a qty'),
  units: yup.string('Unit of measure').required('Please enter a unit'),
  favorite: yup.string('Favorite?').required('Favorite?'),
  action: yup
    .string('Add, Update, or Delete?')
    .required('Please make a selection'),
});

const defaultFormikValues = {
  item: '',
  type: '',
  quantity: '',
  units: '',
  favorite: false,
  action: '',
};

function FormInputPage() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  const navigateToHome = useCallback(() => navigate('/'), [navigate]);

  useEffect(() => {
    if (!appUser.loginInfo) navigateToHome();
  }, [appUser.loginInfo, navigateToHome]);

  const formik = useFormik({
    initialValues: defaultFormikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.action === 'delete') {
        let actionObject = {
          type: 'delete',
          data: {
            uid: appUser.loginInfo,
            collection: 'pantry',
            pantryObj: {
              name: values.item,
              type: '',
              qty: '',
              unit: '',
              favorite: false,
              id: '',
            },
          },
        };
        appUser.updatePantry(actionObject);
      } else {
        let actionObject = {
          type: values.action,
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
      }
      resetFormik();
      resetEditDataState();
    },
  });

  const handleClose = () => {
    resetFormik();
    resetEditDataState();
    navigate('/home');
  };

  const resetEditDataState = () => {
    appUser.updateEditData({
      id: '',
      name: '',
      qty: '',
      unit: '',
    });
  };

  const resetFormik = () => {
    formik.values.item = '';
    formik.values.type = '';
    formik.values.quantity = '';
    formik.values.units = '';
    formik.values.favorite = false;
    formik.values.action = '';
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
          <h2 className={classes.title}>Editing Item</h2>
          {appUser.editData.name && (
            <Box sx={{ margin: '0 auto' }}>
              <Paper
                sx={{
                  backgroundColor: '#9c27b0',
                  textAlign: 'center',
                  padding: 1,
                  width: 'fit-content',
                }}
              >
                <Typography
                  color={'#fff'}
                >{`${appUser.editData.name} - ${appUser.editData.qty} ${appUser.editData.unit}(s)`}</Typography>
              </Paper>
            </Box>
          )}

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
            <FormControl sx={{ width: { xs: '50%' } }}>
              <TextField
                select
                id='action'
                name='action'
                label='Add, Update, or Delete'
                value={formik.values.action}
                onChange={formik.handleChange}
                error={formik.touched.action && Boolean(formik.errors.action)}
              >
                {['add', 'update', 'delete'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <Box sx={{ flexGrow: 1, margin: 2 }} />
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
