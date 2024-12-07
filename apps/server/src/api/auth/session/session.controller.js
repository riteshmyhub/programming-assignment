/**
 * @async
 * @function SessionController
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} Sends the login response or passes the error to the error handler.
 */

export default async function SessionController(req, res, next) {
   try {
      res.status(200).json({
         message: "User fetch successfully.",
         data: {
            user: req.user,
         },
         success: true,
      });
   } catch (error) {
      return next(createHttpError.InternalServerError());
   }
}
