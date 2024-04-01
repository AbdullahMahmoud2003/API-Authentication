const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

// connect to the DB
mongoose.connect(process.env.DB_CONNECT)

//import routes
const authRoute = require('./routes/auth');

//Route middlewares
app.use('/api/user', authRoute)

app.listen(3000, () => console.log("Server is Up"));