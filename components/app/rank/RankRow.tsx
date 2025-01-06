import { handjet, jersey } from "@/components/ui/fonts";
import {
  NintendoColoredLogo,
  PlaystationColoredLogo,
  SteamColoredLogo,
  XboxColoredLogo,
} from "@/components/ui/icons";
import { ConsoUser } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RankRowProps {
  row: ConsoUser;
  index: number;
  expandRow: (index: number) => void;
  rowExpanded: boolean;
}

const consoleLogos: any = {
  "Play Station": PlaystationColoredLogo,
  Xbox: XboxColoredLogo,
  "Steam Deck": SteamColoredLogo,
  Nintendo: NintendoColoredLogo,
};

const RankRow = ({ row, index, expandRow, rowExpanded }: RankRowProps) => {
  // const [rowExpanded, setRowExpanded] = useState(false);

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
              {row.game_distance} m
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
              {/* <div
                className={cn(
                  jersey.className,
                  "text-lg tracking-wider text-black"
                )}
              >
                {row.current_boost} x
              </div> */}
              <div className={cn("flex gap-2 mt-1")}>
                {row.my_consoles.length > 0 ? (
                  Object.entries(
                    row.my_consoles.reduce(
                      (acc: Record<string, number>, console: string) => {
                        acc[console] = (acc[console] || 0) + 1;
                        return acc;
                      },
                      {}
                    )
                  ).map(([console, count]: [string, number]) => {
                    const Logo = consoleLogos[console];
                    if (!Logo) return null;
                    return (
                      <div className="flex items-center gap-1">
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
                  })
                ) : (
                  <div
                    className={cn(
                      jersey.className,
                      "text-lg tracking-wider text-black mt-[-4px]"
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
