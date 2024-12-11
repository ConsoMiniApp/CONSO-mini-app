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
import { ibmPlex, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";

export function AdvertisementDialog() {
  return (
    <>
      <div className="">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <DialogClose>
            <a>
              <Image
                src="/other-logos/back.svg"
                alt="Advertisement"
                width={50}
                height={50}
              />
            </a>
          </DialogClose>

          <div className="flex gap-2 bg-black rounded-full p-2">
            <Image
              src="/other-logos/coin.svg"
              alt="Advertisement"
              width={22}
              height={22}
            />
            <p className={cn(jersey.className, "text-2xl text-white")}>
              10 with this ad
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="absolute w-full">
          <Image
            src="/pngs/image.png"
            alt="Advertisement"
            width={400}
            height={300}
          />
        </div>

        {/* Bottom Advertiser Info Section */}
        <div className="bg-black w-full h-[250px] absolute bottom-0 left-0">
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
              type={CustomButtonType.PRIMARY}
              text="GET"
              handleClick={() => {
                console.log("GET");
              }}
              className="text-black"
            ></CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
