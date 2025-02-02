import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ClaimMysteryBoxDialog } from "../common/ClaimMysteryBoxDialog";
import { UnclaimedMysteryBox } from "@/lib/types";
import { mysteryBoxTypes } from "@/lib/constants";

interface MysteryBoxDrawerProps {
  unclaimedMysteryBoxes: UnclaimedMysteryBox[];
  claimedMysteryBoxes: number[];
}

export function MysteryBoxDrawer({
  unclaimedMysteryBoxes,
  claimedMysteryBoxes,
}: MysteryBoxDrawerProps) {
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
            MYSTERY BOX
          </p>
        </div>

        {/* Sub Heading */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 px-2">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            Earn CONSO tokens by contributing to the network in various ways.
          </p>
        </div>

        {/* Unclaimed boxes */}
        <div className="flex flex-col justify-between px-2 mt-4 ">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            UNCLAIMED
          </p>

          {unclaimedMysteryBoxes.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 mt-4">
              {unclaimedMysteryBoxes.map((box, index) => (
                <Dialog key={index}>
                  <DialogTrigger>
                    <div className="border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 ">
                      <p
                        className={cn(
                          handjet.className,
                          "text-xs text-black tracking-wider"
                        )}
                      >
                        {new Date(box.collected_on).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                          }
                        )}
                      </p>
                      <Image
                        src={"/play-logos/mystery-box.gif"}
                        alt="Mystery Box"
                        width={47}
                        height={47}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="h-screen border-none backdrop-blur-md">
                    <ClaimMysteryBoxDialog
                      mysteryBox={box}
                      handleConfirm={() => console.log("claimed mystery box")}
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "text-lg flex justify-center items-center p-8 text-gray-500 tracking-wider",
                handjet.className
              )}
            >
              No unclaimed mystery boxes.
            </div>
          )}
        </div>

        {/* Claimed boxes */}
        <div className="flex flex-col justify-between px-2 mt-4">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            CLAIMED BOXES
          </p>
          {claimedMysteryBoxes.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 mt-4">
              {claimedMysteryBoxes.map((box: number) => (
                <div key={box} className={mysteryBoxTypes[box].className}>
                  <p
                    className={cn(
                      handjet.className,
                      "text-xs text-black tracking-widest"
                    )}
                  >
                    {mysteryBoxTypes[box].title}
                  </p>
                  <Image
                    src={mysteryBoxTypes[box].image}
                    alt="potion"
                    width={47}
                    height={47}
                  />

                  <div
                    className={cn(
                      jersey.className,
                      "absolute bottom-[-18px] left-1/2 transform -translate-x-1/2  px-2 bg-[#DE5EA6] rounded-lg border-2 border-white text-white text-[18px] w-[60%] text-center"
                    )}
                  >
                    x {mysteryBoxTypes[box].quantity}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "text-lg flex justify-center items-center p-8 text-gray-500 tracking-wider",
                handjet.className
              )}
            >
              No claimed mystery boxes.
            </div>
          )}
        </div>
      </div>

      <br />
      <br />
    </>
  );
}
