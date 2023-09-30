import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "../../utils/axios"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Actions/Useractions';
import { useDispatch } from 'react-redux';

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });

  const formik = useFormik({
    initialValues: {
      email: 'sample@gmail.com',
      password: '12345',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: (values) => {
      
      console.log(values);
      Axios.post('/Login', values) 
        .then((res) => {
          if(res?.data){
            const user = res.data;
            console.log(user);
            dispatch(setUser(user));

            toast(res.data.message)
            
            
            navigate('/home')
          }
          console.log('Backend response:', res.data);
        }).catch(error=>toast(error?.response?.data?.error || error.message))
        
    }
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ bgcolor: '#fff', ...modalStyle, borderRadius: '10px' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop:"5%",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in🫢
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box component="div" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

const modalStyle = {
  
  position: 'absolute',
  height:"450px",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 100,
  p: 1,
};

export default SignIn;