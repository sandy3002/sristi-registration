const express = require("express");
const { MongoClient } = require("mongodb");
const app = express()




const dbConnect = require("./api/dbconnection.js");

const port =  4000;
console.log(port);

dbConnect();
app.use(express.json());

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});