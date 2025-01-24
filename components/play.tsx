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
  RotateScreenIcon,
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
import DynamicBackground from "./play/BackgroundParallax";
import { useAppContext } from "@/contexts/AppContext";
import { isLandscape } from "@/lib/helpers/checkLandscape";
import rotateScreenAnimation from "@/public/animations/rotate-screen-animation.json";
import Lottie from "lottie-react";

export default function Play() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { user } = useAppContext();

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const [isDeviceLandscape, setIsDeviceLandscape] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { setNavigationBarHidden } = useAppContext();

  const gameInitSettings: GameInitSettings = {
    environment: EnvironmentOptionsType.Forest,
    character: CharacterOptionsType.Og,
    jetpack: JetpackOptionsType.Jetpack,
    mysteryBoxes: [
      {
        id: "1",
        name: "mysteryBox1",
        link: "this_will_be_link",
        timestamp: 5, // change to 35
      },
    ],
    powerUps: [
      { character: CharacterOptionsType.Flash, time: 5, timestamp: 10 },
      // { character: CharacterOptionsType.Angel, time: 5, timestamp: 35 },
    ],
  };

  const handleGameLoading = () => {
    // setNavigationBarHidden(true);
    setGameLoaded(true);
  };

  const handleGameExit = () => {
    // setNavigationBarHidden(false);
    setGameLoaded(false);
  };

  useEffect(() => {
    //@ts-ignore
    const tg = window.Telegram.WebApp;
    tg.unlockOrientation();
    const handleViewportChanged = (eventData: any) => {
      // get height and width of view port
      const width = window.visualViewport?.width || window.innerWidth;
      const height = window.visualViewport?.height || window.innerHeight;
      if (isLandscape(height, width)) {
        tg.lockOrientation();
        setHeight(height);
        setWidth(width);
        setIsDeviceLandscape(true);
        setNavigationBarHidden(true);
      } else {
        tg.unlockOrientation();
        setHeight(height);
        setWidth(width);
        setIsDeviceLandscape(false);
        setNavigationBarHidden(false);
      }
    };

    // Subscribe to the event
    //@ts-ignore
    if (tg) {
      //@ts-ignore
      window.addEventListener("resize", handleViewportChanged);
    }

    // Cleanup the subscription when the component unmounts
    return () => {
      //@ts-ignore
      if (tg) {
        //@ts-ignore
        window.addEventListener("resize", handleViewportChanged); // Use the appropriate method to unsubscribe
      }
    };
  }, []);

  return (
    <div className="">
      {gameLoaded ? (
        isDeviceLandscape ? (
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <PhaserGame
              ref={phaserRef}
              gameInitSettings={gameInitSettings}
              exitGame={handleGameExit}
            />
          </div>
        ) : (
          <div className="absolute flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 ">
            <div className="flex w-52">
              <Lottie className=" " animationData={rotateScreenAnimation} />
            </div>
            <p
              className={cn(
                "text-2xl text-white tracking-widest",
                handjet.className
              )}
            >
              {" "}
              Please Rotate Screen
            </p>
          </div>
        )
      ) : isDeviceLandscape ? (
        <div className="absolute flex flex-col items-center justify-center top-0 left-0 right-0 bottom-0 ">
          <div className="flex w-52">
            <Lottie className=" " animationData={rotateScreenAnimation} />
          </div>
          <p
            className={cn(
              "text-2xl text-white tracking-widest",
              handjet.className
            )}
          >
            {" "}
            Please Rotate Screen
          </p>
        </div>
      ) : (
        <div className="">
          {/* Add parallex div here */}
          {/* <DynamicBackground /> */}
          <video
            src={"/videos/player-video.mp4"}
            controls={false}
            loop={true}
            autoPlay
            playsInline
            muted
            // onEnded={handleVideoEnd}
            onCanPlayThrough={handleVideoLoad}
            className="object-cover absolute top-0 h-screen pb-24 "
          ></video>
          <Image
            src={"/videos/player.gif"}
            alt="player"
            className="object-cover absolute bottom-0 mb-3 ml-14 bg-none pb-36 z-2 "
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
                    {user.game_high_score} m
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
                    {user.game_total_distance} m
                  </p>
                </div>

                <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                  {" "}
                  <PotionLogo />{" "}
                  <p className={cn(jersey.className, "text-2xl text-white")}>
                    x 0
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <CustomButton
                type={CustomButtonType.PRIMARY_MEDIUM}
                handleClick={() => {
                  handleGameLoading();
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
