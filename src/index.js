var express = require("express");
const PORT = 3000;
const path = require('path');

var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/syt-test");
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

app.use(express.static(path.join(__dirname, 'website')));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, '/website/html/index.html'));
});

const personRouter = require("./routes/persons");
app.use("/persons", personRouter);

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
