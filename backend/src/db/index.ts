import mongoose from "mongoose";
import { DB_NAME } from "../constants";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `{process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB Connection Successful, HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB Connection failed ERROR:${error}`);
    process.exit(1);
  }
}

export default connectDB;
