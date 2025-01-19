"use client";
import { useEffect, useRef, useState } from "react";
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
import { MissionsDrawer } from "./app/play/MissionsDrawer";
import { MysteryBoxDrawer } from "./app/play/MysteryBoxDrawer";
import { ShopDrawer } from "./app/play/ShopDrawer";
import {
  CharacterOptionsType,
  EnvironmentOptionsType,
  GameInitSettings,
  JetpackOptionsType,
} from "./game/types";
import BackgroundParallaxEffect from "./play/BackgroundParallax";
import DynamicBackground from "./play/BackgroundParallax";
import { useAppContext } from "@/contexts/AppContext";

export default function Play() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const [isDeviceLandscape, setIsDeviceLandscape] = useState("abc");

  const { setNavigationBarHidden } = useAppContext();

  const gameInitSettings: GameInitSettings = {
    environment: EnvironmentOptionsType.Forest,
    character: CharacterOptionsType.Og,
    jetpack: JetpackOptionsType.Jetpack,
  };

  const handleGameLoading = () => {
    // setIsLoading(true);
    setTimeout(() => {
      // setIsLoading(false);
      setNavigationBarHidden(true);
      setGameLoaded(true);
    }, 2000);
  };

  // add an event listener to check if the device is in landscape mode Telegram.WebApp.onEvent(eventType, eventHandler)
  //@ts-ignore
  // window.Telegram.WebApp.onEvent("deviceOrientationChanged", (event) => {
  //   setIsDeviceLandscape(event);
  // });

  useEffect(() => {
    //@ts-ignore
    const tg = window.Telegram.WebApp;
    tg.unlockOrientation();
    const handleEvent = (eventData: any) => {
      console.log("Event fired:", eventData);
      setIsDeviceLandscape("changed");
    };

    // Subscribe to the event
    //@ts-ignore
    if (tg) {
      //@ts-ignore
      tg.onEvent("viewportChanged", handleEvent);
    }

    // Cleanup the subscription when the component unmounts
    return () => {
      //@ts-ignore
      if (tg) {
        //@ts-ignore
        tg.offEvent("viewportChanged", handleEvent); // Use the appropriate method to unsubscribe
      }
    };
  }, []);

  return (
    <div className="">
      {isLoading && (
        <div
          className={cn(
            "text-6xl text-white flex justify-center items-center h-screen",
            jersey.className
          )}
        >
          LOADING ...
        </div>
      )}

      {gameLoaded ? (
        <div className="h-screen">
          <PhaserGame ref={phaserRef} gameInitSettings={gameInitSettings} />
        </div>
      ) : (
        <div className="">
          {/* Add parallex div here */}
          <DynamicBackground />
          <Image
            src={"/videos/player.gif"}
            alt="player"
            className="object-cover absolute bottom-0 mb-3 ml-14 bg-none pb-36 "
            width={100}
            height={100}
          ></Image>
          <div className="flex flex-col p-4 z-10 absolute top-20 left-0 right-0 overflow-hidden ">
            <div className="flex justify-center items-center mt-4">
              <GameLogo />
            </div>

            <div className="grid grid-cols-2 mt-10">
              <div className="flex flex-col gap-4 items-start">
                <Drawer>
                  <DrawerTrigger>
                    <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                      {" "}
                      <MissionsLogo />{" "}
                      <p
                        className={cn(jersey.className, "text-2xl text-white")}
                      >
                        Missions
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <MissionsDrawer />
                  </DrawerContent>
                </Drawer>

                <Drawer>
                  <DrawerTrigger>
                    <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                      {" "}
                      <MysteryBoxLogo />{" "}
                      <p
                        className={cn(jersey.className, "text-2xl text-white")}
                      >
                        Rewards
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="">
                    <MysteryBoxDrawer />
                  </DrawerContent>
                </Drawer>

                <Drawer>
                  <DrawerTrigger>
                    <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                      {" "}
                      <ShopSectionLogo />{" "}
                      <p
                        className={cn(jersey.className, "text-2xl text-white")}
                      >
                        Shop
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <ShopDrawer />
                  </DrawerContent>
                </Drawer>
              </div>

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
                handleClick={() => {
                  handleGameLoading();
                  // setNavigationBarHidden(true);
                  // setGameLoaded(true);
                }}
                text="TAP TO PLAY"
              ></CustomButton>
              {/* <p>{isDeviceLandscape.toString()}</p> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
