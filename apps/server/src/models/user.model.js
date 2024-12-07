import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

const schema = new mongoose.Schema({
   userID: {
      type: String,
      default: () => uuidv4().substring(0, 8) + "-FundsFlow", // Generates a UUID for the user ID
      select: false,
   },
   email: {
      type: String,
      required: [true, "email in required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email"],
   },
   password: {
      type: String,
      required: [true, "password is required."],
      trim: true,
      select: false,
   },
   account: {
      type: String,
      unique: true,
      required: [true, "account is required."],
      trim: true,
      select: false,
   },
   amount: {
      type: Number,
      default: 0,
      select: false,
   },
   fullname: {
      type: String,
      required: [true, "fullname is required."],
      trim: true,
   },
   transaction_history: {
      type: [
         {
            description: {
               type: String,
            },
            amount: {
               type: Number,
            },
            date: {
               type: Date,
               default: Date.now,
            },
         },
      ],
      select: false,
   },
});
schema.pre("save", async function (next) {
   if (this.isModified("password")) {
      const salt = await genSalt();
      this.password = await hash(this.password, salt);
   }
   next();
});

const userSchema = Yup.object().shape({
   body: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
      fullname: Yup.string().required("Full name is required"),
   }),
});

const User = mongoose.model("User", schema);
export { User, userSchema };
