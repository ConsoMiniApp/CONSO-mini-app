import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, ibmPlex, jersey } from "./ui/fonts";
import { useAppContext } from "@/contexts/AppContext";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";

const missions = [
  {
    logo: "./other-logos/console.svg",
    title: "Connect atleast two Consoles.",
    points: 2500,
  },
  {
    logo: "./other-logos/console.svg",
    title: "Connect atleast two Consoles.",
    points: 2500,
  },
  {
    logo: "./other-logos/console.svg",
    title: "Connect atleast two Consoles.",
    points: 2500,
  },
  {
    logo: "./other-logos/console.svg",
    title: "Connect atleast two Consoles.",
    points: 2500,
  },
  {
    logo: "./other-logos/console.svg",
    title: "Connect atleast two Consoles.",
    points: 2500,
  },
];

export default function Tasks() {
  const { pointBalance } = useAppContext();
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Heading */}
        <div className=" ">
          <div className="flex justify-around mb-2">
            <span
              className={cn("text-5xl mt-10 text-white ", jersey.className)}
            >
              MISSIONS
            </span>
          </div>

          <div className="flex justify-center ">
            <span
              className={cn(
                "text-white text-sm text-center w-[60%] ",
                ibmPlex.className
              )}
            >
              EARN TOP GAMERS AND CONSO WINNERS UPDATED DAILY
            </span>
          </div>
        </div>
        {/* Current Points */}
        {/* <div className="bg-[#1E2E3D] ">
          <div className="flex flex-col justify-center items-center m-4">
            <p
              className={cn(
                handjet.className,
                "text-[15px] text-white font-normal tracking-[0.1em]"
              )}
            >
              CURRENT POINTS....
            </p>
            <div className="flex justify-center gap-2">
              <Image
                src="./other-logos/coin.svg"
                width={30}
                height={30}
                alt=""
                className="inline-block"
                onClick={() => console.log("Coin")}
              />
              <span
                className={cn(
                  "text-yellow-400 text-4xl font-bold",
                  jersey.className
                )}
              >
                {pointBalance.toLocaleString()}
              </span>
            </div>
          </div>
        </div> */}

        {/* Tasks Buttons */}
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-3 px-4 justify-center items-center text-center ">
            <div className="bg-[#DE5EA6] ">
              <span
                className={cn(
                  jersey.className,
                  "text-xl text-white tracking-wider"
                )}
              >
                All Tasks
              </span>
            </div>
            <div className="bg-white">
              <span
                className={cn(
                  jersey.className,
                  "text-xl text-black tracking-wider"
                )}
              >
                Daily
              </span>
            </div>
            <div className="bg-white">
              <span
                className={cn(
                  jersey.className,
                  "text-xl text-black tracking-wider"
                )}
              >
                Weekly
              </span>
            </div>
          </div>
        </div>

        {/* Task Cards */}
        <div className="flex flex-col px-4 my-6 gap-3 w-full">
          {missions.map((mission) => (
            <div className="grid grid-cols-7 justify-center items-center px-2 py-2 bg-[#5C6E7E]">
              <div className="col-span-1 bg-[#1E2E3D] flex items-center justify-center rounded-lg h-10 w-10">
                <Image
                  src="./other-logos/console.svg"
                  width={32}
                  height={32}
                  alt=""
                  className="inline-block"
                  onClick={() => console.log("Coin")}
                />
              </div>
              <span
                className={cn(
                  jersey.className,
                  "text-xl text-white col-span-4 tracking-wider"
                )}
              >
                Connect atleast two Consoles.
              </span>
              <CustomButton
                text="2500"
                type={CustomButtonType.TASK_COIN_AMOUNT}
                handleClick={() => console.log("do nothing")}
              ></CustomButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
