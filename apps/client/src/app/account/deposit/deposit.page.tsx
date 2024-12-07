import { Modal } from "@/components";
import { Button } from "@/ui/button";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Textarea } from "@/ui/textarea";
import { Input } from "@/ui/input";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { accountService } from "@/api/services/account.service";

export default function DepositPage() {
   const modalRef = useRef<any>(null);
   const dispatch = useAppDispatch();
   const { depositMoney } = useAppSelector((state) => state.accountReducer);

   const onDepositMoney = async (values: any) => {
      try {
         await dispatch(accountService.depositMoney.api(values)).unwrap();
         modalRef.current.setToggle(false);
      } catch (error) {
         return;
      }
   };
   return (
      <>
         <div //
            className="border p-3 bg-white rounded-md"
            role="button"
            onClick={() => modalRef.current.setToggle(true)}>
            <img //
               src="/images/deposit-money.png"
               alt="deposit-money"
               className="mx-auto w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">Deposit money</h3>
         </div>
         <Modal ref={modalRef} heading="deposit money" className="p-6" closable>
            <Formik
               initialValues={{ amount: "", description: "" }}
               validationSchema={Yup.object({
                  amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
                  description: Yup.string().max(500, "Description can't be longer than 500 characters"),
               })}
               onSubmit={onDepositMoney}>
               <Form className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                     <img src="/images/deposit-money.png" alt="cash-withdrawal" width={150} className="mx-auto my-3" />
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
                     <Button type="submit" className="w-full uppercase" disabled={depositMoney.isLoading}>
                        {depositMoney.isLoading && <LoaderCircle className="spin" />}
                        deposit money
                     </Button>
                  </div>
               </Form>
            </Formik>
         </Modal>
      </>
   );
}
