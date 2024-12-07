import { User } from "../../../models/user.model.js";
/**
 * @async
 * @function TransactionHistoryController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */

export default async function TransactionHistoryController(req, res, next) {
   try {
      const user = await User.findById(req.user?._id).select("+transaction_history");
      const sortedTransactionHistory = (user?.transaction_history || []).sort((a, b) => {
         return new Date(b.date) - new Date(a.date);
      });

      res.status(200).json({
         message: "Transaction history fetched successfully.",
         data: {
            transaction_history: sortedTransactionHistory,
         },
         success: true,
      });
   } catch (error) {
      return next(createHttpError.InternalServerError());
   }
}
