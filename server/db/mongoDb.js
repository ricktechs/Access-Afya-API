const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;
const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectDb = () => mongoose.connect(url, connectionOptions);

module.exports = { connectDb };
