import { useAppSelector } from "@/api/store";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
   const { session, accessToken } = useAppSelector((state) => state.authReducer);
   if (!session.data || !accessToken) {
      return <Navigate to="/auth" replace />;
   }
   return <Outlet />;
}
