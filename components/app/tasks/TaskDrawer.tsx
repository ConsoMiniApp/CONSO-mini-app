import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Coin, ConsoleIcon, GameLogo } from "@/components/ui/icons";
import CustomButton from "../common/CustomButton";
import { CustomButtonType } from "@/lib/types";

interface TaskDrawerProps {
  logo: string;
  name: string;
  description: string;
  coinAmount: number;
}

export function TaskDrawer({
  logo,
  name,
  description,
  coinAmount,
}: TaskDrawerProps) {
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none p-4 ">
        {/* Top Section */}
        <div className="flex justify-between px-2">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            CONSO MISSIONS
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 px-2">
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <Image src={logo} alt="logo" height={100} width={100} />
            <p className={cn("text-3xl ", jersey.className)}>{name}</p>
            <p
              className={cn(
                "text-lg text-center text-gray-500 ",
                ibmPlex500.className
              )}
            >
              {description}
            </p>
            <div className="flex gap-4 items-center">
              <Coin />
              <p className={cn("text-4xl", jersey.className)}>+{coinAmount}</p>
            </div>
            <CustomButton
              text={"Check"}
              type={CustomButtonType.SUCCESS_MEDIUM}
              handleClick={() => console.log("check mission")}
            ></CustomButton>
          </div>
        </div>
      </div>
    </>
  );
}
