const mongooseConnection = async () => {
  const mongoose = require("mongoose");

  const MONGODB_URL = process.env[process.env.MONGO_PATH];
  mongoose.connect(MONGODB_URL);
};

module.exports = { mongooseConnection };
