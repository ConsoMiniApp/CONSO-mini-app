import { DialogClose } from "@radix-ui/react-dialog";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import consoleAnimation from "@/public/animations/console-animation.json";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConfirmDialog } from "@/components/app/common/ConfirmDialog";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  AddIcon,
  BackArrow,
  BackIcon,
  CoinSmallIcon,
  DeleteIcon,
  ErrorIcon,
  SuccessIcon,
} from "@/components/ui/icons";
import { useAppContext } from "@/contexts/AppContext";
import { ConnectedConsole } from "@/lib/types";
import ConnectDialogSkeleton from "../ConnectDialogSkeleton";
import { createClient } from "@/utils/supabase/client";
import { calculateGameEmissions } from "@/lib/psn/calculateConsoEmissions";

export function PlaystationConnectedDialog() {
  const supabase = createClient();
  const [consoles, setConsoles] = useState<ConnectedConsole[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, telegramUsername, setUserData } = useAppContext();

  async function handleDelete() {
    const selectedConsoles = consoles.filter((c) => c.selected);
    console.log(selectedConsoles);
    setIsLoading(true);

    // update status of selected consoles to "Disconnected" in supabase
    try {
      const user_consoles = user.connected_consoles.playstation;
      const updatedConsoles = user_consoles.map((c) =>
        selectedConsoles.find(
          (sc) => sc.console_user_identifier === c.console_user_identifier
        )
          ? { ...c, status: "Disconnected" }
          : c
      );

      const { data, error } = await supabase
        .from("users_table")
        .update({
          connected_consoles: {
            ...user.connected_consoles,
            playstation: updatedConsoles,
          },
        })
        .eq("username", telegramUsername);

      if (error) {
        throw error;
      }

      setConsoles(updatedConsoles.filter((c) => c.status === "Mining"));
      toast("Console(s) removed.", {
        className: cn(jersey.className, "text-xl text-white"),
        icon: <SuccessIcon />,
      });
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      toast("Error removing console(s)", {
        className: cn(jersey.className, "text-xl text-white"),
        icon: <ErrorIcon />,
      });
    } finally {
      setIsSelected(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // window.scrollTo(0, 0);
    const connectedConsoles = user.connected_consoles.playstation
      .filter((c) => c.status === "Mining")
      .map((c, index) => ({
        id: index.toString(),
        console_username: c.console_username,
        joined_date: c.joined_date,
        console_user_identifier: c.console_user_identifier,
        conso_bonus: c.conso_bonus,
        status: c.status,
        selected: false,
      }));
    setConsoles(connectedConsoles);
  }, []);

  return (
    <>
      {isLoading ? (
        <ConnectDialogSkeleton />
      ) : (
        <div className="overflow-y-scroll scrollbar-none mt-12 ">
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
                CONNECTED CONSOLE
              </p>

              <p
                className={cn(
                  "text-white text-2xl text-nowrap tracking-wider",
                  jersey.className
                )}
              >
                PlayStation
              </p>
              <Lottie
                className="w-40 mt-[-10px]"
                animationData={consoleAnimation}
              />

              <div className="flex gap-2 justify-center items-center mt-[-26px]">
                <CoinSmallIcon />
                <p
                  className={cn(
                    "text-[#FFE500] text-2xl text-nowrap tracking-wider",
                    jersey.className
                  )}
                >
                  {calculateGameEmissions(consoles)} tokens/day
                </p>
              </div>
            </div>
          </div>

          {/* Mining Status Card */}
          <div className="p-4 mt-4 rounded-3xl shadow-lg bg-white ">
            <div className="flex justify-between px-2">
              <p
                className={cn(
                  handjet.className,
                  "text-xl text-[#7C7C7C] tracking-wider"
                )}
              >
                {" "}
                MINING STATUS
              </p>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger disabled={!isSelected}>
                    <div
                      className={cn(isSelected ? "opacity-100" : "opacity-50")}
                    >
                      <DeleteIcon />
                    </div>
                  </DialogTrigger>
                  {isSelected && (
                    <DialogContent className="h-screen border-none backdrop-blur-md">
                      <ConfirmDialog handleConfirm={handleDelete} />
                    </DialogContent>
                  )}
                </Dialog>
                <div className="flex justify-center items-center">
                  <AddIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-1 mt-3">
              {/* Console Connected Card */}
              {consoles.length > 0 ? (
                consoles.map((console) => (
                  <div className="bg-[#F1F1F1] grid grid-cols-6 rounded-md border-[0.5px] border-black p-4 tracking-wide">
                    <div className="flex flex-col gap-2 col-span-5 ">
                      <p
                        className={cn(
                          ibmPlex700.className,
                          "text-[#DE5EA6] text-xs"
                        )}
                      >
                        Username :{" "}
                        <span
                          className={cn(
                            ibmPlex500.className,
                            "text-xs text-black "
                          )}
                        >
                          {console.console_username.length > 15
                            ? console.console_username.substring(0, 15) + "..."
                            : console.console_username}
                        </span>
                      </p>
                      <p
                        className={cn(
                          ibmPlex700.className,
                          "text-[#DE5EA6] text-xs"
                        )}
                      >
                        Console Type :{" "}
                        <span
                          className={cn(
                            ibmPlex500.className,
                            "text-xs text-black"
                          )}
                        >
                          PS5
                        </span>
                      </p>
                      <p
                        className={cn(
                          ibmPlex700.className,
                          "text-[#DE5EA6] text-xs"
                        )}
                      >
                        Joined Date :{" "}
                        <span
                          className={cn(
                            ibmPlex500.className,
                            "text-xs text-black"
                          )}
                        >
                          {new Date(console.joined_date).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "long", year: "numeric" }
                          )}
                        </span>
                      </p>

                      <p
                        className={cn(
                          ibmPlex700.className,
                          "text-[#DE5EA6] text-xs"
                        )}
                      >
                        CONSO Bonus :{" "}
                        <span
                          className={cn(
                            ibmPlex500.className,
                            "text-xs text-black"
                          )}
                        >
                          {console.conso_bonus}
                        </span>
                      </p>

                      <p
                        className={cn(
                          ibmPlex700.className,
                          "text-[#DE5EA6] text-xs"
                        )}
                      >
                        Status :{" "}
                        <span
                          className={cn(
                            ibmPlex500.className,
                            console.status == "Mining"
                              ? "text-xs text-[#00BA64]"
                              : "text-xs text-[#FF0000]"
                          )}
                        >
                          {console.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-end space-x-2 col-span-1">
                      <Checkbox
                        id="terms"
                        checked={console.selected}
                        onCheckedChange={(state: boolean) => {
                          setIsSelected(state);
                          setConsoles(
                            consoles.map((c) =>
                              c.id === console.id
                                ? { ...c, selected: state }
                                : c
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-32">
                  <p
                    className={cn(
                      ibmPlex500.className,
                      "text-lg text-gray-500"
                    )}
                  >
                    0 active consoles
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 justify-between px-2 mt-3">
              <p
                className={cn(
                  handjet.className,
                  "text-xl text-[#7C7C7C] tracking-wider"
                )}
              >
                {" "}
                REWARDS STRUCTURE
              </p>

              <p
                className={cn(
                  ibmPlex500.className,
                  "text-xs text-black tracking-tighter mb-2"
                )}
              >
                {" "}
                PlayStation Console holders will act as NODES, contributing data
                and mining tokens with a 2.5x BOOST multiplier over the base
                rate.
              </p>
            </div>
          </div>

          {/* Empty Space */}
          <br />
        </div>
      )}
    </>
  );
}
