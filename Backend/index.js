const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const adminrouter = require("./routes/adminRouter");
const messrouter = require('./routes/messRouter');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // CORS middleware first
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', authRouter);
app.use("/api/admin",adminrouter)
app.use("/api/mess",messrouter)
  

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
