import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { ibmPlex, ibmPlex500, ibmPlex700, jersey } from "../../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { CustomButtonType, UnclaimedMysteryBox } from "@/lib/types";
import toast from "react-hot-toast";
import { SuccessIcon } from "@/components/ui/icons";
import { mysteryBoxTypes } from "@/lib/constants";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/contexts/AppContext";

export interface ClaimTokenDialogProps {
  mysteryBox: UnclaimedMysteryBox;
  handleConfirm: () => void;
}

export function ClaimTokenDialog({
  mysteryBox,
  handleConfirm,
}: ClaimTokenDialogProps) {
  const supabase = createClient();
  const { telegramUsername, user, setUserData } = useAppContext();

  async function handleClick() {
    handleConfirm();
    // delete mystery box id from users_table.
    const updatedUnclaimedMysteryBoxes = user.unclaimed_mystery_boxes.filter(
      (box) => box.collected_on !== mysteryBox.collected_on
    );
    const { data: updatedUserData, error: updatedUserError } = await supabase
      .from("users_table")
      .update({
        unclaimed_mystery_boxes: updatedUnclaimedMysteryBoxes,
        claimed_mystery_boxes: [...user.claimed_mystery_boxes, mysteryBox.id],
      })
      .eq("username", telegramUsername)
      .select();
    if (updatedUserError) {
      toast.error("Error updating user data.", {
        className: cn(jersey.className, "text-xl text-white mt-10"),
      });
      return;
    }
    setUserData({
      ...user,
      unclaimed_mystery_boxes: updatedUnclaimedMysteryBoxes,
      claimed_mystery_boxes: [...user.claimed_mystery_boxes, mysteryBox.id],
    });

    toast("Claimed Mystery box.", {
      className: cn(jersey.className, "text-xl text-white mt-10"),
      icon: <SuccessIcon />,
    });
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className="bg-white h-[435px] w-[90%] rounded-sm shadow-xl flex flex-col justify-center items-center text-center p-6"
          style={{
            backgroundImage: "url('/pngs/claim-token-bg.png')",
            backgroundSize: "cover",
          }}
        >
          <div className="h-[222px] w-[222px] rounded-lg border-4 border-[#FFE500] bg-[#FFF59D] relative flex justify-center items-center">
            <div className="">
              <Image
                src={mysteryBoxTypes[mysteryBox.id].image}
                alt="Coin"
                width={107}
                height={107}
              />
            </div>
            <div
              className={cn(
                jersey.className,
                "absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 py-1 px-4 bg-[#DE5EA6] rounded-lg border-4 border-white text-white text-4xl"
              )}
            >
              x {mysteryBoxTypes[mysteryBox.id].quantity}
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <DialogClose>
              <CustomButton
                text="CLAIM"
                type={CustomButtonType.SUCCESS_MEDIUM}
                handleClick={handleClick}
              />
            </DialogClose>
          </div>
        </div>
      </div>
    </>
  );
}
