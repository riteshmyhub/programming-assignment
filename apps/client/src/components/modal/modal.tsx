import { AlertDialog, AlertDialogContent } from "@/ui/alert-dialog";
import { XIcon } from "lucide-react";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

type Props = {
   children: ReactNode;
   heading: string;
   className?: string;
   closable?: boolean;
};
export const Modal = forwardRef(({ children, heading, className, closable }: Props, ref) => {
   const [isOpen, setToggle] = useState(false);

   useImperativeHandle(ref, () => ({ setToggle }), []);

   return (
      <AlertDialog open={isOpen}>
         <AlertDialogContent //
            className={`md:w-[50%] mx-auto p-0 ${className}`}
            onOpenAutoFocus={(e) => e.preventDefault()}>
            {heading && (
               <div className="flex justify-between mb-3">
                  <h1 className="text-xl capitalize font-medium">{heading}</h1>
                  {closable && ( //
                     <XIcon onClick={() => setToggle(false)} className="cursor-pointer" />
                  )}
               </div>
            )}
            <div>{children}</div>
         </AlertDialogContent>
      </AlertDialog>
   );
});
