import createHttpError from "http-errors";
import { User, userSchema } from "../../../models/user.model.js";
import { accountNumberCreator } from "../../../utils/utils.js";
import SendEmail from "../../../mails/send-email.js";

/**
 * @async
 * @function RegisterController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */

export default async function RegisterController(req, res, next) {
   try {
      const { body } = userSchema.validateSync(req, { abortEarly: false });
      const account = accountNumberCreator();
      const user = await User.findOne({ email: body.email });
      if (user) {
         return next(createHttpError.BadRequest("User already exists"));
      }
      const newUser = await User.create({ account, ...body });
      await SendEmail({
         to: [newUser.email],
         subject: "welcome",
         context: {
            fullname: newUser.fullname,
            userID: newUser.userID,
            password: body.password,
         },
         templateName: "welcome.mail",
      });
      res.status(201).json({
         message: "Bank account created. Check your email for credentials.",
         data: {},
         success: true,
      });
   } catch (error) {
      if (error?.errors) {
         return next(createHttpError.BadRequest(error?.errors));
      }
      return next(createHttpError.InternalServerError());
   }
}
