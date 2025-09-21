const mongoose = require("mongoose");
require('dotenv').config(); 
const uri=process.env.URL;

mongoose.connect(uri);