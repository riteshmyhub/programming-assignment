import { useAppSelector } from "@/api/store";
import { Modal } from "@/components";
import { useRef } from "react";

export default function ProfilePage() {
   const modalRef = useRef<any>(null);
   const { session } = useAppSelector((state) => state.authReducer);
   return (
      <>
         <div className="border p-3 bg-white rounded-md" role="button" onClick={() => modalRef.current.setToggle(true)}>
            <img //
               src="/images/profile.png"
               alt="cash-withdrawal"
               className="mx-auto m w-[50px] md:w-[100px] my-3"
            />
            <h3 className="text-sm md:text-xl text-center font-normal capitalize">Account</h3>
         </div>
         <Modal ref={modalRef} heading="Account Info" className="p-6" closable>
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-12">
                  <img src="/images/profile.png" alt="cash-withdrawal" width={150} className="mx-auto my-3" />
               </div>
               <div className="col-span-12 p-4">
                  <h1 className="text-xl font-semibold text-center text-gray-800">{session.data?.email}</h1>
                  <p className="mt-2 text-sm text-gray-600">
                     <span className="font-medium text-gray-800">Account No : </span> {session.data?.account}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                     <span className="font-medium text-gray-800">Fullname : </span> {session.data?.fullname}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                     <span className="font-medium text-gray-800">UserID : </span> {session.data?.userID}
                  </p>
               </div>
            </div>
         </Modal>
      </>
   );
}
