import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Modal,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ResponsiveDrawer from "../AdminDash";
import Axios from "../../../utils/axios";
import MessOwnerDetail from "./MessOwnerDetails";

// const validationSchema = Yup.object({
//   name: Yup.string()
//     .required("Name is required!!!")
//     .min(5, "Name must be atleast 5  characters long"),
//   email: Yup.string()
//     .required("Email is required!!!")
//     .email("Invalid email address"),
//   location: Yup.string()
//     .required("Location is required!!")
//     .min(2, "Location must atleast 2 charcters long"),
//   phone: Yup.string().test("phone", "Must be a valid phone number", (value) => {
//     const phoneRegExp = /^[0-9]{10}$/;
//     return phoneRegExp.test(value);
//   }),
//   password: Yup.string().max(255).required("Password is required"),
// });

const MessOwners = () => {
  const [messOwners, setMessOwners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessOwner, setSelectedMessOwner] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedUserToConfirm, setSelectedUserToConfirm] = useState(null);

  const [newMessData, setNewMessData] = useState({
    image: null,
    name: "",
    location: "",
    phone: "",
    password: "",
    email: "",
    identityProof: null,
  });
  const openMessOwnerDetail = (messOwner) => {
    setSelectedMessOwner(messOwner);
    setIsDetailViewOpen(true);
  };

  const closeMessOwnerDetail = () => {
    setSelectedMessOwner(null);
    setIsDetailViewOpen(false);
  };
  const openConfirmation = (user) => {
    setSelectedUserToConfirm(user);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setSelectedUserToConfirm(null);
    setIsConfirmationOpen(false);
  };

  useEffect(() => {
    fetchMessOwners();
  }, [messOwners]);

  const fetchMessOwners = async () => {
    try {
      const response = await Axios.get("/admin/mess-owners");
      const messOwnersData = response.data; // Assuming the response contains the mess owners' data
      setMessOwners(messOwnersData); // Set the mess owners' data in your state
    } catch (error) {
      console.error("Error fetching mess owners:", error);
    }
  };

  // const handleViewDetails = (_id) => {
  //   console.log("View details for mess owner with ID:", _id);
  // };

  const handleAddMess = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleBlockUnblockUser = async () => {
    if (selectedUserToConfirm) {
      if (selectedUserToConfirm.isBlocked) {
        await handleUnblock(selectedUserToConfirm);
      } else {
        await handleBlock(selectedUserToConfirm);
      }
      closeConfirmation();
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image" && files.length > 0) {
      setNewMessData({ ...newMessData, image: files[0] });
    } else {
      setNewMessData({ ...newMessData, [name]: value });
    }
  };

  const handleSaveMess = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      for (const key in newMessData) {
        if (newMessData[key] !== null) {
          formdata.append(key, newMessData[key]);
        }
      }

      console.log(formdata.get("name"));
      console.log(formdata.get("image"));

      const response = await Axios.post("/admin/add-mess", formdata);

      console.log("Response from server:", response.data);

      setIsModalOpen(false);

      setNewMessData({
        image: null,
        name: "",
        location: "",
        phone: "",
        password: "",
        email: "",
        identityProof: null,
      });
    } catch (error) {
      console.error("Error saving mess data:", error);
    }
  };
  const handleBlock = async (messOwner) => {
    try {
      console.log(messOwner._id);
      const response = await Axios.get(`/admin/blocked?id=${messOwner._id}`);
      console.log("User blocked successfully:", response.data);
    } catch (error) {
      console.error("Error blocking the user:", error);
    }
  };

  const handleUnblock = async (messOwner) => {
    try {
      const response = await Axios.get(`/admin/blocked?id=${messOwner._id}`);
      console.log("User Unblocked successfully:", response.data);
    } catch (error) {
      console.error("Error blocking the user:", error);
    }
  };
  return (
    <>
      <ResponsiveDrawer />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          sx={{ position:"relative", top: "10%", marginLeft: "70%" }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            startIcon={<AddIcon />}
            onClick={handleAddMess}
          >
            Add Mess
          </Button>
        </Grid>

        <Grid item sx={{ marginTop: "4%" }}>
          <Box sx={{ marginLeft: "10%", marginTop: "5", overflow: "auto" }}>
            <div
              style={{
                
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {messOwners.map((messOwner) => (
                <Card
                  style={{
                    minWidth: "300px",
                    marginBottom: "20px",
                    width: "20%",
                    backgroundColor: "#000000",
                  }}
                >
                  <Typography
                    sx={{ marginLeft: "5%", marginTop: "5%" }}
                    variant="h5"
                    component="div"
                  >
                    {messOwner.messName}
                  </Typography>
                  <CardMedia
                    sx={{ backgroundColor: "#070803" }}
                    component="img"
                    height="140"
                    image={messOwner.image}
                    alt={messOwner.messName}
                    onClick={() => openMessOwnerDetail(messOwner)}
                    style={{
                      width: "100%",
                      height: "200px",
                      display: "block",
                      margin: "0 auto 10px",
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />
                  <CardContent>
                    <Typography>{messOwner.location}</Typography>
                  </CardContent>
                  <CardActions>
                    {messOwner.isBlocked ? (
                      <Button
                        variant="outlined"
                        onClick={() => openConfirmation(messOwner)}
                        style={{ marginLeft: "10px" }}
                      >
                        Unblock
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => openConfirmation(messOwner)}
                        style={{ marginLeft: "10px" }}
                      >
                        Block
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </div>
            <MessOwnerDetail
              isOpen={isDetailViewOpen}
              onClose={closeMessOwnerDetail}
              messOwner={selectedMessOwner}
            />
          </Box>
        </Grid>
      </Grid>

      <Modal
        open={isConfirmationOpen}
        onClose={closeConfirmation}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "350px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="confirmation-modal-title"
            variant="h5"
            component="h2"
            gutterBottom
          >
            Confirmation
          </Typography>
          <Typography id="confirmation-modal-description">
            Are you sure you want to{" "}
            {selectedUserToConfirm?.isBlocked ? "unblock" : "block"} this user?
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleBlockUnblockUser}
            style={{ marginRight: "10px" }}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={closeConfirmation}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{ overflow: "auto" }}
        aria-labelledby="add-mess-modal-title"
        aria-describedby="add-mess-modal-description"
      >
        <form onSubmit={handleSaveMess}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "350px",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="add-mess-modal-title"
              variant="h3"
              component="h2"
              gutterBottom
            >
              Add Mess
            </Typography>
            {/* Image Upload and Preview */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {newMessData.image ? (
                  <img
                    src={URL.createObjectURL(newMessData.image)}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      border: "2px solid black",
                    }}
                  />
                ) : (
                  "No Image"
                )}
                <input
                  accept=".jpeg,.png"
                  type="file"
                  id="fileInput"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleInputChange}
                />
              </label>
              <button
                onClick={() => {
                  document.getElementById("fileInput").click();
                }}
                style={{
                  background: "#1876D1",
                  color: "white",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Upload Image
              </button>
            </div>

            <TextField
              name="name"
              label="Name"
              value={newMessData?.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="location"
              label="Location"
              value={newMessData.location}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone"
              value={newMessData.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              value={newMessData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={newMessData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="identityProof"
              label="Identity Proof"
              onChange={handleInputChange}
              fullWidth
              type="text"
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={handleSaveMess}
            >
              Save
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default MessOwners;
