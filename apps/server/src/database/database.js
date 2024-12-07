import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect2DB = async () => {
   try {
      const URI = String(process.env.MONGODB_URI).replace("<db_password>", process.env.MONGODB_PASSWORD);
      await mongoose.connect(URI);
      console.log(`Database successfully connected 👍`);
   } catch (error) {
      console.log("datasbase error : ", error);
   }
};
connect2DB();

//ryitesh94 ILK1TmOoGI8gV0lv
