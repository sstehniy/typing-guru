import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

export const connectToDb = async (): Promise<void> => {
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
    error => {
      if (error) console.log("error connecting to db");
      else console.log("connected to mongodb");
    }
  );
  /*   try {
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.log('failed to drop the db');
  } */
};
