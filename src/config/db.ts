import mongoose from "mongoose";

const connectDB = () => {
  return mongoose.connect(process.env.DATABASE_URL as string);
};

export { connectDB };
