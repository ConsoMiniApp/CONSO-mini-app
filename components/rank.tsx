import { cn } from "@/lib/utils";
import Image from "next/image";
import { handjet, ibmPlex, ibmPlex500, jersey } from "./ui/fonts";
import RankRow from "./app/rank/RankRow";
import {
  NintendoColoredLogo,
  PlaystationColoredLogo,
  XboxColoredLogo,
  SteamColoredLogo,
} from "./ui/icons";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { createClient } from "@/utils/supabase/client";
import { ConsoUser } from "@/lib/types";
import { RankTabSkeleton } from "./app/rank/RankTabSkeleton";

const consoleLogos: any = {
  "Play Station": PlaystationColoredLogo,
  Xbox: XboxColoredLogo,
  Steam: SteamColoredLogo,
  Nintendo: NintendoColoredLogo,
};

// create interface for RankRow type which has ConsoUser and rowExpanded boolean
interface RankRowUsers extends ConsoUser {
  rowExpanded: boolean;
}

export default function Rank() {
  const { user, telegramUsername } = useAppContext();
  const supabase = createClient();
  const [users, setUsers] = useState<RankRowUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("users_table")
        .select("*")
        .order("id", { ascending: true });

      if (data) {
        console.log(data);
        // add rowExpanded property to each row
        data.forEach((row: RankRowUsers) => {
          row.rowExpanded = false;
        });
        setUsers(data);
        setIsLoading(false);
      }
      if (error) {
        if (error.code == "PGRST116") {
        }
        console.log("Error fetching user data", error);
        setIsLoading(false);

        return;
      }
      console.log(data);
    } catch (error) {
      console.log("Error fetching user data", error);
      setIsLoading(false);
      return;
    }
  }

  function expandRow(index: number) {
    console.log("Row Expanded", index);
    const newUsers = [...users];
    newUsers[index].rowExpanded = !newUsers[index].rowExpanded;
    // close all other expanded rows
    newUsers.forEach((row, i) => {
      if (i !== index) row.rowExpanded = false;
    });
    setUsers(newUsers);
  }

  // load user data from supabase
  useEffect(() => {
    if (telegramUsername) fetchUsers();
  }, [telegramUsername]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto min-h-screen ">
      <div className="sticky top-0 z-10">
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
          <div className="grid grid-cols-9 w-full justify-center items-center px-4 bg-[#DE5EA6] h-[31px] border border-[#004AAD] border-1">
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
                "text-white text-xl font-normal col-span-3 tracking-wider",
                jersey.className
              )}
            >
              NICKNAME
            </span>
            <span
              className={cn(
                "text-white text-center text-xl font-normal col-span-3 tracking-wider border-l border-r border-[#004AAD]",
                jersey.className
              )}
            >
              <Image
                src="/play-logos/og_jetpack.png"
                width={18}
                height={18}
                alt=""
                className="inline-block mr-1"
              />
              DISTANCE
            </span>
            <span
              className={cn(
                "text-white text-center text-xl flex items-center justify-center tracking-wider font-normal col-span-2",
                jersey.className
              )}
            >
              <Image
                src="./other-logos/coin.svg"
                width={14}
                height={14}
                alt=""
                className="inline-block mr-1"
              />
              CONSO
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="">
          <RankTabSkeleton />
        </div>
      ) : (
        <>
          <div className="">
            {/* My Rank Row */}
            <div className="">
              <div
                className={cn(
                  "grid grid-cols-9 justify-center items-center px-4 h-[32px]",
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
                  # {user?.id}
                </span>
                <span
                  className={cn(
                    "text-white text-xl font-normal col-span-3",
                    jersey.className
                  )}
                >
                  {user?.nickname} (You)
                </span>
                <span
                  className={cn(
                    "text-white text-center text-xl font-normal col-span-3 ",
                    jersey.className
                  )}
                >
                  {user?.game_distance} m
                </span>
                <span
                  className={cn(
                    "text-[#E8BA00] text-center text-xl font-normal col-span-2",
                    jersey.className
                  )}
                >
                  {user.user_points}
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
                      CURRENT BOOST
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
                      {user.game_distance} x
                    </div>
                    <div className={cn("flex gap-1 mt-1")}>
                      {user.my_consoles.length > 0 ? (
                        user.my_consoles.map((console: string) => {
                          const Logo = consoleLogos[console];
                          return <Logo />;
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
            </div>

            {/* Table Body */}
            {users.map((row, index) => (
              <RankRow
                key={index}
                row={row}
                index={index}
                expandRow={expandRow}
                rowExpanded={row.rowExpanded}
              />
            ))}
          </div>

          {/* Pagination Section */}
          <div className="flex flex-col items-center justify-center space-y-2 bg-black py-4 ">
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
              Results: 1-{users.length} of {users.length}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
