import createHttpError from "http-errors";
import { User } from "../../../models/user.model.js";
/**
 * @async
 * @function WithdrawMoneyController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */

export default async function WithdrawMoneyController(req, res, next) {
   try {
      const { amount, description } = req.body;
      if (!amount || isNaN(amount)) {
         return next(createHttpError.BadRequest("Amount is required or invaild input"));
      }
      const actual_amount = Number(amount);
      const user = await User.findById(req?.user?._id).select("+amount +transaction_history");
      if (actual_amount <= 0) {
         return next(createHttpError.BadRequest("Amount is required or invaild input"));
      }
      if (actual_amount > user.amount) {
         return next(createHttpError.BadRequest("you have insufficient amount"));
      }
      user.amount = user.amount - actual_amount;
      user.transaction_history = [{ amount, description: description || "" }, ...user.transaction_history];
      await user.save();
      res.status(200).json({
         message: "Amount withdraw successfully.",
         data: {},
         success: true,
      });
   } catch (error) {
      return next(createHttpError.InternalServerError());
   }
}
