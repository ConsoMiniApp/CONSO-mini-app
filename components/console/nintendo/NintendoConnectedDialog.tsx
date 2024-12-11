import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import Lottie from "lottie-react";
import consoleAnimation from "@/public/animations/console-animation.json";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const consoleData = [
  {
    id: 1,
    consoleName: "PlayStation",
    joinedDate: "22-03-2020",
    psBoost: "2.5x",
    consoBonus: "25,000",
    status: "Running",
    selected: false,
  },
  {
    id: 2,
    consoleName: "Xbox",
    joinedDate: "22-03-2020",
    psBoost: "2.5x",
    consoBonus: "25,000",
    status: "Running",
    selected: false,
  },
  {
    id: 3,
    consoleName: "Nintendo",
    joinedDate: "22-03-2020",
    psBoost: "2.5x",
    consoBonus: "25,000",
    status: "Running",
    selected: false,
  },
];

export function NintendoConnectedDialog() {
  const [consoles, setConsoles] = useState(consoleData);

  function handleDelete() {
    const selectedConsoles = consoles.filter((c) => c.selected);
    console.log(selectedConsoles);
    setConsoles(consoles.filter((c) => !c.selected));
  }

  return (
    <>
      <div className="overflow-y-scroll scrollbar-none ">
        {/* Top Status Card */}
        <div className="p-4 rounded-3xl border-2 shadow-lg bg-black border-neutral-800">
          <div className="flex justify-between ">
            <DialogClose>
              <Image
                src="/other-logos/back-arrow.svg"
                width={32}
                height={32}
                alt="Back"
              />
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
            <Lottie className="w-32 " animationData={consoleAnimation} />

            <p
              className={cn(
                "text-[#FFE500] text-2xl text-nowrap tracking-wider mt-[-30px] mb-[10px]",
                jersey.className
              )}
            >
              4.5x Boost
            </p>
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
              <Image
                src="/other-logos/delete.svg"
                width={20}
                height={20}
                alt="Delete"
                onClick={() => {
                  console.log("Deleting selected consoles");
                  handleDelete();
                  toast("Console removed.", {
                    className: cn(jersey.className, "text-xl text-white"),
                    style: {
                      background: "#000",
                      color: "#fff",
                    },
                    icon: (
                      <Image
                        src="/toast-logos/success.svg"
                        width={24}
                        height={24}
                        alt="Coin"
                      />
                    ),
                  });
                }}
              />
              <Image
                src="/other-logos/add.svg"
                width={20}
                height={20}
                alt="Add"
                onClick={() => console.log("Add")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 px-1 mt-3">
            {/* Console Connected Card */}
            {consoles.map((console) => (
              <div className="bg-[#F1F1F1] grid grid-cols-6 rounded-md border-[0.5px] border-black p-4 tracking-tighter">
                <div className="flex flex-col gap-2 col-span-5 ">
                  <p
                    className={cn(
                      ibmPlex700.className,
                      "text-[#DE5EA6] text-xs"
                    )}
                  >
                    Console Connected :{" "}
                    <span
                      className={cn(ibmPlex500.className, "text-xs text-black")}
                    >
                      {console.consoleName}
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
                      className={cn(ibmPlex500.className, "text-xs text-black")}
                    >
                      {console.joinedDate}
                    </span>
                  </p>
                  <p
                    className={cn(
                      ibmPlex700.className,
                      "text-[#DE5EA6] text-xs"
                    )}
                  >
                    PS Boost :{" "}
                    <span
                      className={cn(ibmPlex500.className, "text-xs text-black")}
                    >
                      {console.psBoost}
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
                      className={cn(ibmPlex500.className, "text-xs text-black")}
                    >
                      {console.consoBonus}
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
                        "text-xs text-[#00BA64]"
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
                    onCheckedChange={(state: boolean) =>
                      setConsoles(
                        consoles.map((c) =>
                          c.id === console.id ? { ...c, selected: state } : c
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
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
              and mining tokens with a 2.5x BOOST multiplier over the base rate.
            </p>
          </div>
        </div>

        {/* Empty Space */}
        <br />
      </div>
    </>
  );
}
