import { useNavigate } from "react-router";
import DepositPage from "./deposit/deposit.page";
import RequestBalancePage from "./request-balance/request-balance.page";
import WithdrawPage from "./withdraw/withdraw.page";
import { Modal } from "@/components";
import { useRef } from "react";
import { Button } from "@/ui/button";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { LoaderCircleIcon } from "lucide-react";
import { authService } from "@/api/services/auth.service";
import ProfilePage from "./profile/profile.page";
import TransactionHistoryPage from "./transaction-history/transaction-history.page";

export default function AccountLayout() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { session, logout } = useAppSelector((state) => state.authReducer);
   const modalRef = useRef<any>(null);

   const logoutFun = async () => {
      try {
         await dispatch(authService.logout.api()).unwrap();
         modalRef.current.setToggle(false);
         navigate("/");
      } catch (error) {
         return;
      }
   };
   return (
      <>
         <nav className="flex gap-3 items-center justify-end md:gap-4 px-6 fixed w-full py-4">
            <h1 className="text-xl text-white font-medium capitalize">{session.data?.fullname}</h1>
            <Button //
               variant="destructive"
               size="lg"
               color="inherit"
               className="uppercase"
               disabled={logout.isLoading}
               onClick={() => modalRef.current.setToggle(true)}>
               Logout
            </Button>
         </nav>
         <main className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-500">
            <div className="grid grid-cols-12 gap-2  md:gap-6 p-2 md:p-20 w-full lg:w-[80%] xl:w-[70%]">
               <div className="col-span-6 md:col-span-4">
                  <WithdrawPage />
               </div>
               <div className="col-span-6 md:col-span-4">
                  <DepositPage />
               </div>
               <div className="col-span-12 md:col-span-4">
                  <RequestBalancePage />
               </div>
               <div className="col-span-12 md:col-span-4">
                  <ProfilePage />
               </div>
               <div className="col-span-12 md:col-span-4">
                  <TransactionHistoryPage />
               </div>
            </div>
         </main>
         <Modal ref={modalRef} heading="Are you sure you want to log out?" className="p-6">
            <div className="flex gap-3 justify-end">
               <Button variant="outline" className="uppercase" onClick={() => modalRef.current.setToggle(false)}>
                  cancel
               </Button>
               <Button variant="destructive" className="uppercase" onClick={logoutFun} disabled={logout.isLoading}>
                  {logout.isLoading && <LoaderCircleIcon className="spin" />} Logout
               </Button>
            </div>
         </Modal>
      </>
   );
}
