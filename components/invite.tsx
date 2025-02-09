import { cn } from "@/lib/utils";
import Image from "next/image";
import { handjet, jersey, ibmPlex } from "./ui/fonts";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType, Referre } from "@/lib/types";
import {
  Coin,
  CoinSmallIcon,
  NintendoColoredLogo,
  PlaystationColoredLogo,
  SteamColoredLogo,
  XboxColoredLogo,
} from "./ui/icons";
import { useEffect, useState } from "react";
import { INVITE_LINK } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/contexts/AppContext";
import RankRow from "./app/rank/RankRow";
import RefereeRow from "./app/invite/RefereeRow";
import { getInviteLink } from "@/lib/helpers/getInviteLink";
import { RefereeRowSkeleton } from "./app/invite/RefereeRowSkeleton";

interface InviteRowUsers extends Referre {
  rowExpanded: boolean;
}

export default function Invite() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const { telegramUsername, user } = useAppContext();
  const [referees, setReferees] = useState<InviteRowUsers[]>([]);

  function expandRow(index: number) {
    console.log("Row Expanded", index);
    const newUsers = [...referees];
    newUsers[index].rowExpanded = !newUsers[index].rowExpanded;
    // close all other expanded rows
    newUsers.forEach((row, i) => {
      if (i !== index) row.rowExpanded = false;
    });
    setReferees(newUsers);
  }

  function invite() {
    //@ts-ignore
    if (window.Telegram) {
      //@ts-ignore
      const tg = window.Telegram.WebApp;
      // tg.openTelegramLink(INVITE_LINK);
      tg.openTelegramLink(getInviteLink(user.referral_code));
    }
  }

  async function fetchUserData() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("invite_table")
      .select("referee")
      .eq("referral_code", user.referral_code);

    if (data) {
      let referees: InviteRowUsers[] = [];
      data.forEach((row: { referee: Referre }) => {
        referees.push({ ...row.referee, rowExpanded: false });
      });
      setReferees(referees);
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      window.scrollTo(0, 0);
      fetchUserData();
    }
  }, []);

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
              <div className="flex items-center">
                {" "}
                <Coin />
              </div>

              <span
                className={cn(
                  "text-yellow-400 text-4xl font-bold",
                  jersey.className
                )}
              >
                {user.earned_referral_points}
                {/* {referees.length > 0
                  ? 200 * referees.length +
                    0.1 *
                      referees
                        .map((r) => r.user_points)
                        .reduce((a, b) => a + b, 0)
                  : 0} */}
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
              <div className="flex items-center">
                {" "}
                <CoinSmallIcon />
              </div>
              <span className={cn(" text-3xl font-bold", jersey.className)}>
                200
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
              <div className="flex items-center">
                {" "}
                <CoinSmallIcon />
              </div>
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
            handleClick={() => {
              invite();
            }}
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
                TOTAL : {referees.length}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="">
            <div className="grid grid-cols-9 justify-center items-center px-4 bg-[#DE5EA6] h-[31px] border border-[#004AAD] border-1">
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
                  "text-white text-center text-xl font-normal col-span-3 border-l border-r border-[#004AAD]",
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
        {isLoading ? (
          <div className="">
            <RefereeRowSkeleton />
          </div>
        ) : (
          <>
            {referees.length > 0 ? (
              <>
                {referees.map((row, index) => (
                  <RefereeRow
                    key={index}
                    row={row}
                    index={index}
                    expandRow={expandRow}
                    rowExpanded={row.rowExpanded}
                  />
                ))}
              </>
            ) : (
              <div className="flex flex-col justify-center items-center gap-3 h-20 mb-4 mt-2">
                <span
                  className={cn("text-xl text-[#E8BA00] ", jersey.className)}
                >
                  NO FRIENDS YET
                </span>
              </div>
            )}
          </>
        )}
        <div className="h-32"></div>
      </div>
    </div>
  );
}
