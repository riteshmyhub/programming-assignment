import { authService } from "@/api/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import Routing from "@/routes/routes";
import { useEffect } from "react";

export default function App() {
   const { accessToken, session } = useAppSelector((state) => state.authReducer);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (accessToken) dispatch(authService.session.api());
      return () => {};
   }, [accessToken]);

   if (session.isLoading && accessToken) {
      return "isLoading...";
   }

   return (
      <>
         <Routing />
      </>
   );
}
