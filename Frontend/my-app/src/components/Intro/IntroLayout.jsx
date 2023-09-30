import React, { useState } from "react";
import { Button, Grid, Hidden, TextField, Modal, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./login";
import styled from "@emotion/styled";
import Register from "./Register";
const theme = createTheme({
  palette: {
    secondary: {
      main: "#000000",
    },
  },
});

const IntroLayout = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
  });

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", loginFormData);
    closeLoginModal();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your register logic here
    console.log("Register submitted", registerFormData);
    closeRegisterModal();
  };

  return (
    <>
      <Grid container>
        {/* Left Grid */}
        <Grid item xs={12} md={6} lg={7}>
          <Grid
            container
            sx={{ bgcolor: "#D6E9CF", minHeight: "100vh", padding: "20px" }}
          >
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 20px",
                }}
              >
                <div>
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mess_Logo.svg/1200px-Mess_Logo.svg.png"
                    alt=""
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "20px" }}>
                    <h3 style={{ cursor: "pointer" }} onClick={openLoginModal}>
                      Login
                    </h3>
                  </div>
                  <div>
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ boxShadow: "none", marginTop: "10px" }}
                        onClick={openRegisterModal}
                      >
                        Sign up
                      </Button>
                    </ThemeProvider>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div style={{ padding: "0 10px", marginTop: "20px" }}>
                <h1>Are you searching for a mess?</h1>
                <h3>Join our fast-growing community.</h3>
                <div style={{ marginTop: "20px" }}>
                  <TextField
                    label="Your Location"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "20px", width: "50" }}
                  >
                    Check Availability
                  </Button>
                </div>
              </div>
              <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                <h3>POPULAR CITIES IN INDIA</h3>
              </div>
              <div style={{ marginTop: "20px", marginLeft: "20px" }}>
                <h4>
                  Ahmedabad,Bangalore ,Chennai , Delhi, Gurgaon ,Hyderabad
                  ,Kolkata ,Mumbai ,Pune & more.
                </h4>
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Grid */}
        <Hidden mdDown>
          <Grid item md={6} lg={5}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src="https://yogitauchil.files.wordpress.com/2020/12/img-20201224-wa0047.jpg?w=584"
              alt=""
            />
          </Grid>
        </Hidden>
      </Grid>

      <Modal
        open={loginModalOpen}
        onClose={closeLoginModal}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
      >
        <Login />
      </Modal>

      {/* Register Modal */}
      <Modal
        open={registerModalOpen}
        onClose={closeRegisterModal}
        aria-labelledby="register-modal"
        aria-describedby="register-modal-description"
      >
        <Register />
      </Modal>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Model = styled("div")`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  transition: opacity 0.3s ease-in-out; /* Add a smooth fade-in effect */
`;
const ModelOpen = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default IntroLayout;
