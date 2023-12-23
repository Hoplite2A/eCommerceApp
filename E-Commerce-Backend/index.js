require("dotenv").config();

const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;

const client = require("./db/client");
client.connect();

const bodyparser = require("body-parser");
server.use(bodyparser.json());

const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require("./API/index");
server.use("/api", apiRouter);

// Serve Docs and redirect to docs
const path = require("path");
server.use("/docs", express.static(path.join(__dirname, "public")));
server.get("/", (req, res) => {
  res.redirect("/docs");
});
server.get("/api", (req, res) => {
  res.redirect("/docs");
});

// Error handling
server.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
