import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const OtpModal = ({ code, submit }) => {
  const [otp, setOtp] = useState("");
const [ error , setError ] = useState('')
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
  if(otp.toString().length === 4){
    if(otp == code){
      submit()
    }else{
    setError('Invalid otp')
    }
  }else{
    setError('please Enter a valid otp')
    return 
  }
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: 4,
        paddingTop:10,
        paddingBottom:10, 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        OTP Verification
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please enter the 4-digit OTP that was sent to your phone number 
      </Typography>
      <TextField
        type="text"
        name="otp"
        value={otp}
        onChange={handleChange}
        label="Enter OTP"
        variant="outlined"
        fullWidth
        required
      />
      <Typography color='error'>{error}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Verify
      </Button>
    </Box>
  );
};

export default OtpModal;
