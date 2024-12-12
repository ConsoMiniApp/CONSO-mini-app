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
import {
  ArrowRightIcon,
  Boost,
  Close,
  ConsoleIcon,
  GameLogo,
  MissionsLogo,
  MysteryBoxLogo,
  PotionLogo,
  ShopSectionLogo,
} from "./ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Play() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    console.log("Current Scene: ", scene);
  };

  const handleVideoEnd = () => {
    console.log("Video Ended");
  };

  return (
    <div className="">
      {" "}
      <video
        src={"/videos/mars.mp4"}
        controls={false}
        loop={true}
        autoPlay
        playsInline
        muted
        onEnded={handleVideoEnd}
        className="object-cover absolute top-0 h-screen  pb-24 z-[-1]"
        // onLoadedMetadata={enterFullScreen}
      ></video>
      <Image
        src={"/videos/player.gif"}
        alt="player"
        className="object-cover absolute bottom-0 mb-3 ml-10 bg-none pb-32"
        width={100}
        height={100}
      ></Image>
      <div className="flex flex-col p-4">
        <div className="flex justify-center items-center mt-4">
          <GameLogo />
        </div>

        <div className="grid grid-cols-2 mt-10">
          {/* Left Side Items */}
          <div className="flex flex-col gap-4 items-start">
            <Drawer>
              <DrawerTrigger>
                <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                  {" "}
                  <MissionsLogo />{" "}
                  <p className={cn(jersey.className, "text-2xl text-white")}>
                    Missions
                  </p>
                </div>
              </DrawerTrigger>
              <DrawerContent>GAME MISSIONS</DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger>
                <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                  {" "}
                  <MysteryBoxLogo />{" "}
                  <p className={cn(jersey.className, "text-2xl text-white")}>
                    Rewards
                  </p>
                </div>
              </DrawerTrigger>
              <DrawerContent>MYSTERY BOXES</DrawerContent>
            </Drawer>

            <Drawer>
              <DrawerTrigger>
                <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                  {" "}
                  <ShopSectionLogo />{" "}
                  <p className={cn(jersey.className, "text-2xl text-white")}>
                    Shop
                  </p>
                </div>
              </DrawerTrigger>
              <DrawerContent>SHOP ACCESSORIES</DrawerContent>
            </Drawer>
          </div>
          {/* Right Side Items */}
          <div className="flex flex-col gap-4 items-end">
            <div className="bg-black bg-opacity-40 rounded-md p-2 flex flex-col items-left">
              {" "}
              <p
                className={cn(
                  handjet.className,
                  "text-sm text-white tracking-wider text-left"
                )}
              >
                HIGH SCORE
              </p>
              <p className={cn(jersey.className, "text-2xl text-white")}>
                5,24,56,234 m
              </p>
            </div>

            <div className="bg-black bg-opacity-40 rounded-md p-2 flex flex-col items-left ">
              {" "}
              <p
                className={cn(
                  handjet.className,
                  "text-sm text-white tracking-wider"
                )}
              >
                TOTAL DISTANCE
              </p>
              <p className={cn(jersey.className, "text-2xl text-white")}>
                5,24,56,234 m
              </p>
            </div>

            <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
              {" "}
              <PotionLogo />{" "}
              <p className={cn(jersey.className, "text-2xl text-white")}>
                x 24
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <CustomButton
            type={CustomButtonType.PRIMARY_MEDIUM}
            handleClick={() => {}}
            text="TAP TO PLAY"
          ></CustomButton>
        </div>

        <Drawer>
          <DrawerTrigger></DrawerTrigger>
          <DrawerContent></DrawerContent>
        </Drawer>
      </div>
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
