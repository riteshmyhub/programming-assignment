import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export function createJwtToken(tokenData) {
   const [value, unit] = String(process.env.TOKEN_EXPIRES_IN)?.split("-");
   const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: `${value}${unit}`,
   });
   return token;
}
export async function verifyToken(accessToken) {
   try {
      const verifyUser = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

      const user = await User.findById(verifyUser?._id).select("+userID +account -__v");
      if (!user) {
         throw createHttpError.Unauthorized("User not found");
      }
      return user;
   } catch (error) {
      throw error;
   }
}
