/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import UserContext from '../store/UserContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Button, Grid, TextField } from '@mui/material';
import * as yup from 'yup';
import classes from '../css/LoginPage.module.css';

const validationSchema = yup.object({
  username: yup.string('Username').required('A username is required.'),
});

const defaultFormikValues = {
  username: '',
};

function Login() {
  const appUser = useContext(UserContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: defaultFormikValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values.username);
      appUser.updateLogin(values.username);
      formik.values.username = '';

      setTimeout(() => {
        if (appUser.loginInfo) {
          const actionObject = {
            type: 'query',
            data: {
              uid: appUser.loginInfo,
              collection: 'pantry',
              pantryObj: {},
            },
          };
          appUser.updatePantry(actionObject);
        }
      }, 0);

      navigate('/home');
    },
  });

  return (
    <Box data-testid='login-page' className={classes['login-page-container']}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} direction='column' columns={12}>
          <h2 className={classes.title}>Welcome!</h2>

          <Grid item xs={4}>
            <TextField
              fullWidth
              id='username'
              name='username'
              label='Please enter your name'
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' },
                },
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                formik.touched.username
                  ? formik.errors.username
                  : 'This will be used to store your data'
              }
            />
          </Grid>
          <Grid item xs={4}>
            <div className={classes.center}>
              <Button color='secondary' variant='contained' type='submit'>
                Submit
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
export default Login;
