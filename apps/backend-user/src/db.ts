import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongourl = process.env.MONGO_URI!;

const connectdb = (): any => {
  mongoose
    .connect(mongourl)
    .then(() => console.log("database connected"))
    .catch((error) => {
      console.log("error: ", error);
    });
};

export default connectdb
