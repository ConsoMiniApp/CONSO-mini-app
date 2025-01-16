import { handjet, jersey } from "@/components/ui/fonts";
import {
  NintendoColoredLogo,
  PlaystationColoredLogo,
  SteamColoredLogo,
  XboxColoredLogo,
} from "@/components/ui/icons";
import { checkForNoConsoles } from "@/lib/helpers/checkForNoConsoles";
import { ConsoUser } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RankRowProps {
  row: ConsoUser;
  index: number;
  expandRow: (index: number) => void;
  rowExpanded: boolean;
}

const RankRow = ({ row, index, expandRow, rowExpanded }: RankRowProps) => {
  function handleRowClick() {
    expandRow(index);
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
                "text-white text-xl font-normal col-span-3 tracking-wide",
                jersey.className
              )}
            >
              {row?.nickname?.length > 7
                ? `${row.nickname.slice(0, 7)}...`
                : row?.nickname}{" "}
            </span>
            <span
              className={cn(
                "text-white text-center text-xl font-normal col-span-2 tracking-wide",
                jersey.className
              )}
            >
              {row.game_total_distance} m
            </span>
            <span
              className={cn(
                "text-[#E8BA00] text-center text-xl font-normal col-span-2 tracking-wide",
                jersey.className
              )}
            >
              {/* {row.user_points} */}
              {row.user_points < 1000
                ? row.user_points
                : Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(row.user_points)}
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
              {/* <p
                className={cn(
                  handjet.className,
                  "text-sm tracking-wider text-[#808080]"
                )}
              >
                CURRENT BOOST
              </p> */}
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
              <div className={cn("flex gap-2 mt-1")}>
                {checkForNoConsoles(row.connected_consoles) ? (
                  <div
                    className={cn(
                      jersey.className,
                      "text-lg tracking-wider text-black mt-[-4px]"
                    )}
                  >
                    -NA-
                  </div>
                ) : (
                  Object.entries(row.connected_consoles).map(
                    ([consoleType, consoleData]) => {
                      const count = consoleData.length;

                      const Logo = () => {
                        switch (consoleType) {
                          case "nintendo":
                            return <NintendoColoredLogo />;
                          case "playstation":
                            return <PlaystationColoredLogo />;
                          case "xbox":
                            return <XboxColoredLogo />;
                          case "steam":
                            return <SteamColoredLogo />;
                          default:
                            return null;
                        }
                      };

                      return (
                        <div
                          key={consoleType}
                          className="flex items-center gap-1"
                        >
                          <Logo />
                          {count > 1 && (
                            <span
                              className={cn(
                                jersey.className,
                                "text-sm tracking-wider text-black"
                              )}
                            >
                              x{count}
                            </span>
                          )}
                        </div>
                      );
                    }
                  )
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
