var express = require("express");
const path = require("path");

var app = express();
var http = require("http");
var fs = require("fs");

var mongoose = require("mongoose");

const mongoConnection =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/syt-test";

console.log(mongoConnection);

mongoose.connect(mongoConnection);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));

// app.use(express.static(__dirname + '/website'));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/website/html/index.html"));
});

const personRouter = require("./routes/persons");
app.use("/persons", personRouter);

//http.createServer()
http
  .createServer(function (req, res) {
    if (req.url === "/") {
      fs.readFile(
        "/src/website/html/index.html",
        "UTF-8",
        function (err, html) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(html);
        }
      );
    } else if (req.url.match(".css$")) {
      var cssPath = path.join(__dirname, "website", req.url);
      var fileStream = fs.createReadStream(cssPath, "UTF-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      fileStream.pipe(res);
    } else if (req.url.match(".png$")) {
      var imagePath = path.join(__dirname, "website", req.url);
      var fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, { "Content-Type": "image/png" });
      fileStream.pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("No Page Found");
    }
  })
  .listen(3000);
