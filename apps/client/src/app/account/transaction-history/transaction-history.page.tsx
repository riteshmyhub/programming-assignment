import { accountService } from "@/api/services/account.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { Modal } from "@/components";
import { ScrollArea } from "@/ui/scroll-area";
import { LoaderCircleIcon } from "lucide-react";
import { useRef } from "react";
import moment from "moment";

export default function TransactionHistoryPage() {
   const modalRef = useRef<any>(null);
   const { transactionHistory } = useAppSelector((state) => state.accountReducer);
   const dispatch = useAppDispatch();

   const getTransactionHistory = async () => {
      modalRef.current.setToggle(true);
      try {
         await dispatch(accountService.getTransactionHistory.api()).unwrap();
      } catch (error) {
         return;
      }
   };

   return (
      <>
         <div className="border p-3 bg-white rounded-md" role="button" onClick={getTransactionHistory}>
            <img //
               src="/images/transaction-history.png"
               alt="cash-withdrawal"
               className="mx-auto m w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">transaction history</h3>
         </div>
         <Modal ref={modalRef} heading="Transaction History" className="p-6" closable>
            {transactionHistory?.isLoading ? (
               <div className="text-gray-500">
                  <LoaderCircleIcon className="spin mx-auto" size={100} />
                  <p className="text-center">fetching all transactions</p>
               </div>
            ) : (
               <div>
                  <ScrollArea className="space-y-h4 h-[50vh] p-2">
                     {transactionHistory?.data?.map((transaction) => (
                        <div key={transaction._id} className="flex justify-between items-center bg-white p-4 rounded-lg border mb-3">
                           <div>
                              <p className="text-gray-800 font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-500"> {moment(transaction.date).format("MMMM Do YYYY, h:mm:ss a")}</p>
                           </div>
                           <p className="text-gray-600 font-bold" data-currency>
                              {transaction.amount}
                           </p>
                        </div>
                     ))}
                  </ScrollArea>
               </div>
            )}
         </Modal>
      </>
   );
}
