var express = require("express");

var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/syt-test");
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

app.get("/", function (req, res) {
  res.send("Hello world!");
});

const personRouter = require("./routes/persons");
app.use("/persons", personRouter);

app.listen(3000, () => console.log("server started"));
