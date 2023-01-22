// Used to setup the database coonection

import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGO_URI;
    const conn = await mongoose.connect(mongodbURI);
    console.log(`Mongodb connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
