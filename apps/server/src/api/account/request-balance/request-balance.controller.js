import { User } from "../../../models/user.model.js";
/**
 * @async
 * @function RequestBalanceController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */

export default async function RequestBalanceController(req, res, next) {
   try {
      const user = await User.findById(req?.user?._id).select("+amount");
      res.status(200).json({
         message: "Amount fetch successfully.",
         data: {
            amount: user.amount,
         },
         success: true,
      });
   } catch (error) {
      return next(createHttpError.InternalServerError());
   }
}
