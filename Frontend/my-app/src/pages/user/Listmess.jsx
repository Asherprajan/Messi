import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import Home from "./Home";
import Axios from "../../utils/axios";

const ListingPage = () => {
  const [page, setPage] = useState(1);
  const [messOwners, setMessOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    Axios.get("/mess-owners")
      .then((response) => {
        setMessOwners(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box>
      <Grid>
        <Home />
      </Grid>
      {isLoading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : (
        <Grid sx={{marginTop:"3%",marginLeft:"5%"}} container spacing={3} pr={10} mt={-3}>
          {Array.isArray(messOwners) && messOwners.length > 0 ? (
            messOwners.map((owner, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 5px 5px rgba(0, 0, 0, 0.1)",
                    width: {
                      lg: "200px",
                      md: "100%",
                      xs: "300px",
                    },
                    height: {
                    
                    },
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {owner.messName}
                  </Typography>
                
                  <CardMedia
                    sx={{
                      height: 220,
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                    }}
                    image={owner.image}
                    title={owner.name}
                  />
                   <Link to={`/detailpage/${owner._id}`}> 
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: "#1778F2",
                        color: "white",
                        width: "100%",
                        mt: 2,
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#1778F2",
                          color: "white",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No listing details available.</Typography>
          )}
        </Grid>
      )}
      <Grid item mt={3}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </Grid>
    </Box>
  );
};

export default ListingPage;
