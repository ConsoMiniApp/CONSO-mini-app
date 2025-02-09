import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { ibmPlex, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import toast from "react-hot-toast";
import { ErrorIcon, SuccessIcon } from "@/components/ui/icons";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

export function NicknameInput({
  setAcceptNickname,
}: {
  setAcceptNickname: (value: boolean) => void;
}) {
  const supabase = createClient();
  const [nickname, setNickname] = useState("");
  const { telegramUsername, referralCode, user, setUserData } = useAppContext();

  async function handleClick() {
    console.log("Setting your conso nickname");
    try {
      const { data, error } = await supabase
        .from("users_table")
        .update({ nickname: nickname })
        .eq("username", telegramUsername)
        .select();

      if (error) {
        throw error;
      }

      // if referral code is present, update the invite_table : NOT NEEDED HANDLED BY BOT SERVER
      // if (referralCode !== "") {
      //   // check if the user is already a referee
      //   const { data: refereeData, error: refereeError } = await supabase
      //     .from("invite_table")
      //     .select("referee_username")
      //     .eq("referral_username", telegramUsername)
      //     .single();

      //   if (refereeError) {
      //     console.error("Error fetching referee:", refereeError);
      //     throw refereeError;
      //   }

      //   if (refereeData.referee_username) {
      //     toast("You are already a referee.", {
      //       className: cn(jersey.className, "text-xl text-white mt-10"),
      //       icon: <ErrorIcon />,
      //     });
      //     return;
      //   } else {
      //     // add the user to the referee in invite_table
      //     const { data: refereeData, error: refereeError } = await supabase
      //       .from("invite_table")
      //       .insert([
      //         {
      //           referral_code: referralCode,
      //           referee_username: telegramUsername,
      //           referee: {
      //             nickname: nickname,
      //             user_points: user.user_points,
      //             game_total_distance: 0,
      //             connected_consoles: [],
      //           },
      //         },
      //       ]);

      //     if (refereeError) {
      //       throw refereeError;
      //     }
      //     console.log("Added referee to invite_table", refereeData);
      //   }
      // }

      setAcceptNickname(false);

      toast("Nickname added.", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
        icon: <SuccessIcon />,
      });

      setUserData({
        ...user,
        nickname: nickname,
      });
    } catch (error) {
      console.error("Error adding nickname:", error);
      toast.error("There was an error.", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
        icon: <ErrorIcon />,
      });
    }
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white h-60 w-[90%] rounded-md shadow-xl flex flex-col justify-center items-center text-center p-6">
          <p className={cn(jersey.className, "text-2xl mb-2")}>
            Enter your nickname
          </p>

          <p className={cn(ibmPlex.className, "text-xs mb-8")}>
            You can change it later in settings
          </p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <input
              type="text"
              required
              placeholder="YOUR_NICKNAME"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={cn(
                "border-2 border-gray-400 bg-[#D7D7D7] rounded-lg p-2 text-xs tracking-wider w-full",
                ibmPlex500.className
              )}
            />

            <div className="flex justify-center mt-2">
              <DialogClose>
                <CustomButton
                  text="SAVE"
                  type={CustomButtonType.SUCCESS}
                  handleClick={handleClick}
                />
              </DialogClose>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
