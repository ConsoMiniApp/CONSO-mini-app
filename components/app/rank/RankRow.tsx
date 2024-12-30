import { handjet, jersey } from "@/components/ui/fonts";
import {
  NintendoColoredLogo,
  PlaystationColoredLogo,
  SteamColoredLogo,
  XboxColoredLogo,
} from "@/components/ui/icons";
import { ConsoUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface RankRowProps {
  row: ConsoUser;
  index: number;
}

const consoleLogos: any = {
  "Play Station": PlaystationColoredLogo,
  Xbox: XboxColoredLogo,
  Steam: SteamColoredLogo,
  Nintendo: NintendoColoredLogo,
};

const RankRow = ({ row, index }: RankRowProps) => {
  const [rowExpanded, setRowExpanded] = useState(false);

  function handleRowClick() {
    setRowExpanded(!rowExpanded);
  }
  return (
    <>
      <div className="flex flex-col ">
        <div className="">
          <div
            className={cn(
              "grid grid-cols-8 justify-center items-center px-4  h-[32px]",
              index % 2 !== 0 ? "bg-[#5C6E7E]" : "bg-black"
            )}
            onClick={handleRowClick}
          >
            <span
              className={cn(
                "text-white text-xl font-normal col-span-1 ",
                jersey.className
              )}
            >
              #{row.id}
            </span>
            <span
              className={cn(
                "text-white text-xl font-normal col-span-3",
                jersey.className
              )}
            >
              {row.nickname}
            </span>
            <span
              className={cn(
                "text-white text-center text-xl font-normal col-span-2 ",
                jersey.className
              )}
            >
              x{row.current_boost}
            </span>
            <span
              className={cn(
                "text-[#E8BA00] text-center text-xl font-normal col-span-2",
                jersey.className
              )}
            >
              {row.user_points}
            </span>
          </div>
        </div>
      </div>

      {rowExpanded && (
        <div
          className={cn(
            "grid grid-cols-8 justify-center items-center w-full px-4 h-[58px]",
            index % 2 !== 0 ? "bg-[#5C6E7E]" : "bg-black"
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
                {row.game_distance} m
              </div>
              <div className={cn("flex gap-1 mt-1")}>
                {row.my_consoles.length > 0 ? (
                  row.my_consoles.map((console: string) => {
                    const Logo = consoleLogos[console];
                    return <Logo />;
                  })
                ) : (
                  <div
                    className={cn(
                      jersey.className,
                      "text-lg tracking-wider text-black mt-0"
                    )}
                  >
                    -NA-
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RankRow;
