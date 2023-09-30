import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Search, Block, CheckCircle, Info } from '@mui/icons-material';
import Axios from '../../../utils/axios';
import ResponsiveDrawer from '../AdminDash';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    Axios.get('/admin/listUsers')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  const toggleBlock = (userId) => {
    const userToBlock = users.find((user) => user.id === userId);
    setSelectedUser(userToBlock);
    setIsBlocking(!userToBlock.blocked);
    setIsConfirmationModalOpen(true);
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmation = (selectedUser) => {
    console.log(selectedUser._id);
    Axios.get(`/admin/block-user?id=${selectedUser._id}`)
      .then(() => {
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUser.id) {
            user.blocked = isBlocking;
          }
          return user;
        });
        setFilteredUsers(updatedUsers);
        setIsConfirmationModalOpen(false);
      })
      .catch((error) => {
        console.error(`Error`, error);
      });
  };

  return (
    <div>
      <Grid container>
        <ResponsiveDrawer />
      </Grid>
      <Grid sx={{ marginLeft: "5%", marginRight: "10%" }} container lg={12}>
        <Grid item lg={12} sm={12} xs={12}>
          <TextField
            label="Search"
            value={searchTerm}
            fullWidth
            sx={{ width: "50%" }}
            onChange={handleSearch}
            variant="outlined"
          />
        </Grid>
        <Grid sx={{ marginRight: "10%", marginTop: "3%" }} item lg={12} sm={12} md={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Block/Unblock</TableCell>
                  <TableCell>More Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => toggleBlock(user.id)}>
                        {user.blocked ? <CheckCircle /> : <Block />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleShowDetails(user)}>
                        <Info />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={isDetailsModalOpen} onClose={handleDetailsModalClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p>Name: {selectedUser.username}</p>
              <p>Phone: {selectedUser.phone}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Subscribed: {selectedUser.subscribed ? 'Yes' : 'No'}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isConfirmationModalOpen} onClose={handleConfirmationModalClose}>
        <DialogTitle>
          {isBlocking ? 'Block User' : 'Unblock User'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {isBlocking
              ? `Do you want to block ${selectedUser && selectedUser.username}?`
              : `Do you want to unblock ${selectedUser && selectedUser.username}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleConfirmationModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmation(selectedUser)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
