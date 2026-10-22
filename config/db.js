//import mongoose library
const mongoose = require("mongoose");
//async arrow function because database takes time and return promise
const connectDB = async () => {
  try {
    //mongoose.connect attempt to connect to MongoDb and return Promise
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongoDb ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongoose Error ${error}`);
  }
};

module.exports = connectDB;
