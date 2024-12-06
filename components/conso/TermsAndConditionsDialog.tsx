import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { CustomButtonType } from "@/lib/types";

export function TermsDisclaimer() {
  return (
    <>
      <div className="">
        {/* Top Section */}
        <div className="flex justify-between ">
          <p className={cn(handjet.className, "text-xl text-[#7C7C7C]")}>
            {" "}
            TERMS & CONDITIONS
          </p>
          <DialogClose>
            <a>
              <Image
                src="/other-logos/close.svg"
                alt="Advertisement"
                width={24}
                height={24}
              />
            </a>
          </DialogClose>
        </div>

        {/* All Details */}

        {/* Bottom Advertiser Info Section */}
        {/* <div className="bg-black w-full h-[250px] absolute bottom-0 left-0">
          <Image
            className="relative left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl"
            src="/pngs/polymarket.png"
            alt="Advertiser Logo"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-2 text-white items-center justify-start">
            <p className={cn(jersey.className, "text-4xl mt-[-30px] ")}>
              Polymarket
            </p>
            <p
              className={cn(
                ibmPlex.className,
                "text-sm w-[50%] text-center mb-2"
              )}
            >
              THE WORLD's LEADING PREDICTION MARKET
            </p>
            <CustomButton
              type={CustomButtonType.CONNECT}
              text="GET"
              handleClick={() => {
                console.log("GET");
              }}
              className="text-black"
            ></CustomButton>
          </div>
        </div> */}
      </div>
    </>
  );
}
