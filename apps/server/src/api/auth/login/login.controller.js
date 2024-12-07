import createHttpError from "http-errors";
import { User } from "../../../models/user.model.js";
import { compare } from "bcrypt";
import { createJwtToken } from "../../../utils/utils.js";

/**
 * @async
 * @function LoginController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */
export default async function LoginController(req, res, next) {
   try {
      const { userID, password } = req.body;
      if (!userID || !password) {
         return next(createHttpError.BadRequest("userID , password  required!"));
      }
      const user = await User.findOne({ userID }).select("+userID +password");
      if (!user) {
         return next(createHttpError.Unauthorized());
      }

      const match = await compare(password, user.password);
      if (!match) {
         return next(createHttpError.Unauthorized());
      }
      const accessToken = createJwtToken({ _id: user._id });

      res.status(200).json({
         message: "Login successful.",
         data: { accessToken },
         success: true,
      });
   } catch (error) {
      return next(createHttpError.InternalServerError());
   }
}
