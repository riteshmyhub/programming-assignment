import createHttpError from "http-errors";
import { verifyToken } from "../utils/utils.js";

export default async function AuthMiddleware(req, res, next) {
   try {
      const accessToken = req?.cookies?.accessToken || req.headers["authorization"]?.split("bearer ")[1];
      if (!accessToken) {
         return next(createHttpError.Unauthorized("your unauthorized"));
      }
      const user = await verifyToken(accessToken);
      req.user = user;
      return next();
   } catch (error) {
      if (error.name === "TokenExpiredError") {
         return next(createHttpError.Forbidden("Token expired"));
      }
      if (error.name === "JsonWebTokenError") {
         return next(createHttpError.Unauthorized("Invalid token"));
      }
      next(createHttpError.InternalServerError());
   }
}
