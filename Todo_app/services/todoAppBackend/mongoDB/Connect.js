const mongooseConnection = () => {
  const mongoose = require("mongoose");
  const MONGODB_URL =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_MONGODB_URI
      : process.env.MONGODB_URL;

  mongoose.connect(MONGODB_URL);
};

module.exports = { mongooseConnection };
