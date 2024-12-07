import { accountService } from "@/api/services/account.service";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { Modal } from "@/components";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import * as Yup from "yup";

export default function WithdrawPage() {
   const modalRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const { withdrawMoney } = useAppSelector((state) => state.accountReducer);

   const onWithdrawMoney = async (values: any) => {
      try {
         await dispatch(accountService.withdrawMoney.api(values)).unwrap();
         modalRef.current.setToggle(false);
      } catch (error) {
         return;
      }
   };

   return (
      <>
         <div className="border p-3 bg-white rounded-md" role="button" onClick={() => modalRef.current.setToggle(true)}>
            <img //
               src="/images/cash-withdrawal.png"
               alt="cash-withdrawal"
               className="mx-auto m w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">Withdraw money</h3>
         </div>
         <Modal ref={modalRef} heading="cash withdraw" className="p-6" closable>
            <Formik
               initialValues={{ amount: "", description: "" }}
               validationSchema={Yup.object({
                  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
                  description: Yup.string().max(500, "Description can't be longer than 500 characters"),
               })}
               onSubmit={onWithdrawMoney}>
               <Form className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                     <img src="/images/cash-withdrawal.png" alt="cash-withdrawal" width={150} className="mx-auto my-3" />
                  </div>
                  <div className="col-span-12">
                     <Field //
                        as={Input}
                        label="Amount"
                        id="amount"
                        name="amount"
                        type="text"
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded-md"
                        required
                     />
                     <ErrorMessage //
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>
                  <div className="col-span-12">
                     <Field
                        label="Description (Optional)"
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        className="w-full p-2 border rounded-md"
                        as={Textarea}
                        rows={4} // You can adjust the rows as needed
                     />
                     <ErrorMessage //
                        name="description"
                        component="div"
                        className="text-red-500 text-sm"
                     />
                  </div>
                  <div className="col-span-12">
                     <Button type="submit" className="w-full uppercase" disabled={withdrawMoney.isLoading}>
                        {withdrawMoney.isLoading && <LoaderCircle className="spin" />}
                        withdrawal cash
                     </Button>
                  </div>
               </Form>
            </Formik>
         </Modal>
      </>
   );
}
/*

export default function DepositPage() {
   const bottomSheetRef = useRef<any>(null);
   return (
      <>
         <div className="border p-3 bg-white rounded-md" role="button" onClick={() => bottomSheetRef.current.setToggle(true)}>
            <img //
               src="/images/deposit-money.png"
               alt="deposit-money"
               className="mx-auto w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">Deposit money</h3>
         </div>
         <BottomSheet ref={bottomSheetRef} heading="deposit money" className="p-3">
            d
         </BottomSheet>
      </>
   );
}
*/
