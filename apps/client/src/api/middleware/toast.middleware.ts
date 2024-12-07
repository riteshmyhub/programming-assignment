import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

//=store=>(next)
const toastMiddleware: Middleware = (_) => (next) => (action: any) => {
   if (action?.type.endsWith("/fulfilled") && !action?.type?.includes("*")) {
      toast.success(`${action?.payload?.message}`, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }
   if (action?.type.endsWith("/rejected") && !action?.type?.includes("*")) {
      toast.error(`${action?.payload?.message}`, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }
   return next(action);
};

export default toastMiddleware;
