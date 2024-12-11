import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { ibmPlex, ibmPlex500, ibmPlex700, jersey } from "../../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { CustomButtonType } from "@/lib/types";
import toast from "react-hot-toast";
import { SuccessIcon } from "@/components/ui/icons";

export interface ConfirmDialogProps {
  handleConfirm: () => void;
}

export function ConfirmDialog({ handleConfirm }: ConfirmDialogProps) {
  function handleClick() {
    console.log("Deleting selected consoles");
    handleConfirm();
    toast("Console removed.", {
      className: cn(jersey.className, "text-xl text-white"),
      icon: <SuccessIcon />,
    });
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white h-60 w-[90%] rounded-md shadow-xl flex flex-col justify-center items-center text-center p-6">
          <p className={cn(ibmPlex500.className, "text-lg mb-8")}>
            Are you sure you want to delete selected consoles?
          </p>
          <div className="flex gap-4">
            <DialogClose>
              <CustomButton
                text="No"
                type={CustomButtonType.INACTIVE}
                handleClick={() => console.log("No")}
              />
            </DialogClose>
            <DialogClose>
              <CustomButton
                text="Yes"
                type={CustomButtonType.SUCCESS}
                handleClick={handleClick}
              />
            </DialogClose>
          </div>
        </div>
      </div>
    </>
  );
}
