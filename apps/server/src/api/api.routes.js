import { Router } from "express";
import LoginController from "./auth/login/login.controller.js";
import RegisterController from "./auth/register/register.controller.js";
import SessionController from "./auth/session/session.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import RequestBalanceController from "./account/request-balance/request-balance.controller.js";
import DepositMoneyController from "./account/deposit-money/deposit-money.controller.js";
import WithdrawMoneyController from "./account/withdraw-money/withdraw-money.controller.js";
import TransactionHistoryController from "./account/transaction-history/transaction-history.controller.js";

const router = Router();
router.use("/auth", function () {
   router.post("/login", LoginController);
   router.post("/register", RegisterController);
   router.get("/session",[AuthMiddleware], SessionController);
   return router;
}());

router.use("/account", function () {
   router.get("/request-balance",[AuthMiddleware], RequestBalanceController);
   router.put("/deposit-money",[AuthMiddleware], DepositMoneyController);
   router.put("/withdraw-money",[AuthMiddleware], WithdrawMoneyController);
   router.get("/transaction-history",[AuthMiddleware], TransactionHistoryController);
   return router;
}());

export default router;
