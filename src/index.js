// import express library
var express = require("express");

// set port of app
const PORT = 3000;
// library for file system utils
const path = require("path");

// create express app
var app = express();

// mongoose library to use mongodb
var mongoose = require("mongoose");

// connection string to database
// when running app with docker MONGO_URI defined in docker compose is used
// else local db is used; only works if mongodb is installed
const mongoConnection =
  process.env.MONGO_URI || `mongodb://localhost:27017/syt-test`;

// mongoose connects with db
mongoose.connect(mongoConnection);
const db = mongoose.connection;

// print error if connection not successful
db.on("error", (error) => console.log(error));

// on the default url (localhost:3000/) display the website by sending the html file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/website/html/index.html"));
});

// Manage routes that begin with /persons
const personRouter = require("./routes/persons");
app.use("/persons", personRouter);

// define static path for css and js files that the html file uses
app.use("/", express.static("./website"));

// run the app on port
app.listen(PORT, () =>
  console.log(`server started on http://localhost:${PORT}`)
);
