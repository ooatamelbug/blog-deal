const express = require("express");
const cors = require('cors');

//make an instatnce from express app
const app = express();

// allow express to use json formate to deal with request and response
app.use(express.json());

app.use(cors());

// export app for use
module.exports = app;