const express = require("express");
const mongoose = require('mongoose')
const Filter = require('bad-words');

require("dotenv").config();

const app = express();
const filter = new Filter();


const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("---");
    next();
  };
  
  app.use(requestLogger);
  
  app.use(express.json());

















  console.log('connecting to', process.env.MONGODB_URI)
  mongoose.connect(process.env.MONGODB_URI)
    .then(result => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
  

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
