const { mongooseConnection } = require("./mongoDB/Connect");
const { requestLogger } = require("./Middlewares/RequestLogger");
const { ActionHistory } = require("./Middlewares/ActionHistory");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const taskRouter = require("./Routers/TaskRouter.js");
const cors = require("cors");

mongooseConnection();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(ActionHistory);
app.use(taskRouter);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});

module.exports = app;
