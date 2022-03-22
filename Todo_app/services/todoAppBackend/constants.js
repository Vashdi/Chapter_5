const ENV = process.env;
const port = parseInt(ENV.PORT) || 3001;
const mongoDB_url = ENV.MONGODB_URL;

module.exports = { port, mongoDB_url };
