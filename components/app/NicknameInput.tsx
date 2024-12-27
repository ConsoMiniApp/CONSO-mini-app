import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { ibmPlex, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import toast from "react-hot-toast";
import { SuccessIcon } from "@/components/ui/icons";

export function NicknameInput() {
  function handleClick() {
    console.log("Setting you conso nickname");
    toast("Nickname added.", {
      className: cn(jersey.className, "text-xl text-white"),
      icon: <SuccessIcon />,
    });
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white h-60 w-[90%] rounded-md shadow-xl flex flex-col justify-center items-center text-center p-6">
          <p className={cn(ibmPlex500.className, "text-lg mb-2")}>
            Enter your nickname
          </p>

          <p className={cn(ibmPlex.className, "text-xs mb-8")}>
            You can change it later in settings
          </p>
          <div className="flex gap-4">
            {/* <DialogClose>
              <CustomButton
                text="No"
                type={CustomButtonType.INACTIVE}
                handleClick={() => console.log("No")}
              />
            </DialogClose> */}
            <DialogClose>
              <CustomButton
                text="Save"
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
