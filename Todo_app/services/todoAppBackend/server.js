const { mongooseConnection } = require("./mongoDB/Connect");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const taskRouter = require("./Routers/TaskRouter.js");
const cors = require("cors");

mongooseConnection();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(taskRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
