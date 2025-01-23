import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import {
  Coin,
  ConsoleIcon,
  ErrorIcon,
  GameLogo,
  SuccessIcon,
} from "@/components/ui/icons";
import CustomButton from "../common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/contexts/AppContext";
import RetroLoader from "../common/RetroLoader";
import { checkConsoles } from "@/lib/helpers/missions/consoleChecks";
import toast from "react-hot-toast";

interface TaskDrawerProps {
  id: number;
  logo: string;
  name: string;
  description: string;
  coinAmount: number;
}

export function TaskDrawer({
  id,
  logo,
  name,
  description,
  coinAmount,
}: TaskDrawerProps) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [checkPerformed, setCheckPerformed] = useState(false);
  const { telegramUsername } = useAppContext();

  async function handleConsoleCheck() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("users_table")
        .select("connected_consoles")
        .eq("username", telegramUsername)
        .single();

      if (data) {
        setIsLoading(false);
        const result = checkConsoles(id, data.connected_consoles);
        setCheckPerformed(true);
        if (result) {
          toast.success("Congrats! Mission Completed.", {
            className: cn(jersey.className, "text-xl text-white"),
            icon: <SuccessIcon />,
          });
          // update user data
        } else {
          toast.error("Mission Not Completed yet.", {
            className: cn(jersey.className, "text-xl text-white"),
            icon: <ErrorIcon />,
          });
        }
      }
      if (error) {
        setIsLoading(false);
        setCheckPerformed(true);
        toast.error("There was an error", {
          className: cn(jersey.className, "text-xl text-white"),
        });
        console.log(error);
      }
    } catch (error) {
      toast.error("There was an error", {
        className: cn(jersey.className, "text-xl text-white"),
      });

      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="overflow-y-scroll scrollbar-none p-4 ">
        {/* Top Section */}
        <div className="flex justify-between px-2">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            CONSO MISSIONS
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 px-2">
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <Image src={logo} alt="logo" height={100} width={100} />
            <p className={cn("text-3xl ", jersey.className)}>{name}</p>
            <p
              className={cn(
                "text-lg text-center text-gray-500 ",
                ibmPlex500.className
              )}
            >
              {description}
            </p>
            <div className="flex gap-4 items-center">
              <Coin />
              <p className={cn("text-4xl", jersey.className)}>+{coinAmount}</p>
            </div>
            {isLoading ? (
              <RetroLoader />
            ) : checkPerformed ? (
              // TO DO
              <p className={cn("text-2xl ", jersey.className)}>
                Check Completed{" "}
              </p>
            ) : (
              <CustomButton
                text={"Check"}
                type={CustomButtonType.SUCCESS_MEDIUM}
                handleClick={() => handleConsoleCheck()}
              ></CustomButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
