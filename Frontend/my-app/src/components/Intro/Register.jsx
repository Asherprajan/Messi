import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { Alert, Grid, Stack } from '@mui/material';
// import Axios from "../../utils/axios"
import {register} from "../../utils/api"
import Axios from '../../utils/axios';
import OtpModal from './Otp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const defaultTheme = createTheme();

export default function  SignUp () {
  const navigate = useNavigate()
  const [data, setData ] = React.useState({})
  const [ otp , setOtp ] = React.useState()
    const sendOtp = async(phone)=>{
      const res = await Axios.get(`/sendOtp?phone=${phone}` )
       console.log(res.data.otp);
      setOtp(res.data.otp)
      
    }
    const handleSubmit = async()=>{
      const response = register(data).then((res)=>{
        if(res?.data){
          toast(res.data.message)
          navigate('/home')
        }
      })
    }
     
    const formik = useFormik({
        initialValues: { 
          email: 'sample@gmail.com', 
          name: 'sample',
          phone: '6238513706', 
          password: 'qwerty',
          submit: null
        }, 
        validationSchema: Yup.object({
          email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          name: Yup
            .string()
            .max(255)
            .min(3)
            .required('Name is required'),
          phone: Yup.string()
            .test('phone', 'Must be a valid phone number', (value) => {
              const phoneRegExp = /^[0-9]{10}$/;
              return phoneRegExp.test(value);
            })
            .required('Phone number is required'),
          password: Yup
            .string()
            .max(255)
            .required('Password is required')
        }),
        onSubmit: async (values, helpers) => {
          try {
            const { email, name, phone, password } = values
            setData({ ...data, email, name, phone, password })
             sendOtp(phone)
          } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
            console.log('error....',err.message)
          }
        }
      });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{bgcolor:'#fff',...modalStyle,borderRadius:"15px",opacity:"95%",} }>
        <CssBaseline />
        <Box
          sx={{
            marginTop: "5%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register🎉
          </Typography>

         
          {!otp ? 
          <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  fullWidth
                  helperText={formik.touched.phone && formik.errors.phone}
                  label="Phone Number"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.phone}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
              <Alert
                color="primary"
                severity="info"
                sx={{ mt: 3 }}
              >
                <div>
                  *By confirming otp will be sent to your provided phone number and email.😀
                </div>
              </Alert>
            </form>
            : <OtpModal submit={handleSubmit} code ={otp}/>}
        </Box> 
        
      </Container>
    </ThemeProvider>
  );
}

const modalStyle = {
    height:"600px",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 100,
    p: 1,

  };