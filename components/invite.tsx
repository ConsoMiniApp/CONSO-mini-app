import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, jersey, ibmPlex } from "./ui/fonts";
import CustomButton from "./conso/CustomButton";
import { CustomButtonType } from "@/lib/types";

const friendsList = [
  {
    rank: 1,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 2,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
];

export default function Invite() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Heading */}
        <div className=" bg-black ">
          <div className="flex justify-around mb-2">
            <span
              className={cn("text-5xl mt-10 text-white ", jersey.className)}
            >
              REFER & EARN
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <span
              className={cn(
                "text-white text-sm text-center w-[65%] ",
                ibmPlex.className
              )}
            >
              YOU AND YOUR FRENS WILL RECEIVE BONUSES FOR INVITATION
            </span>
          </div>
        </div>

        {/* Earned so far */}
        <div className="bg-[#1E2E3D] ">
          <div className="flex flex-col justify-center items-center m-4">
            <p
              className={cn(
                handjet.className,
                "text-[15px] text-white font-normal tracking-[0.1em]"
              )}
            >
              EARNED SO FAR
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
                30,000
              </span>
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-2 gap-[1px] h-[196px]">
          <div className="flex flex-col text-white bg-[#5C6E7E] justify-center items-center">
            <p className={cn(jersey.className, "text-2xl")}>INVITE A FREN</p>
            <p
              className={cn(ibmPlex.className, "text-[12px] text-center px-6")}
            >
              YOU AND YOUR FRIEND BOTH EARN
            </p>
            <div className="bg-[#DE5EA6] rounded-lg p-1 flex justify-center items-center gap-1 mt-4">
              <Image
                src="./other-logos/coin.svg"
                width={25}
                height={25}
                alt=""
                className="inline-block"
                onClick={() => console.log("Coin")}
              />
              <span className={cn(" text-3xl font-bold", jersey.className)}>
                30,000
              </span>
            </div>
          </div>

          <div className="flex flex-col text-white bg-[#5C6E7E] justify-center items-center">
            <p className={cn(jersey.className, "text-2xl")}>EARN EXTRA</p>
            <p
              className={cn(ibmPlex.className, "text-[12px] text-center px-6 ")}
            >
              ADDITIONALLY 10% OF LIFETIME EARNINGS
            </p>
            <div className="bg-[#DE5EA6] rounded-lg p-1 flex justify-center items-center gap-1 mt-4">
              <Image
                src="./other-logos/coin.svg"
                width={25}
                height={25}
                alt=""
                className="inline-block"
                onClick={() => console.log("Coin")}
              />
              <span className={cn(" text-3xl font-bold", jersey.className)}>
                10%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 h-20 mb-8 mt-4">
          {/* <span className={cn("text-xl text-[#E8BA00] ", jersey.className)}>
            2/1000 MORE LEFT
          </span> */}
          <CustomButton
            text="INVITE FRIENDS"
            type={CustomButtonType.OTHER}
            handleClick={() => {}}
          />
        </div>

        {/* Friend List Table Heading */}
        <div className="flex flex-col ">
          <div className="">
            <div className="grid grid-cols-2 px-4 h-[31px]">
              <span
                className={cn(
                  "text-[#BABABA] text-xl text-left col-span-1 tracking-[0.1em]",
                  handjet.className
                )}
              >
                FRIENDS LIST
              </span>

              <span
                className={cn(
                  "text-[#BABABA] text-right text-xl col-span-1 tracking-[0.1em]",
                  handjet.className
                )}
              >
                TOTAL : 2
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="">
            <div className="grid grid-cols-8 justify-center items-center px-4 bg-[#DE5EA6] h-[31px] border border-[#004AAD] border-1">
              <span
                className={cn(
                  "text-white text-xl font-normal col-span-1 ",
                  jersey.className
                )}
              >
                #
              </span>
              <span
                className={cn(
                  "text-white text-xl font-normal col-span-3",
                  jersey.className
                )}
              >
                NAME
              </span>
              <span
                className={cn(
                  "text-white text-center text-xl font-normal col-span-2 border-l border-r border-[#004AAD]",
                  jersey.className
                )}
              >
                <Image
                  src="./other-logos/boost.svg"
                  width={11}
                  height={11}
                  alt=""
                  className="inline-block mr-1"
                  onClick={() => console.log("Coin")}
                />
                BOOST
              </span>
              <span
                className={cn(
                  "text-white text-center text-xl flex items-center justify-center font-normal col-span-2",
                  jersey.className
                )}
              >
                <Image
                  src="./other-logos/coin.svg"
                  width={12}
                  height={12}
                  alt=""
                  className="inline-block mr-1"
                  onClick={() => console.log("Coin")}
                />
                CONSO
              </span>
            </div>
          </div>
        </div>

        {/* Friends List Table Body */}
        {friendsList.map((row, index) => (
          <div className="flex flex-col ">
            <div className="">
              <div
                className={cn(
                  "grid grid-cols-8 justify-center items-center px-4  h-[32px]",
                  index % 2 !== 0 ? "bg-[#5C6E7E]" : "bg-black"
                )}
              >
                <span
                  className={cn(
                    "text-white text-xl font-normal col-span-1 ",
                    jersey.className
                  )}
                >
                  #{row.rank}
                </span>
                <span
                  className={cn(
                    "text-white text-xl font-normal col-span-3",
                    jersey.className
                  )}
                >
                  {row.name}
                </span>
                <span
                  className={cn(
                    "text-white text-center text-xl font-normal col-span-2 ",
                    jersey.className
                  )}
                >
                  x{row.boost}
                </span>
                <span
                  className={cn(
                    "text-[#E8BA00] text-center text-xl font-normal col-span-2",
                    jersey.className
                  )}
                >
                  {row.conso}M
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
