"use client";
import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import CustomButton from "./app/common/CustomButton";
import {
  Character,
  CustomButtonType,
  Jetpack,
  UnclaimedMysteryBox,
} from "@/lib/types";
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
// import DynamicBackground from "./play/BackgroundParallax";
import { useAppContext } from "@/contexts/AppContext";
import { isLandscape } from "@/lib/helpers/checkLandscape";
import rotateScreenAnimation from "@/public/animations/rotate-screen-animation.json";
import Lottie from "lottie-react";
import { initialCharacters, initialJetpacks } from "@/lib/constants";
import { getSelectedCharacter } from "@/lib/helpers/play/getSelectedCharacter";
import { getSelectedJetpack } from "@/lib/helpers/play/getSelectedJetpack";
import { checkHighScore } from "@/lib/helpers/play/checkHighScore";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function Play() {
  const supabase = createClient();
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [jetpacks, setJetpacks] = useState<Jetpack[]>(initialJetpacks);

  const { user, telegramUsername, setUserData } = useAppContext();

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const [isDeviceLandscape, setIsDeviceLandscape] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { setNavigationBarHidden } = useAppContext();

  // game functions
  function getGameInitSettings() {
    const gameInitSettings: GameInitSettings = {
      environment: EnvironmentOptionsType.Forest,
      character: getSelectedCharacter(characters),
      jetpack: getSelectedJetpack(jetpacks),
      mysteryBoxes: [
        {
          id: "1",
          name: "mysteryBox1",
          link: "this_will_be_link",
          timestamp: 5, // change to 35
        },
      ],
      powerUps: [
        { character: CharacterOptionsType.Flash, time: 10, timestamp: 10 },
        // { character: CharacterOptionsType.Angel, time: 5, timestamp: 35 },
      ],
    };
    return gameInitSettings;
  }

  const handleGameLoading = () => {
    // setNavigationBarHidden(true);
    setGameLoaded(true);
  };

  // update user data in users_table when a game session ends : GameOver.ts
  const updateUserData = async (
    gameTokensCollected: number,
    gameMysteryBoxesCollected: UnclaimedMysteryBox[],
    gameDistance: number
  ) => {
    console.log("collectedPoints", gameTokensCollected);
    console.log("collectedMysteryBoxes", gameMysteryBoxesCollected);
    const isHighScore = checkHighScore(gameDistance, user.game_high_score);
    // update user data in users_table
    const { data: updatedUserData, error: updatedUserError } = await supabase
      .from("users_table")
      .update({
        game_assets: {
          ...user.game_assets,
          potions: user.game_assets.potions + gameTokensCollected,
        },
        unclaimed_mystery_boxes: [
          ...user.unclaimed_mystery_boxes,
          ...gameMysteryBoxesCollected,
        ],
        game_total_distance: user.game_total_distance + gameDistance,
        game_high_score: isHighScore ? gameDistance : user.game_high_score,
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
      game_assets: {
        ...user.game_assets,
        potions: user.game_assets.potions + gameTokensCollected,
      },
      unclaimed_mystery_boxes: [
        ...user.unclaimed_mystery_boxes,
        ...gameMysteryBoxesCollected,
      ],
      game_total_distance: user.game_total_distance + gameDistance,
      game_high_score: isHighScore ? gameDistance : user.game_high_score,
    });
  };

  // TO DO : add potions to user data
  // const usePotions = () => {
  //   const { user, setUserData } = useAppContext();
  //   const handlePotionClick = () => {
  //     setUserData({
  //       ...user,
  //       game_assets: {
  //         ...user.game_assets,
  //         potions: user.game_assets.potions + 1,
  //       },
  //     });
  //   };
  //   return handlePotionClick;
  // };

  const handleGameExit = () => {
    setGameLoaded(false);
    //@ts-ignore
    const tg = window.Telegram.WebApp;
    tg.unlockOrientation();
  };

  function switchJetpacks(character: string) {
    setJetpacks((prev) =>
      prev.map((jetpack) => {
        return {
          ...jetpack,
          image: `/play-logos/${character}-${jetpack.key}.gif`,
        };
      })
    );
  }

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

  // load characters and jetpacks in shop section
  useEffect(() => {
    // console.log(user.game_assets);

    // Mark owned characters
    const updatedCharacters = initialCharacters.map((char) => ({
      ...char,
      owned:
        user.game_assets.characters?.some(
          (character) => character === char.key
        ) || char.owned,
    }));

    // Mark owned jetpacks
    const updatedJetpacks = initialJetpacks.map((jet) => ({
      ...jet,
      owned:
        user.game_assets.jetpacks?.some((jetpack) => jetpack === jet.key) ||
        jet.owned,
    }));

    // Select stored character
    let selectedCharacter = localStorage.getItem("selectedCharacter");
    if (!selectedCharacter) {
      localStorage.setItem("selectedCharacter", updatedCharacters[0].key);
      selectedCharacter = updatedCharacters[0].key;
    }
    const finalCharacters = updatedCharacters.map((char) => ({
      ...char,
      selected: char.owned && char.key === selectedCharacter,
    }));

    // Select stored jetpack
    let selectedJetpack = localStorage.getItem("selectedJetpack");
    if (!selectedJetpack) {
      localStorage.setItem("selectedJetpack", updatedJetpacks[0].key);
      selectedJetpack = updatedJetpacks[0].key;
    }
    const finalJetpacks = updatedJetpacks.map((jet) => ({
      ...jet,
      selected: jet.owned && jet.key === selectedJetpack,
    }));

    setCharacters(finalCharacters);
    setJetpacks(finalJetpacks);

    switchJetpacks(selectedCharacter || "og");
  }, [user]);

  return (
    <div className="">
      {gameLoaded ? (
        isDeviceLandscape ? (
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <PhaserGame
              ref={phaserRef}
              gameInitSettings={getGameInitSettings()}
              updateUserData={updateUserData}
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
                    <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2 relative">
                      {" "}
                      <MissionsLogo />{" "}
                      <p
                        className={cn(jersey.className, "text-2xl text-white")}
                      >
                        Missions
                      </p>
                      {/* Add a red notification dot */}
                      {user.show_conso_game_mission_notif ? (
                        <div
                          className={cn(
                            "absolute top-[-5px] right-[-4px] h-3 w-3 rounded-full bg-red-600 text-sm text-white flex justify-center items-center ",
                            jersey.className
                          )}
                        ></div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <MissionsDrawer
                      completedConsoGameMissions={
                        user.completed_conso_game_missions
                      }
                    />
                  </DrawerContent>
                </Drawer>

                <Drawer>
                  <DrawerTrigger>
                    <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2 relative">
                      {" "}
                      <MysteryBoxLogo />{" "}
                      <p
                        className={cn(jersey.className, "text-2xl text-white")}
                      >
                        Rewards
                      </p>
                      {user.unclaimed_mystery_boxes.length > 0 && (
                        <div
                          className={cn(
                            "absolute top-[-5px] right-[-4px] h-3 w-3 rounded-full bg-red-600 text-sm text-white flex justify-center items-center p-2",
                            jersey.className
                          )}
                        >
                          {user.unclaimed_mystery_boxes.length}
                        </div>
                      )}
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="">
                    <MysteryBoxDrawer
                      unclaimedMysteryBoxes={user.unclaimed_mystery_boxes}
                      claimedMysteryBoxes={user.claimed_mystery_boxes}
                    />
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
                    <ShopDrawer
                      characters={characters}
                      jetpacks={jetpacks}
                      setCharacters={setCharacters}
                      setJetpacks={setJetpacks}
                      switchJetpacks={switchJetpacks}
                    />
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
                    {user.game_high_score.toLocaleString()} m
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
                    {user.game_total_distance.toLocaleString()} m
                  </p>
                </div>

                <div className="bg-black bg-opacity-40 rounded-md p-2 flex items-center justify-center gap-2">
                  {" "}
                  <PotionLogo />{" "}
                  <p className={cn(jersey.className, "text-2xl text-white")}>
                    x {user.game_assets.potions}
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
