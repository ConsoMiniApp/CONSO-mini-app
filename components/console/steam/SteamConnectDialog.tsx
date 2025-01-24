import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { BackArrow, ErrorIcon, SuccessIcon } from "@/components/ui/icons";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/contexts/AppContext";
import { getUserData } from "@/lib/steam/getUserData";
import { getGameData } from "@/lib/steam/getGameData";
import { Circle, Loader, Loader2 } from "lucide-react";
import RetroLoader from "@/components/app/common/RetroLoader";
import ConnectDialogSkeleton from "../ConnectDialogSkeleton";
import { SteamConnectedDialog } from "./SteamConnectedDialog";
import { calculateGameBonus } from "@/lib/steam/calculateConsoBonus";
import { Checkbox } from "@/components/ui/checkbox";
import { set } from "date-fns";

export function SteamConnectDialog() {
  const supabase = createClient();
  const { telegramUsername, user, setUserData } = useAppContext();

  const [apiKey, setApiKey] = useState("");
  const [ownSteamDeck, setOwnSteamDeck] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSteamConnect() {
    console.log("Connecting Steam", apiKey.length);
    if (apiKey.length < 32) {
      toast.error("Invalid API Key", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
      });
      return;
    }

    try {
      // check if npsso code already exists in database
      setIsPending(true);
      const { data, error } = await supabase
        .from("steam_users_consoles_data")
        .select("api_key")
        .eq("api_key", apiKey);

      console.log(data, error);

      if ((data && data.length > 0) || error) {
        setIsPending(false);
        toast.error("Steam already connected.", {
          className: cn(jersey.className, "text-xl text-white mt-10"),
          icon: <ErrorIcon />,
        });
        return;
      }

      // get user data and game data with this npsso
      const userDataRes = await getUserData({ apiKey: apiKey });
      const gameDataRes = await getGameData({ apiKey: apiKey });
      console.log(userDataRes);
      console.log(gameDataRes);

      if (userDataRes.data.error || gameDataRes.data.error) {
        setIsPending(false);
        throw new Error(userDataRes.error);
      }

      // check if console_user_identifier already exists in database for this npsso and only reconnect if minning_status is false
      const { data: consoleData, error: consoleError } = await supabase
        .from("steam_users_consoles_data")
        .select("console_user_identifier,mining_status")
        .eq("console_user_identifier", userDataRes.data.data);

      console.log(consoleData, consoleError);

      if (
        (consoleData &&
          consoleData.length > 0 &&
          consoleData[0].mining_status) ||
        consoleError
      ) {
        setIsPending(false);
        toast.error("Steam already connected.", {
          className: cn(jersey.className, "text-xl text-white mt-10"),
          icon: <ErrorIcon />,
        });
        return;
      }

      // save data to database
      const { data: steamData, error: steamError } = await supabase
        .from("steam_users_consoles_data")
        .insert([
          {
            username: telegramUsername,
            api_key: apiKey,
            console_user_identifier: userDataRes.data.data,
            user_data: userDataRes.data.data,
            games_data: gameDataRes.data,
            last_data_sync: new Date().toISOString(),
            mining_status: true,
          },
        ]);

      console.log(steamData, steamError);

      if (steamError) {
        setIsPending(false);
        throw new Error("Error");
      }

      let consoleConnectionBonus = calculateGameBonus({
        games: gameDataRes.data.data,
      });

      // add steam to user data.connected_consoles
      const { data: userData, error: userError } = await supabase
        .from("users_table")
        .update({
          connected_consoles: {
            ...user.connected_consoles,
            steam: [
              ...user.connected_consoles.steam,
              {
                console_username: "Steam",
                joined_date: new Date().toISOString(),
                console_user_identifier: userDataRes.data.data,
                conso_bonus: consoleConnectionBonus,
                status: "Mining",
              },
            ],
          },
          user_points: user.user_points + consoleConnectionBonus,
        })
        .eq("username", telegramUsername);

      console.log(userData, userError);

      if (userError) {
        setIsPending(false);
        throw new Error("Error");
      }

      console.log(userData, userError);

      // get latest user data and update app context

      toast("Steam Connected.", {
        className: cn(jersey.className, "text-xl text-white"),
        icon: <SuccessIcon />,
      });
      setIsPending(false);

      setIsLoading(true);

      const { data: updatedUserData, error: updatedUserError } = await supabase
        .from("users_table")
        .select("*")
        .eq("username", telegramUsername)
        .single();

      console.log(updatedUserData, updatedUserError);

      if (updatedUserError) {
        setIsLoading(false);
        throw new Error("Error");
      }

      if (updatedUserData) {
        setUserData(updatedUserData);
        setConnectionSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsPending(false);
      toast.error("There was an error.", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
        icon: <ErrorIcon />,
      });
    }
  }
  // scroll to top of screen on component load
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      {isLoading ? (
        <ConnectDialogSkeleton />
      ) : connectionSuccess ? (
        <>
          <SteamConnectedDialog />
        </>
      ) : (
        <div className="overflow-y-scroll scrollbar-none mt-12">
          {/* Top Status Card */}
          <div className="p-4 rounded-3xl border-2 shadow-lg bg-black border-neutral-800">
            <div className="flex justify-between ">
              <DialogClose>
                <BackArrow />
              </DialogClose>
              <span className={cn("text-6xl text-white ", jersey.className)}>
                CONSO
              </span>
              <div className="w-8"></div>
            </div>
            {/* Console Details */}
            <div
              className={cn(
                " flex flex-col gap-2 justify-center items-center mt-4"
              )}
            >
              <p
                className={cn(
                  "text-[#DE5EA6] text-2xl text-nowrap tracking-wider",
                  jersey.className
                )}
              >
                CONNECT CONSOLE
              </p>

              <p
                className={cn(
                  "text-white text-2xl text-nowrap tracking-wider",
                  jersey.className
                )}
              >
                Steam Web/Deck
              </p>
              <Image
                src={"console-logos/steam-pixelated.svg"}
                height={120}
                width={120}
                alt="PlayStation"
              />

              <p
                className={cn(
                  "text-[#FFE500] text-2xl text-nowrap tracking-wider",
                  jersey.className
                )}
              >
                1.2x Boost
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="p-4 mt-4 rounded-3xl shadow-lg bg-white ">
            <div className="flex justify-between px-2">
              <p
                className={cn(
                  handjet.className,
                  "text-xl text-[#7C7C7C] tracking-wider"
                )}
              >
                {" "}
                INSTRUCTIONS
              </p>
              <div className="flex gap-2">
                <Image
                  src="/other-logos/youtube.svg"
                  width={26}
                  height={19}
                  alt="YouTube"
                />
                <a
                  href="https://youtu.be"
                  target="__blank"
                  className={cn(
                    jersey.className,
                    "text-[#002E87] text-lg underline"
                  )}
                >
                  Tutorial
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-1 mt-3">
              {/* Console Connected Card */}
              <div className=" flex flex-col gap-3 tracking-tighter">
                <div className=" flex flex-col gap-3 tracking-tighter">
                  <p
                    className={cn(ibmPlex500.className, " text-xs flex gap-1")}
                  >
                    <span
                      className={cn(ibmPlex700.className, "text-xs text-black")}
                    >
                      1.{" "}
                    </span>
                    <span>
                      Go to{" "}
                      <a
                        href="https://steamcommunity.com/dev/apikey"
                        target="__blank"
                        className="underline text-[#002E87]"
                      >
                        https://steamcommunity.com/dev/apikey
                      </a>{" "}
                      to retrieve your API key
                      <br />
                      <br />
                      Enter Steam API Key
                    </span>
                  </p>

                  <form
                    className="flex flex-col gap-4 "
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSteamConnect();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="YOUR_API_KEY"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className={cn(
                        "border-2 border-gray-400 bg-[#D7D7D7] rounded-lg p-2  ml-4 text-xs tracking-wider mr-2",
                        ibmPlex500.className
                      )}
                    />
                    <p
                      className={cn(
                        ibmPlex500.className,
                        " text-xs flex gap-2"
                      )}
                    >
                      <span
                        className={cn(
                          ibmPlex700.className,
                          "text-xs text-black mt-2 "
                        )}
                      >
                        <Checkbox
                          className="h-4 w-4"
                          id="terms"
                          checked={ownSteamDeck}
                          onCheckedChange={(state: boolean) => {
                            console.log("Selected", state);
                            setOwnSteamDeck(state);
                          }}
                        />
                      </span>
                      <span className="flex flex-col gap-2">
                        <span></span>Do you own a steam deck?
                        <span>
                          {ownSteamDeck ? "Enter Steam Deck Serial Number" : ""}
                        </span>
                      </span>
                    </p>

                    {ownSteamDeck && (
                      <input
                        type="text"
                        placeholder="STEAM_DECK_SERIAL_NUMBER"
                        className={cn(
                          "border-2 border-gray-400 bg-[#D7D7D7] rounded-lg p-2  ml-4 text-xs tracking-wider mr-2",
                          ibmPlex500.className
                        )}
                      />
                    )}
                    <p
                      className={cn(
                        ibmPlex500.className,
                        " text-[11px] text-[#7C7C7C] tracking-tighter ml-4"
                      )}
                    >
                      Steam Console holders will act as NODES, contributing data
                      and mining tokens with a 2.5x BOOST multiplier over the
                      base rate.
                    </p>

                    {isPending ? (
                      <RetroLoader />
                    ) : (
                      <div className="flex justify-center mt-2">
                        <CustomButton
                          text="CONNECT STEAM"
                          type={CustomButtonType.PRIMARY_WIDE}
                          handleClick={handleSteamConnect}
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Empty Space */}
            <br />
          </div>
        </div>
      )}
    </>
  );
}
