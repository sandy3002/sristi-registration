const express = require("express");
const { MongoClient } = require("mongodb");
const app = express()
const cors = require("cors");

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Allow only your frontend server
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any methods you're using
  allowedHeaders: ['Content-Type', 'Authorization'], // Add necessary headers
};


const dbConnect = require("./api/dbconnection.js");
app.options('*', cors(corsOptions));
const port =  4000;
console.log(port);

dbConnect();
const studentRouter=require('./api/studentController.js')
app.use(express.json());
app.use('/',studentRouter);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});