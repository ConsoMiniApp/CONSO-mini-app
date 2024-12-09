import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { handjet, jersey } from "./ui/fonts";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { XboxConnectDialog } from "./xbox/XboxConnectDialog";
import CustomButton from "./conso/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { PlaystationConnectDialog } from "./psn/PlaystationConnectDialog";
import { NintendoConnectDialog } from "./nintendo/NintendoConnectDialog";
import { SteamConnectDialog } from "./steam/SteamConnectDialog";
import { BitboyConnectDialog } from "./bitboy/BitboyConnectDialog";
import { SuiConnectDialog } from "./sui/SuiConnectDialog";
import { AdvertisementDialog } from "./conso/AdvertisementDialog";
import { useContext, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { InfoDialog } from "./conso/InfoDialog";
import { useAppContext } from "@/contexts/AppContext";
import { TermsDisclaimer } from "./conso/TermsAndConditionsDialog";
import { AdvertisementDialogV2 } from "./conso/AdvertisementDialogV2";
import { PlaystationConnectedDialog } from "./psn/PlaystationConnectedDialog";
import { XboxConnectedDialog } from "./xbox/XboxConnectedDialog";
import { NintendoConnectedDialog } from "./nintendo/NintendoConnectedDialog";
import { SteamConnectedDialog } from "./steam/SteamConnectedDialog";
import { BitboyConnectedDialog } from "./bitboy/BitboyConnectedDialog";
import { SuiConnectedDialog } from "./sui/SuiConnectedDialog";
import { Howl } from "howler";

const connectButtons = {
  playstation: CustomButtonType.MINING,
  xbox: CustomButtonType.CONNECT,
  nintendo: CustomButtonType.CONNECT,
  steam: CustomButtonType.CONNECT,
  bitboy: CustomButtonType.SOON,
  sui: CustomButtonType.SOON,
};

const videoSrc = "/videos/ad.mp4";
const advertiserInfo = {
  title: "EigenLayer",
  description: "Shared security to hyperscale ethereum",
  link: "https://eigenlayer.com",
  logoUrl: "/pngs/eigenlayer.png",
  bgImageUrl: "/pngs/eigenlayer-bg.png",
};

export default function Miner() {
  const { toast } = useToast();
  const [tapClass, setTapClass] = useState("inline-block ");
  const [soundClass, setSoundClass] = useState("inline-block");
  const [mute, setMute] = useState(true);
  // const [pointBalance, setPointBalance] = useState(0);
  const { pointBalance, setPointBalance } = useAppContext();

  const [connectSectionCollapsed, setConnectSectionCollapsed] = useState(true);

  // sounds
  const [tapSound, setTapSound] = useState<Howl>();
  const [bgMinerSound, setBgMinerSound] = useState<Howl>();

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
        volume: 0.1,
        loop: true,
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

  // FOR TESTING
  useEffect(() => {
    // get point balance from the local storage
    const pointBalance = localStorage.getItem("pointBalance");

    if (pointBalance) {
      let start = 0;
      const end = Number(pointBalance); // Final value loaded from the server
      const chunk = Math.round((end - start) / 50); // Animation duration in milliseconds
      const stepTime = 10; // Time per increment

      const timer = setInterval(() => {
        start += chunk;
        setPointBalance(start);

        if (start >= end) {
          clearInterval(timer);
          setPointBalance(Number(pointBalance));
        }
      }, stepTime);
    } else {
      setPointBalance(4000000);
    }
  }, []);

  let termsAccepted = false;
  if (typeof window !== "undefined") {
    const alreadyAcceptedTerms = localStorage.getItem("termsAccepted");
    if (alreadyAcceptedTerms == "true") {
      termsAccepted = true;
    } else {
      termsAccepted = false;
    }
  }

  return (
    <>
      <Dialog defaultOpen={!termsAccepted}>
        {/* <DialogTrigger ></DialogTrigger> */}
        <DialogContent className=" w-[95%] h-[95%] rounded-xl">
          <TermsDisclaimer />
        </DialogContent>
      </Dialog>
      <div className="min-h-screen bg-[#5C6E7E]">
        <div className="max-w-md mx-auto min-h-screen flex flex-col">
          {/* Top Status Card */}
          <div
            className="p-4 rounded-3xl m-4 border-2 shadow-lg bg-black border-neutral-800"
            style={{
              boxShadow: `
              0px 0px 10px 0px #181818,
              0px 0px 5px 0px #13131380,
              0px 0px 3px 0px #060606,
              4px -4px 8px 0px #000000BF inset,
              -1px 1px 2px 0px #000000 inset
            `,
            }}
          >
            <div className="flex justify-between items-center px-2">
              <div className="w-8"></div>
              <span className={cn("text-6xl text-white ", jersey.className)}>
                CONSO
              </span>
              <div>
                <Image
                  src="/other-logos/wallet.svg"
                  width={32}
                  height={32}
                  alt="Wallet"
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-2 mb-4">
              <Image
                src="./other-logos/coin.svg"
                width={30}
                height={30}
                alt=""
                className="inline-block"
                onClick={() => console.log("Coin")}
              />
              <span
                className={cn(
                  "text-yellow-400 text-4xl font-bold",
                  jersey.className
                )}
              >
                {pointBalance.toLocaleString()}
              </span>
            </div>

            {/* Key Info Section */}

            <div className="flex justify-center gap-2 mb-4">
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
            </div>

            {/* User Multipliers and Info Section */}
            <div className="flex gap-2 ml-8 justify-center items-start mb-4">
              <div>
                <div className="flex gap-2 w-full justify-left">
                  <Image
                    src="/other-logos/boost.svg"
                    width={24}
                    height={24}
                    alt="Lightning"
                    className="inline-block"
                  />
                  <span
                    className={cn(
                      "text-[#DE5EA6] text-2xl text-nowrap",
                      jersey.className
                    )}
                  >
                    Total Boost :
                  </span>
                </div>
                <div className="flex gap-2 w-full justify-left">
                  <Image
                    src="/other-logos/coin.svg"
                    width={25}
                    height={25}
                    alt="Lightning"
                    className="inline-block"
                  />
                  <span
                    className={cn(
                      "text-[#DE5EA6] text-2xl text-nowrap",
                      jersey.className
                    )}
                  >
                    Tap Bonus :
                  </span>
                </div>
                <div className="flex gap-2 w-full justify-left">
                  <Image
                    src="/other-logos/console.svg"
                    width={25}
                    height={25}
                    alt="Lightning"
                    className="inline-block"
                  />
                  <span
                    className={cn(
                      "text-[#DE5EA6] text-2xl text-nowrap",
                      jersey.className
                    )}
                  >
                    All Consoles :
                  </span>
                </div>
              </div>
              <div className="">
                <div className="flex items-center gap-2 w-full justify-left">
                  <span className={cn("text-white text-2xl", jersey.className)}>
                    x4.5
                  </span>
                </div>
                <div className="flex gap-2 w-full justify-left">
                  <span className={cn("text-white text-2xl", jersey.className)}>
                    5,000
                  </span>
                </div>
                <div className="flex gap-2 w-full justify-left ">
                  <div
                    className={cn(
                      "text-white text-2xl h-16 overflow-y-scroll pr-4 scrollbar-always-visible text-nowrap",
                      jersey.className
                    )}
                  >
                    <p>Play Station </p>
                    <p>Xbox</p>
                    <p>Steam Deck</p>
                    <p>Nintendo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tap and Ads Section */}
          {connectSectionCollapsed && (
            <div className="space-y-4 px-4 mb-4">
              <div className="grid grid-cols-3 gap-1">
                <div className="flex items-center justify-center ">
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src="/other-logos/play.svg"
                        width={114}
                        height={114}
                        alt="Ads"
                        className="inline-block hover:opacity-90 hover:scale-95 transition-transform duration-100"
                      />
                    </DialogTrigger>
                    <DialogContent className="h-screen border-none bg-black">
                      <AdvertisementDialogV2
                        videoSrc={videoSrc}
                        advertiserInfo={advertiserInfo}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center ">
                  <div className="flex gap-3">
                    <Image
                      src="/other-logos/sound.svg"
                      width={45}
                      height={45}
                      alt="sound"
                      className={soundClass}
                      onClick={() => {
                        if (mute) {
                          setMute(false);
                          console.log("Sound is off");
                          setSoundClass(
                            "inline-block opacity-40 transition-opacity duration-100"
                          );
                        } else {
                          setMute(true);
                          console.log("Sound is on");
                          setSoundClass(
                            "inline-block opacity-100 transition-opacity duration-100"
                          );
                        }
                      }}
                    />
                    <Dialog>
                      <DialogTrigger>
                        <Image
                          src="/other-logos/info.svg"
                          width={45}
                          height={45}
                          alt="Ads"
                          className="inline-block hover:opacity-90 hover:scale-95 transition-transform duration-100"
                        />
                      </DialogTrigger>
                      <DialogContent className=" w-[95%] h-[95%] rounded-xl">
                        <InfoDialog />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Image
                    src="/other-logos/wave.svg"
                    width={62}
                    height={44}
                    alt="Wave"
                    className="inline-block"
                  />
                </div>

                <div className="flex items-center justify-center animate-">
                  <Image
                    src="/other-logos/tap.svg"
                    width={114}
                    height={114}
                    alt="Tap"
                    className={tapClass}
                    onClick={() => {
                      setTapClass(
                        "inline-block scale-95 transition-transform duration-100 opacity-80"
                      );
                      tapSound?.play("tap");
                      // toast({
                      //   // title: "You have tapped",
                      //   description: "You have tapped",
                      //   variant: "custom",
                      // });

                      console.log("Tapped");
                      setTimeout(() => {
                        setTapClass("inline-block");
                        setPointBalance(pointBalance + 1);
                        localStorage.setItem(
                          "pointBalance",
                          (pointBalance + 1).toString()
                        );
                      }, 100);
                    }}
                  />
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
                  <Image
                    src="/console-logos/playstation-pixelated.svg"
                    width={32}
                    height={32}
                    alt="PlayStation"
                    className="inline-block"
                  />
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
                    4.5x
                  </p>

                  {connectButtons.playstation === CustomButtonType.CONNECT ? (
                    <Dialog>
                      <DialogTrigger>
                        <CustomButton
                          type={CustomButtonType.MINING}
                          handleClick={handlePlayStationConnect}
                        />
                      </DialogTrigger>
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                        <PlaystationConnectDialog />
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
                      <DialogContent className=" w-[100%] h-[100%] border-none bg-[#5C6E7E] ">
                        <PlaystationConnectedDialog />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Xbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/console-logos/xbox-pixelated.svg"
                    width={32}
                    height={32}
                    alt="PlayStation"
                    className="inline-block"
                  />
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
                    4.5x
                  </p>

                  {connectButtons.xbox === CustomButtonType.CONNECT ? (
                    <Dialog>
                      <DialogTrigger>
                        <CustomButton
                          type={CustomButtonType.CONNECT}
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
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                        <XboxConnectedDialog />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Nintendo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/console-logos/nintendo-pixelated.svg"
                    width={32}
                    height={32}
                    alt="Nintendo"
                    className="inline-block"
                  />
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
                    4.5x
                  </p>
                  {connectButtons.nintendo === CustomButtonType.CONNECT ? (
                    <Dialog>
                      <DialogTrigger>
                        <CustomButton
                          type={CustomButtonType.CONNECT}
                          handleClick={handleNintendoConnect}
                        />
                      </DialogTrigger>
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
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
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                        <NintendoConnectedDialog />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Steam */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src="/console-logos/steam-pixelated.svg"
                    width={32}
                    height={32}
                    alt="Steam"
                    className="inline-block"
                  />
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
                    4.5x
                  </p>

                  {connectButtons.steam === CustomButtonType.CONNECT ? (
                    <Dialog>
                      <DialogTrigger>
                        <CustomButton
                          type={CustomButtonType.CONNECT}
                          handleClick={handleSteamConnect}
                        />
                      </DialogTrigger>
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
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
                      <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                        <SteamConnectedDialog />
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
                      <Image
                        src="/console-logos/bitboy-pixelated.svg"
                        width={32}
                        height={32}
                        alt="Bitboy"
                        className="inline-block"
                      />
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

                      {connectButtons.bitboy === CustomButtonType.CONNECT ? (
                        <Dialog>
                          <DialogTrigger>
                            <CustomButton
                              type={CustomButtonType.CONNECT}
                              handleClick={handleBitboyConnect}
                            />
                          </DialogTrigger>
                          <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                            <BitboyConnectDialog />
                          </DialogContent>
                        </Dialog>
                      ) : connectButtons.bitboy === CustomButtonType.SOON ? (
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
                          <DialogContent className="  w-[95%] h-[95%] rounded-lg border-none bg-[#5C6E7E]">
                            <BitboyConnectedDialog />
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>

                  {/* Sui */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/console-logos/sui-pixelated.svg"
                        width={32}
                        height={32}
                        alt="Sui"
                        className="inline-block"
                      />
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
                      {connectButtons.sui === CustomButtonType.CONNECT ? (
                        <Dialog>
                          <DialogTrigger>
                            <CustomButton
                              type={CustomButtonType.CONNECT}
                              handleClick={handleSuiConnect}
                            />
                          </DialogTrigger>
                          <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                            <SuiConnectDialog />
                          </DialogContent>
                        </Dialog>
                      ) : connectButtons.sui === CustomButtonType.SOON ? (
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
    </>
  );
}
