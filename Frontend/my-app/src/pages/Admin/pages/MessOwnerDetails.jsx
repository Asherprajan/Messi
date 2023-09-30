import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";

const MessOwnerDetail = ({ isOpen, onClose, messOwner }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Mess Owner Details</DialogTitle>
      <DialogContent>
        <Box>
        <img style={{height:"200px",width:"200px"}} src={messOwner?.image} alt="" />
        </Box>
        <Box >
        <Typography >Name: {messOwner?.messName}</Typography>
        <Typography>Email: {messOwner?.email}</Typography>
        <Typography>Location: {messOwner?.location}</Typography>
        <Typography>Phone: {messOwner?.phone}</Typography>

        </Box>
        

        {/* Add more details as needed */}
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MessOwnerDetail;
