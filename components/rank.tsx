import { cn } from "@/lib/utils";
import Image from "next/image";
import { handjet, ibmPlex, ibmPlex500, jersey } from "./ui/fonts";
import RankRow from "./app/rank/RankRow";
import {
  NintendoColoredLogo,
  PlaystationColoredLogo,
  XboxColoredLogo,
} from "./ui/icons";
import { useEffect } from "react";

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
  {
    rank: 21,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  // add more rows here
  {
    rank: 22,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 23,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 24,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 25,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 26,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 27,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 28,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 29,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 30,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 31,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 32,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 33,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 34,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 35,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 36,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 37,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 38,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 39,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 40,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 41,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 42,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 43,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 44,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 45,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 46,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 47,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 48,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
  {
    rank: 49,
    name: "John Doe",
    boost: 4.5,
    conso: 43.37,
  },
  {
    rank: 50,
    name: "Jane Doe",
    boost: 3.5,
    conso: 33.37,
  },
];

export default function Rank() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen ">
      <div className="sticky top-0">
        {/* Heading */}
        <div className="bg-black">
          <div className="flex justify-around mb-2">
            <span
              className={cn("text-5xl mt-10 text-white ", jersey.className)}
            >
              LEADERBOARD
            </span>
          </div>

          <div className="flex justify-center pb-4">
            <span
              className={cn(
                "text-white text-sm text-center w-[70%] ",
                ibmPlex.className
              )}
            >
              DISCOVER TOP GAMERS AND CONSO WINNERS UPDATED DAILY
            </span>
          </div>
        </div>

        {/* Leaderboard Table Section */}
        {/* Table Heading */}
        <div className="">
          <div className="grid grid-cols-8 w-full justify-center items-center px-4 bg-[#DE5EA6] h-[31px] border border-[#004AAD] border-1">
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
                width={14}
                height={14}
                alt=""
                className="inline-block mr-1"
                onClick={() => console.log("Coin")}
              />
              CONSO
            </span>
          </div>
        </div>
      </div>
      <div className="">
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
              Nickname (You)
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
          {/* Expanded Data View for a Rank */}
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
                <div className={cn("flex gap-1 mt-1")}>
                  <PlaystationColoredLogo />
                  <XboxColoredLogo />
                  <NintendoColoredLogo />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Body */}
        {leaderboardRows.map((row, index) => (
          <RankRow key={index} row={row} index={index} />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex flex-col items-center justify-center space-y-2 bg-black py-4">
        <div
          className={cn(
            "flex items-center space-x-2 text-white",
            jersey.className
          )}
        >
          {/* Previous Button */}
          <button className="bg-gray-400 px-3 py-1 rounded-md  text-white hover:text-white ">
            &lt;
          </button>

          {/* Page Numbers */}
          <button className="border-2 border-[#DE5EA6] bg-[#DE5EA6] text-bg-[#DE5EA6] px-3 py-1 rounded-md hover:text-white">
            1
          </button>
          <button className="border border-gray-400 px-3 py-1 rounded-md hover:text-white">
            2
          </button>
          <button className="border border-gray-400 px-3 py-1 rounded-md hover:text-white">
            3
          </button>
          <button className="border border-gray-400 px-3 py-1 rounded-md hover:text-white">
            4
          </button>
          <button className="border border-gray-400 px-3 py-1 rounded-md hover:text-white">
            ...
          </button>
          <button className="border border-gray-400 px-3 py-1 rounded-md hover:text-white">
            20
          </button>

          {/* Next Button */}
          <button className="bg-[#DE5EA6] text-white px-3 py-1 rounded-md hover:bg-bg-[#DE5EA6] hover:text-white">
            &gt;
          </button>
        </div>

        {/* Results Text */}
        <p className={cn("text-white text-sm", ibmPlex500.className)}>
          Results: 1-20 of 456,790
        </p>
      </div>
    </div>
  );
}
