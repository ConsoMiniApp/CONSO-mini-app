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

export interface ClaimTokenDialogProps {
  handleConfirm: () => void;
}

export function ClaimTokenDialog({ handleConfirm }: ClaimTokenDialogProps) {
  function handleClick() {
    console.log("Claimed tokens in this mystery box.");
    handleConfirm();
    toast("Claimed Mystery box.", {
      className: cn(jersey.className, "text-xl text-white mt-10"),
      icon: <SuccessIcon />,
    });
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="bg-white h-[435px] w-[90%] rounded-sm shadow-xl flex flex-col justify-center items-center text-center p-6"
          style={{
            backgroundImage: "url('/pngs/claim-token-bg.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="h-[222px] w-[222px] rounded-lg border-4 border-[#FFE500] bg-[#FFF59D] relative flex justify-center items-center">
            <div className="">
              <Image
                src="/other-logos/coin.svg"
                alt="Coin"
                width={107}
                height={107}
              />
            </div>
            <div
              className={cn(
                jersey.className,
                "absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 py-1 px-4 bg-[#DE5EA6] rounded-lg border-4 border-white text-white text-4xl"
              )}
            >
              x200
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <DialogClose>
              <CustomButton
                text="CLAIM TOKEN"
                type={CustomButtonType.SUCCESS_MEDIUM}
                handleClick={handleClick}
              />
            </DialogClose>
          </div>
        </div>
      </div>
    </>
  );
}
