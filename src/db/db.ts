import mongoose from "mongoose";

const connectDB = () => {
  const URI = process.env.DATABASE_URL as string;
  console.log("uri: ", URI);
  return mongoose.connect(URI);
};

export { connectDB };
