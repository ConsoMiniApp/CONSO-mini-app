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
  const { telegramUsername, referralCode, user } = useAppContext();

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

      // if referral code is present, update the referral code
      if (referralCode !== "") {
        // Fetch the current referees array from the invite_table for this referral code
        const { data: currentData, error: fetchError } = await supabase
          .from("invite_table")
          .select("referees")
          .eq("referral_code", referralCode)
          .single();

        if (fetchError) {
          console.error("Error fetching referees:", fetchError);
          throw fetchError;
        }

        // Append the new referee to the current referees array
        const updatedReferees = [
          ...(currentData.referees || []),
          {
            nickname: nickname,
            username: telegramUsername,
            user_points: user.user_points,
            connected_consoles: [],
          },
        ];

        // Update the referees array in the invite_table
        const { data: updateData, error: updateError } = await supabase
          .from("invite_table")
          .update({ referees: updatedReferees })
          .eq("username", telegramUsername);

        if (updateError) {
          throw updateError;
        }

        console.log("Updated referees:", updateData);
      }

      setAcceptNickname(false);

      toast("Nickname added.", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
        icon: <SuccessIcon />,
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
