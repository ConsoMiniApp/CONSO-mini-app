"use client";
import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import CustomButton from "./app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "./ui/fonts";
import { ArrowRightIcon, Boost, Close, ConsoleIcon } from "./ui/icons";
import { cn } from "@/lib/utils";

export default function Play() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    console.log("Current Scene: ", scene);
  };
  return (
    <div className="flex justify-center items-center p-20">
      <Drawer>
        <DrawerTrigger>
          <CustomButton
            type={CustomButtonType.PRIMARY}
            handleClick={() => {}}
            text="TEST"
          ></CustomButton>
        </DrawerTrigger>
        <DrawerContent>
          <div className="p-4">
            {/* Top Section */}
            <div className="flex justify-between">
              <p
                className={cn(
                  handjet.className,
                  "text-xl text-[#7C7C7C] tracking-wider"
                )}
              >
                {" "}
                CONSO REWARD SYSTEM
              </p>
              {/* <DrawerClose>
                <a>
                  <Close />
                </a>
              </DrawerClose> */}
            </div>

            {/* Sub Heading */}
            <div className="flex flex-col space-y-4 text-black mt-2 mr-2 ">
              <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
                {" "}
                Earn CONSO tokens by contributing to the network in various
                ways. Check out the mining rates based on your engagement level:
              </p>

              <div className="ml-1">
                {/* Console Info */}
                <div>
                  <p
                    className={cn(
                      ibmPlex700.className,
                      "text-xs tracking-tight flex items-center justify-left gap-2"
                    )}
                  >
                    {" "}
                    <div className="flex justify-center items-center">
                      <ConsoleIcon />
                    </div>
                    <p
                      className={cn(
                        jersey.className,
                        "text-[#DE5EA6] text-xl tracking-wider"
                      )}
                    >
                      CONSOLES:
                      <span
                        className={cn(
                          jersey.className,
                          "text-[#A08F00] text-xl tracking-wider"
                        )}
                      >
                        {" "}
                        The Data Providers
                      </span>
                    </p>
                  </p>
                  <p
                    className={cn(
                      ibmPlex500.className,
                      "text-xs tracking-tight mt-1 flex gap-2 items-start"
                    )}
                  >
                    <div>
                      <ArrowRightIcon />
                    </div>
                    <p>
                      Connected consoles act as data providers, boosting mining
                      rates and enriching the ecosystem.
                    </p>
                  </p>
                </div>
                <div className="mt-3">
                  <p
                    className={cn(
                      ibmPlex700.className,
                      "text-xs tracking-tight flex items-center justify-left gap-2 "
                    )}
                  >
                    {" "}
                    <div className="flex justify-center items-center">
                      {" "}
                      <Boost />
                    </div>
                    <p
                      className={cn(
                        jersey.className,
                        "text-[#DE5EA6] text-xl tracking-wider"
                      )}
                    >
                      ACTIVE ENGAGEMENT:
                      <span
                        className={cn(
                          jersey.className,
                          "text-[#A08F00] text-xl tracking-wider"
                        )}
                      >
                        {" "}
                        Mini App Users
                      </span>
                    </p>
                  </p>
                  <p
                    className={cn(
                      ibmPlex500.className,
                      "text-xs tracking-tight mt-1 flex items-start gap-2"
                    )}
                  >
                    <div>
                      <ArrowRightIcon />
                    </div>
                    <p>
                      Earn extra by contributing through gaming, tapping, and
                      watching ads.
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

//   {/* <PhaserGame ref={phaserRef} currentActiveScene={currentScene} /> */}
//   {/* <div
//         className={cn(
//           "text-6xl text-white text-center mt-40",
//           jersey.className
//         )}
//       >
//         COMING SOON ...
//       </div> */}
