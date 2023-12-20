const express = require("express");
const server = express();
const PORT = 3000;

const bodyparser = require("body-parser");
server.use(bodyparser.json());

const cors = require("cors");
server.use(cors());

// const morgan = require("morgan");
// server.use(morgan("dev"));

// const apiRouter = require("./API");
// server.use("/api", apiRouter);

// const { client } = require("./db/client");
// client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
