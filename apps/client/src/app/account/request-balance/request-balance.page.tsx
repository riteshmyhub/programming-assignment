import { accountService } from "@/api/services/account.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { Modal } from "@/components";
import { LoaderCircleIcon } from "lucide-react";
import { useRef } from "react";

export default function RequestBalancePage() {
   const modalRef = useRef<any>(null);
   const { requestBalance } = useAppSelector((state) => state.accountReducer);
   const dispatch = useAppDispatch();

   const fetchBalance = async () => {
      try {
         await dispatch(accountService.requestBalance.api()).unwrap();
         modalRef.current.setToggle(true);
      } catch (error) {
         return;
      }
   };
   return (
      <>
         <div //
            className="border p-3 bg-white rounded-md"
            role="button"
            onClick={fetchBalance}>
            <img //
               src="/images/request-money.png"
               alt="request-money"
               className="mx-auto w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">Request balance</h3>
         </div>
         <Modal ref={modalRef} heading="Request Balance" className="p-6" closable>
            {requestBalance.isLoading ? (
               <div className="text-gray-600">
                  <LoaderCircleIcon className="spin mx-auto" size={100} />
                  <p className="text-center">fetching bank balance</p>
               </div>
            ) : (
               <div>
                  <img //
                     src="/images/request-money.png"
                     alt="cash-withdrawal"
                     width={150}
                     className="mx-auto my-3"
                  />
                  <h1 className="text-center text-3xl font-semibold text-gray-800" data-currency>
                     {requestBalance.data}
                  </h1>
               </div>
            )}
         </Modal>
      </>
   );
}
