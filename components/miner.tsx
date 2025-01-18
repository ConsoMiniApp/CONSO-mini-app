"use client";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { handjet, jersey } from "./ui/fonts";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { XboxConnectDialog } from "./console/xbox/XboxConnectDialog";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { PlayStationConnectDialog } from "./console/psn/PlaystationConnectDialog";
import { NintendoConnectDialog } from "./console/nintendo/NintendoConnectDialog";
import { SteamConnectDialog } from "./console/steam/SteamConnectDialog";
import { BitboyConnectDialog } from "./console/bitboy/BitboyConnectDialog";
import { SuiConnectDialog } from "./console/sui/SuiConnectDialog";
import { AdvertisementDialog } from "./app/miner/AdvertisementDialog";
import { useContext, useEffect, useState } from "react";
import { InfoDialog } from "./app/miner/InfoDialog";
import { useAppContext } from "@/contexts/AppContext";
import { TermsDisclaimer } from "./app/miner/TermsAndConditionsDialog";
import { AdvertisementDialogV2 } from "./app/miner/AdvertisementDialogV2";
import { PlaystationConnectedDialog } from "./console/psn/PlaystationConnectedDialog";
import { XboxConnectedDialog } from "./console/xbox/XboxConnectedDialog";
import { NintendoConnectedDialog } from "./console/nintendo/NintendoConnectedDialog";
import { SteamConnectedDialog } from "./console/steam/SteamConnectedDialog";
import { BitboyConnectedDialog } from "./console/bitboy/BitboyConnectedDialog";
import { SuiConnectedDialog } from "./console/sui/SuiConnectedDialog";
import { Howl } from "howler";
import toast from "react-hot-toast";
import CountUp from "react-countup";
import {
  BitboyPixelatedLogo,
  Boost,
  Coin,
  CoinSmallIcon,
  ConsoleIcon,
  InfoIcon,
  NintendoPixelatedLogo,
  PlaystationPixelatedLogo,
  SoundOff,
  SoundOn,
  SteamPixelatedLogo,
  SuiPixelatedLogo,
  TapIcon,
  VideoPlayIcon,
  Wallet,
  WaveIcon,
  XboxPixelatedLogo,
} from "./ui/icons";

import { createClient } from "@/utils/supabase/client";
import { NicknameInput } from "./app/miner/NicknameInput";
import { MinerTabSkeleton } from "./app/miner/MinerTabSkeleton";
import {
  getConnectButtons,
  defaultConnectButtons,
} from "@/lib/helpers/getConnectButtons";

const videoSrc = "/videos/ad.mp4";
const advertiserInfo = {
  title: "EigenLayer",
  description: "Shared security to hyperscale ethereum",
  link: "https://eigenlayer.com",
  logoUrl: "/pngs/eigenlayer.png",
  bgImageUrl: "/pngs/eigenlayer-bg.png",
};

