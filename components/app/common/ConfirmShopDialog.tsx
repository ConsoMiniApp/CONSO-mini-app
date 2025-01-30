import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  handjet,
  ibmPlex,
  ibmPlex500,
  ibmPlex700,
  jersey,
} from "../../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { CustomButtonType } from "@/lib/types";
import toast from "react-hot-toast";
import { SuccessIcon } from "@/components/ui/icons";

export interface ConfirmDialogProps {
  handleConfirm: () => void;
  item: {
    name: string;
    image: string;
    price: number;
  };
}

export function ConfirmShopDialog({ handleConfirm, item }: ConfirmDialogProps) {
  function handleClick() {
    console.log("Purchasing selected items");
    handleConfirm();
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white w-[90%] rounded-md shadow-xl flex flex-col justify-center items-center text-center p-6">
          <p className={cn(ibmPlex500.className, "text-lg mb-8")}>
            Do you want to purchase this item?
          </p>

          <div
            className={cn(
              "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative",
              "bg-white"
            )}
          >
            <p
              className={cn(
                handjet.className,
                "text-xs text-black tracking-widest"
              )}
            >
              {item.name}
            </p>
            <Image
              src={item.image}
              alt="Mystery Box"
              width={134}
              height={100}
            />
            <div
              className={cn(
                jersey.className,
                "absolute bottom-[-16px] left-1/2 -translate-x-1/2  w-[60%]  "
              )}
            >
              <div className="bg-[#00BA64] rounded-md flex gap-1 px-2 justify-center">
                <Image
                  src="/other-logos/coin.svg"
                  height={15}
                  width={15}
                  alt="coin-image"
                />{" "}
                <p className={cn(jersey.className, "text-md text-white")}>
                  {item.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
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
