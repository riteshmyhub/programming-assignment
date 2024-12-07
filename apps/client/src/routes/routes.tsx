import NotFoundPage from "@/app/404/not-found.page";
import AccountLayout from "@/app/account/accounts.layout";
import LoginPage from "@/app/auth/login/login.page";
import RegisterPage from "@/app/auth/register/register.page";
import HomePage from "@/app/home/home.page";
import AuthGuard from "@/guards/auth.guard";
import { Navigate, Route, Routes, Outlet } from "react-router";

export default function Routing() {
   return (
      <Routes>
         <Route path="auth" element={<Outlet />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
         </Route>
         <Route path="/" element={<HomePage />} />
         <Route element={<AuthGuard />}>
            <Route path="/account" element={<AccountLayout />} />
         </Route>
         <Route path="*" element={<NotFoundPage />} />
      </Routes>
   );
}