export default function Miner() {
  const supabase = createClient();
  const [tapClass, setTapClass] = useState("inline-block ");
  const [soundClass, setSoundClass] = useState("inline-block ");
  const [mute, setMute] = useState<boolean>(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [acceptNickname, setAcceptNickname] = useState(true);
  const {
    pointBalance,
    setPointBalance,
    startPointBalance,
    setStartPointBalance,
    user,
    setUserData,
    telegramUsername,
  } = useAppContext();

  const [connectButtons, setConnectButtons] = useState(defaultConnectButtons);

  const [connectSectionCollapsed, setConnectSectionCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isTapping, setIsTapping] = useState(false);

  // sounds
  const [tapSound, setTapSound] = useState<Howl>();
  const [bgMinerSound, setBgMinerSound] = useState<Howl>();
  const [infoOpenSound, setInfoOpenSound] = useState<Howl>();
  const [coinsCreditedSound, setCoinsCreditedSound] = useState<Howl>();

  const handlePlayStationConnect = () => {
    console.log("Connecting PlayStation");
  };

  const handlePlayStationConnected = () => {
    console.log("Show Conneced Dialog");
  };

  const handleXboxConnect = () => {
    console.log("Connecting Xbox");
  };

  const handleXboxConnected = () => {
    console.log("Connecting Xbox");
  };

  const handleNintendoConnect = () => {
    console.log("Connecting Nintendo");
  };

  const handleNintendoConnected = () => {
    console.log("Connecting Nintendo");
  };

  const handleSteamConnect = () => {
    console.log("Connecting Steam");
  };

  const handleSteamConnected = () => {
    console.log("Connecting Steam");
  };

  const handleBitboyConnect = () => {
    console.log("Connecting Bitboy");
  };

  const handleBitboyConnected = () => {
    console.log("Connecting Bitboy");
  };

  const handleSuiConnect = () => {
    console.log("Connecting Sui");
  };

  const handleSuiConnected = () => {
    console.log("Connecting Sui");
  };

  const doNothing = () => {
    console.log("Do nothing");
  };

  async function handleTap() {
    if (isTapping) return;

    setTapClass(
      "inline-block scale-95 transition-transform duration-100 opacity-80"
    );
    console.log("Tapped");

    tapSound?.play("tap");

    setIsTapping(true);
    try {
      const { data, error } = await supabase
        .from("users_table")
        .update({ user_points: pointBalance + 1 })
        .eq("username", telegramUsername);

      if (error) {
        console.error("Error updating points:", error);
        setIsTapping(false);
        setTapClass("inline-block");

        return;
      }

      setStartPointBalance(pointBalance + 1);
      setPointBalance((prev) => prev + 1);
      // localStorage.setItem("pointBalance", (pointBalance + 1).toString());
    } catch (error) {
      console.error("Error saving to Supabase:", error);
      setIsTapping(false);
      setTapClass("inline-block");
    } finally {
      setIsTapping(false);
      setTapClass("inline-block");
    }
  }

  // Load the sounds
  useEffect(() => {
    setTapSound(
      new Howl({
        src: ["/sounds/tap.mp3"],
        volume: 1,
        sprite: {
          tap: [400, 700],
        },
      })
    );
    setBgMinerSound(
      new Howl({
        src: ["/sounds/bg-miner-music.mp3"],
        volume: 0.4,
        loop: true,
      })
    );
    setInfoOpenSound(
      new Howl({
        src: ["/sounds/info-open.mp3"],
        volume: 0.1,
        sprite: {
          info: [100, 500],
        },
      })
    );

    setCoinsCreditedSound(
      new Howl({
        src: ["/sounds/coins-credited.mp3"],
        volume: 1,
        sprite: {
          coins: [100, 500],
        },
      })
    );
  }, []);

  // Play the background music
  useEffect(() => {
    if (bgMinerSound) {
      if (mute) {
        bgMinerSound.stop();
      } else {
        bgMinerSound.play();
      }
    }
  }, [mute]);

  function playCoinsCreditedSound() {
    coinsCreditedSound?.play("coins");
    coinsCreditedSound?.once("end", () => {
      coinsCreditedSound?.play("coins");
    });
  }

  const fetchUserData = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("users_table")
      .select("*")
      .eq("username", telegramUsername)
      .single();

    if (data) {
      setUserData(data);

      if (data.connected_consoles !== null) {
        setConnectButtons(getConnectButtons(data.connected_consoles));
      }

      setPointBalance(Number(data.user_points));
      setStartPointBalance(Number(data.user_points));
      setIsLoading(false);
    }
    if (error) {
      if (error.code == "PGRST116") {
        // create new user
        const { data, error } = await supabase.from("users_table").insert([
          {
            nickname: null,
            username: telegramUsername,
            degen_score: 0,
            current_boost: 0,
            user_points: 0,
            connected_consoles: {
              playstation: [],
              xbox: [],
              steam: [],
              nintendo: [],
            },
            completed_missions: [],
            global_rank: 0,
            game_distance: 0,
          },
        ]);
      }
      console.log("Error fetching user data", error);
      setIsLoading(false);
      return;
    }
    console.log(data);
  };

  // load user data from supabase
  useEffect(() => {
    if (telegramUsername) fetchUserData();
  }, [telegramUsername]);

  useEffect(() => {
    if (user.connected_consoles !== null) {
      setConnectButtons(getConnectButtons(user.connected_consoles));
    }
  }, [user]);

  // scroll to top of screen on component load
  useEffect(() => {
    if (window && typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  let acceptedTerms = false;

  if (
    window &&
    navigator &&
    typeof window !== "undefined" &&
    typeof navigator !== "undefined"
  ) {
    const alreadyAcceptedTerms = localStorage.getItem("termsAccepted");
    if (alreadyAcceptedTerms === "true") {
      acceptedTerms = true;
    }
  }

  useEffect(() => {
    if (
      window &&
      navigator &&
      typeof window !== "undefined" &&
      typeof navigator !== "undefined"
    ) {
      const alreadyAcceptedTerms = localStorage.getItem("termsAccepted");
      if (alreadyAcceptedTerms === "true") {
        setTermsAccepted(true);
        acceptedTerms = true;
      } else {
        setTermsAccepted(false);
        acceptedTerms = false;
      }
    }
  }, []);

  const handleTermsAccept = () => {
    localStorage.setItem("termsAccepted", "true");
    setTermsAccepted(true);
    acceptedTerms = true;
  };

  return (
    <>
      <Dialog defaultOpen={!acceptedTerms}>
        {/* <DialogTrigger ></DialogTrigger> */}
        <DialogContent className=" w-[95%] h-[95%] border-none rounded-xl bg-white ">
          <TermsDisclaimer handleAccept={handleTermsAccept} />
        </DialogContent>
      </Dialog>

      {termsAccepted &&
        (!user.nickname || user.nickname.trim() === "") &&
        !isLoading && (
          <Dialog open={acceptNickname}>
            {/* <DialogTrigger ></DialogTrigger> */}
            <DialogContent className=" h-screen border-none backdrop-blur-md ">
              <NicknameInput setAcceptNickname={setAcceptNickname} />
            </DialogContent>
          </Dialog>
        )}

      {isLoading ? (
        <div>
          <MinerTabSkeleton />
        </div>
      ) : (
        <div className="min-h-screen bg-[#5C6E7E]">
          <div className="max-w-md mx-auto min-h-screen flex flex-col">
            {/* Top Status Card */}
            <div
              className="p-4 rounded-3xl m-4  bg-black"
              style={{
                boxShadow: `0px 0px 3px #060606, 0px 0px 5px rgba(19, 19, 19, 0.5), 0px 0px 10px #181818, inset -1px 1px 2px #000000, inset 4px -4px 8px rgba(0, 0, 0, 0.75)`,
                border: "3px solid #000000",
                backgroundImage: "url('/pngs/bg-cover.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex justify-between items-center px-2">
                <div className="w-8"></div>
                <span className={cn("text-6xl text-white ", jersey.className)}>
                  CONSO
                </span>
                <div>
                  <div className="hover:opacity-90">
                    <Wallet />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-2 mb-4">
                <Coin />

                <CountUp
                  start={startPointBalance}
                  end={pointBalance}
                  duration={0.5}
                  className={cn(
                    "text-yellow-400 text-4xl font-bold",
                    jersey.className
                  )}
                />
              </div>

              {/* Key Info Section : TO REMOVE  */}

              {/* <div className="flex justify-center gap-2 mb-4">
                <div
                  className="w-[73.33px] h-[27px] flex justify-center items-center rounded-lg"
                  style={{
                    backgroundImage: "url('/keys-logos/gold-background.svg')",
                    backgroundSize: "cover",
                  }}
                >
                  <Image
                    src="/keys-logos/gold-key.svg"
                    width={30}
                    height={30}
                    alt="Key"
                    className="inline-block"
                  />
                  <span className={cn(jersey.className)}>x4</span>
                </div>
                <div
                  className="w-[73.33px] h-[27px] flex justify-center items-center rounded-lg"
                  style={{
                    backgroundImage: "url('/keys-logos/silver-background.svg')",
                    backgroundSize: "cover",
                  }}
                >
                  <Image
                    src="/keys-logos/silver-key.svg"
                    width={30}
                    height={30}
                    alt="Key"
                    className="inline-block"
                  />
                  <span className={cn(jersey.className)}>x4</span>
                </div>
                <div
                  className="w-[73.33px] h-[27px] flex justify-center items-center rounded-lg"
                  style={{
                    backgroundImage: "url('/keys-logos/bronze-background.svg')",
                    backgroundSize: "cover",
                  }}
                >
                  <Image
                    src="/keys-logos/bronze-key.svg"
                    width={30}
                    height={30}
                    alt="Key"
                    className="inline-block"
                  />
                  <span className={cn(jersey.className)}>x4</span>
                </div>
              </div> */}

              {/* User Multipliers and Info Section */}
              {/* <div className="flex gap-2 ml-8 justify-center mb-4">
                <div>
                  <div className="grid grid-cols-4 justify-left items-left">
                    <div className="col-span-1 flex items-center justify-center">
                      <Boost />
                    </div>

                    <span
                      className={cn(
                        "text-[#DE5EA6] text-2xl text-nowrap col-span-3",
                        jersey.className
                      )}
                    >
                      Total Boost :
                    </span>
                  </div>
                  <div className="grid grid-cols-4 justify-left items-left">
                    <div className="col-span-1 flex items-center justify-center">
                      <CoinSmallIcon />
                    </div>
                    <span
                      className={cn(
                        "text-[#DE5EA6] text-2xl text-nowrap col-span-3",
                        jersey.className
                      )}
                    >
                      Global Rank :
                    </span>
                  </div>
                  <div className="grid grid-cols-4 justify-left items-left">
                    <div className="flex items-center justify-center col-span-1">
                      <ConsoleIcon />
                    </div>
                    <span
                      className={cn(
                        "text-[#DE5EA6] text-2xl text-nowrap col-span-3",
                        jersey.className
                      )}
                    >
                      All Consoles :
                    </span>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2 w-full justify-left">
                    <span
                      className={cn("text-white text-2xl", jersey.className)}
                    >
                      x{user?.current_boost}
                    </span>
                  </div>
                  <div className="flex gap-2 w-full justify-left">
                    <span
                      className={cn("text-white text-2xl", jersey.className)}
                    >
                      {Number(user?.id)}
                    </span>
                  </div>
                  <div className="flex gap-2 w-full justify-left ">
                    <div
                      className={cn(
                        "text-white text-2xl h-16 overflow-y-scroll pr-4 scrollbar-always-visible text-nowrap",
                        jersey.className
                      )}
                    >
                      <p>--- NA ---</p>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="h-[187px]"></div>
            </div>

            {/* Tap and Ads Section */}
            {connectSectionCollapsed && (
              <div className="space-y-4 px-4 mb-4">
                <div className="grid grid-cols-3 gap-1">
                  <div className="flex items-center justify-center ">
                    <Dialog>
                      <DialogTrigger>
                        <div className="inline-block hover:opacity-90 hover:scale-95 transition-transform duration-100">
                          <VideoPlayIcon />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="h-screen border-none bg-black">
                        <AdvertisementDialogV2
                          videoSrc={videoSrc}
                          advertiserInfo={advertiserInfo}
                          playSound={playCoinsCreditedSound}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex flex-col gap-3 items-center justify-center ">
                    <div className="flex gap-3">
                      <div
                        className={soundClass}
                        onClick={() => {
                          if (mute) {
                            setMute(false);
                            console.log("Sound is now on");
                            setSoundClass("inline-block duration-100");
                          } else {
                            setMute(true);
                            console.log("Sound is now off");
                            setSoundClass("inline-block duration-100");
                          }
                        }}
                      >
                        {mute ? <SoundOff /> : <SoundOn />}
                      </div>
                      <Dialog>
                        <DialogTrigger>
                          <div
                            onClick={() => infoOpenSound?.play("info")}
                            className="inline-block hover:opacity-90 hover:scale-95 transition-transform duration-100"
                          >
                            <InfoIcon />
                          </div>
                        </DialogTrigger>
                        <DialogContent className=" w-[95%] h-[95%] rounded-xl bg-white backdrop-blur-md">
                          <InfoDialog />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <WaveIcon />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className={tapClass} onClick={handleTap}>
                      <TapIcon />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connect Section */}
            <div className="flex flex-col ">
              <hr className="w-full border-[#C9C9C9] mb-2" />
              <div className="space-y-4 px-6">
                <div className="flex justify-between">
                  <span
                    className={cn(
                      "text-[#D7D7D7] text-2xl font-extrabold tracking-[0.1em]",
                      handjet.className
                    )}
                  >
                    CONNECT TO EARN
                  </span>

                  {!connectSectionCollapsed ? (
                    <button
                      className={cn(
                        "text-[#FFE500] text-2xl font-extrabold flex items-center gap-2",
                        jersey.className
                      )}
                      onClick={() => {
                        console.log("Collapsing");
                        setConnectSectionCollapsed(true);
                      }}
                    >
                      LESS
                      <ChevronUp className="h-6 w-6" />
                    </button>
                  ) : (
                    <button
                      className={cn(
                        "text-[#FFE500] text-2xl font-extrabold flex items-center gap-2",
                        jersey.className
                      )}
                      onClick={() => {
                        console.log("Expanding");
                        setConnectSectionCollapsed(false);
                      }}
                    >
                      MORE
                      <ChevronDown className="h-6 w-6" />
                    </button>
                  )}
                </div>
              </div>
              <hr className="w-full border-[#C9C9C9] mt-2 mb-3" />

              <div className="space-y-4 px-6 mb-4">
                {/* PlayStation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlaystationPixelatedLogo />
                    <p
                      className={cn(
                        jersey.className,
                        "text-2xl text-white tracking-[0.05em]"
                      )}
                    >
                      PlayStation
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        jersey.className,
                        "text-xl text-white mr-2 tracking-[0.05em]"
                      )}
                    >
                      2.5x
                    </p>

                    {connectButtons.playstation === CustomButtonType.PRIMARY ? (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={connectButtons.playstation}
                            handleClick={handlePlayStationConnect}
                          />
                        </DialogTrigger>
                        <DialogContent className="w-[100%] h-[100%] border-none bg-[#5C6E7E]">
                          <PlayStationConnectDialog />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={connectButtons.playstation}
                            handleClick={handlePlayStationConnected}
                          />
                        </DialogTrigger>
                        <DialogContent className=" w-[100%] h-screen border-none bg-[#5C6E7E] ">
                          <PlaystationConnectedDialog />
                          {/* <ConnectDialogSkeleton /> */}
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                {/* Xbox */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XboxPixelatedLogo />
                    <p
                      className={cn(
                        jersey.className,
                        "text-2xl text-white tracking-[0.05em]"
                      )}
                    >
                      Xbox
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        jersey.className,
                        "text-xl text-white mr-2 tracking-[0.05em]"
                      )}
                    >
                      2.5x
                    </p>

                    {connectButtons.xbox === CustomButtonType.PRIMARY ? (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={CustomButtonType.PRIMARY}
                            handleClick={handleXboxConnect}
                          />
                        </DialogTrigger>
                        <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <XboxConnectDialog />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={connectButtons.xbox}
                            handleClick={handleXboxConnected}
                          />
                        </DialogTrigger>
                        <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <XboxConnectedDialog />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                {/* Steam */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SteamPixelatedLogo />
                    <p
                      className={cn(
                        jersey.className,
                        "text-2xl text-white tracking-[0.05em]"
                      )}
                    >
                      Steam
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        jersey.className,
                        "text-xl text-white mr-2 tracking-[0.05em]"
                      )}
                    >
                      2.0x
                    </p>

                    {connectButtons.steam === CustomButtonType.PRIMARY ? (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={CustomButtonType.PRIMARY}
                            handleClick={handleSteamConnect}
                          />
                        </DialogTrigger>
                        <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <SteamConnectDialog />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={connectButtons.steam}
                            handleClick={handleSteamConnected}
                          />
                        </DialogTrigger>
                        <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <SteamConnectedDialog />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                {/* Nintendo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <NintendoPixelatedLogo />
                    <p
                      className={cn(
                        jersey.className,
                        "text-2xl text-white tracking-[0.05em]"
                      )}
                    >
                      Nintendo
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        jersey.className,
                        "text-xl text-white mr-2 tracking-[0.05em]"
                      )}
                    >
                      1.5x
                    </p>
                    {connectButtons.nintendo === CustomButtonType.PRIMARY ? (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={CustomButtonType.PRIMARY}
                            handleClick={handleNintendoConnect}
                          />
                        </DialogTrigger>
                        <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <NintendoConnectDialog />
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Dialog>
                        <DialogTrigger>
                          <CustomButton
                            type={connectButtons.nintendo}
                            handleClick={handleNintendoConnected}
                          />
                        </DialogTrigger>
                        <DialogContent className=" w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                          <NintendoConnectedDialog />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>

                {!connectSectionCollapsed && (
                  <>
                    {/* Bitboy */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BitboyPixelatedLogo />
                        <p
                          className={cn(
                            jersey.className,
                            "text-2xl text-white tracking-[0.05em]"
                          )}
                        >
                          Bitboy
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            jersey.className,
                            "text-xl text-white mr-2 tracking-[0.05em]"
                          )}
                        >
                          4.5x
                        </p>

                        {connectButtons.bitboy === CustomButtonType.PRIMARY ? (
                          <Dialog>
                            <DialogTrigger>
                              <CustomButton
                                type={CustomButtonType.PRIMARY}
                                handleClick={handleBitboyConnect}
                              />
                            </DialogTrigger>
                            <DialogContent className=" w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                              <BitboyConnectDialog />
                            </DialogContent>
                          </Dialog>
                        ) : connectButtons.bitboy ===
                          CustomButtonType.INACTIVE ? (
                          <CustomButton
                            type={connectButtons.bitboy}
                            handleClick={doNothing}
                          />
                        ) : (
                          <Dialog>
                            <DialogTrigger>
                              <CustomButton
                                type={connectButtons.bitboy}
                                handleClick={handleBitboyConnected}
                              />
                            </DialogTrigger>
                            <DialogContent className="  w-[100%] h-[100%]  border-none bg-[#5C6E7E]">
                              <BitboyConnectedDialog />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>

                    {/* Sui */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SuiPixelatedLogo />
                        <p
                          className={cn(
                            jersey.className,
                            "text-2xl text-white tracking-[0.05em]"
                          )}
                        >
                          SuiPlay0X1
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            jersey.className,
                            "text-xl text-white mr-2 tracking-[0.05em]"
                          )}
                        >
                          4.5x
                        </p>
                        {connectButtons.sui === CustomButtonType.PRIMARY ? (
                          <Dialog>
                            <DialogTrigger>
                              <CustomButton
                                type={CustomButtonType.PRIMARY}
                                handleClick={handleSuiConnect}
                              />
                            </DialogTrigger>
                            <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                              <SuiConnectDialog />
                            </DialogContent>
                          </Dialog>
                        ) : connectButtons.sui === CustomButtonType.INACTIVE ? (
                          <CustomButton
                            type={connectButtons.sui}
                            handleClick={doNothing}
                          />
                        ) : (
                          <Dialog>
                            <DialogTrigger>
                              <CustomButton
                                type={connectButtons.sui}
                                handleClick={handleSuiConnected}
                              />
                            </DialogTrigger>
                            <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                              <SuiConnectedDialog />
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
