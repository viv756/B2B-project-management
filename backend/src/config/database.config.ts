import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      dbName:"B2B_TEAM_MANAGEMENT"
    });
    console.log("Connected to Mongo database");
  } catch (error) {
    console.log("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;