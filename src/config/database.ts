import mongoose from "mongoose";

let isConnected = false;

export const dbConnection = async () => {
  if (isConnected) {
    console.log("MongoDB arleady connected...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
  }
};
