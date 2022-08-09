const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors=require("cors");

const apiversion = process.env.API;

const productRouter=require("./routers/products");

//To parse json data we need a middleware
app.use(express.json());

//To check Logs
app.use(morgan("tiny"));

app.use(cors());
app.options('*',cors());

//Middleware to re route
app.use(`${apiversion}/products`,productRouter)

//connect db before starting the server
mongoose
  .connect(process.env.CONNECTION_STRING,{
    //specify the db name
    dbName:"eshop-database",
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("Starting server at 3000.....");
});
