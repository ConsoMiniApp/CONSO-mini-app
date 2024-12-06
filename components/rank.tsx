import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, ibmPlex, jersey } from "./ui/fonts";

const leaderboardRows = [
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
  {
    rank: 3,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 4,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 5,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 6,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 7,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 8,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 9,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 10,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 11,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 12,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 13,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 14,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 15,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 16,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 17,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 18,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 19,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 20,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
];

export default function Rank() {
  return (
    <div className="min-h-screen bg-[#5C6E7E]">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Heading */}
        <div className=" bg-black ">
          <div className="flex justify-around mb-4">
            <span
              className={cn("text-5xl mt-10 text-white ", jersey.className)}
            >
              LEADERBOARD
            </span>
          </div>

          <div className="flex justify-center mb-4">
            <span
              className={cn(
                "text-white text-sm text-center  w-[60%] ",
                ibmPlex.className
              )}
            >
              DISCOVER TOP GAMERS AND CONSO WINNERS UPDATED DAILY
            </span>
          </div>
        </div>

        {/* Leaderboard Table Section */}
        {/* Table Heading */}
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

        {/* My Rank Row */}
        <div className="">
          <div
            className={cn(
              "grid grid-cols-8 justify-center items-center px-4 h-[32px]",
              "bg-[#5C6E7E]"
            )}
            // onClick={() => console.log("My Rank")}
          >
            <span
              className={cn(
                "text-white text-xl font-normal col-span-1 ",
                jersey.className
              )}
            >
              99.9k
            </span>
            <span
              className={cn(
                "text-white text-xl font-normal col-span-3",
                jersey.className
              )}
            >
              You
            </span>
            <span
              className={cn(
                "text-white text-center text-xl font-normal col-span-2 ",
                jersey.className
              )}
            >
              x4.5
            </span>
            <span
              className={cn(
                "text-[#E8BA00] text-center text-xl font-normal col-span-2",
                jersey.className
              )}
            >
              43.37 M
            </span>
          </div>
          <div
            className={cn(
              "grid grid-cols-8 justify-center items-center w-full px-4 h-[58px]",
              "bg-[#5C6E7E]"
            )}
          >
            <div className="col-span-1 "> </div>
            <div className="col-span-7 h-[49px] bg-white rounded-md mb-2 py-1 px-4 ">
              <div className="grid grid-cols-2 ">
                <p
                  className={cn(
                    handjet.className,
                    "text-sm tracking-wider text-[#808080]"
                  )}
                >
                  GAME DISTANCE
                </p>
                <p
                  className={cn(
                    handjet.className,
                    "text-sm tracking-wider text-[#808080]"
                  )}
                >
                  CONSOLES
                </p>
              </div>

              <div className="grid grid-cols-2 ">
                <div
                  className={cn(
                    jersey.className,
                    "text-lg tracking-wider text-black"
                  )}
                >
                  5,24,56,234 m
                </div>
                <div className={cn("flex gap-1")}>
                  <Image
                    src="./console-logos/playstation-color.svg"
                    width={14}
                    height={14}
                    alt=""
                    className="inline-block"
                  />
                  <Image
                    src="./console-logos/xbox-color.svg"
                    width={14}
                    height={14}
                    alt=""
                    className="inline-block"
                  />
                  <Image
                    src="./console-logos/nintendo-color.svg"
                    width={14}
                    height={14}
                    alt=""
                    className="inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Body */}
        {leaderboardRows.map((row, index) => (
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
      </div>
    </div>
  );
}
