const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;
const connectToDb = () => {
  mongoose.connect(URL);
};

module.exports = connectToDb;
