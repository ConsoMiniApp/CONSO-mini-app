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

const connectButtons = {
  playstation: CustomButtonType.MINING,
  xbox: CustomButtonType.CONNECT,
  nintendo: CustomButtonType.CONNECT,
  steam: CustomButtonType.CONNECT,
  bitboy: CustomButtonType.SOON,
  sui: CustomButtonType.SOON,
};

export default function Miner() {
  const { toast } = useToast();
  const [tapClass, setTapClass] = useState("inline-block ");
  const [soundClass, setSoundClass] = useState("inline-block");
  const [mute, setMute] = useState(true);
  // const [pointBalance, setPointBalance] = useState(0);
  const { pointBalance, setPointBalance } = useAppContext();

  const [connectSectionCollapsed, setConnectSectionCollapsed] = useState(true);

  const handlePlayStationConnect = () => {
    console.log("Connecting PlayStation");
  };

  const handleXboxConnect = () => {
    console.log("Connecting Xbox");
  };

  const handleNintendoConnect = () => {
    console.log("Connecting Nintendo");
  };

  const handleSteamConnect = () => {
    console.log("Connecting Steam");
  };

  const handleBitboyConnect = () => {
    console.log("Connecting Bitboy");
  };

  const handleSuiConnect = () => {
    console.log("Connecting Sui");
  };

  const doNothing = () => {
    console.log("Do nothing");
  };
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

  // useEffect(() => {
  //   // save point balance to the local storage
  //   if (pointBalance)

  // }, [pointBalance]);

  return (
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
          <div className="flex justify-around mb-4">
            <div></div>
            <span
              className={cn(
                "text-6xl text-white tracking-widest",
                jersey.className
              )}
            >
              CONSO
            </span>
            <Image
              alt="Wallet"
              src="./other-logos/wallet.svg"
              height={30}
              width={30}
              className="hover:opacity-90"
              onClick={() => console.log("Wallet")}
            ></Image>
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

          <div className="flex gap-2 ml-8 justify-center items-center  mb-4">
            <div>
              <div className="flex gap-2 w-full justify-center">
                <Image
                  src="/other-logos/boost.svg"
                  width={24}
                  height={24}
                  alt="Lightning"
                  className="inline-block"
                />
                <span
                  className={cn("text-[#DE5EA6] text-2xl", jersey.className)}
                >
                  Total Boost:
                </span>
              </div>
              <div className="flex gap-2 w-full justify-center">
                <Image
                  src="/other-logos/coin.svg"
                  width={25}
                  height={25}
                  alt="Lightning"
                  className="inline-block"
                />
                <span
                  className={cn("text-[#DE5EA6] text-2xl", jersey.className)}
                >
                  Tap Bonus:
                </span>
              </div>
              <div className="flex gap-2 w-full justify-center">
                <Image
                  src="/other-logos/console.svg"
                  width={25}
                  height={25}
                  alt="Lightning"
                  className="inline-block"
                />
                <span
                  className={cn("text-[#DE5EA6] text-2xl", jersey.className)}
                >
                  All Consoles:
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
                  x4.5
                </span>
              </div>
              <div className="flex gap-2 w-full justify-left">
                <span className={cn("text-white text-2xl", jersey.className)}>
                  Play Station 5
                </span>
              </div>
            </div>
          </div>

          {/* <div className="bg-pink-500 rounded-lg p-2 text-center text-white">
            <Image
              src="/placeholder.svg?height=16&width=16"
              width={16}
              height={16}
              alt="Token"
              className="inline-block mr-2"
            />
            10 Token added for the ad play
          </div> */}
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
                  <DialogContent className="h-screen">
                    <AdvertisementDialog />
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

                      // toast({
                      //   // title: "You have tapped",
                      //   description: "You have tapped",
                      //   variant: "custom",
                      // });
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
                    <DialogContent className=" w-[95%] h-[95%] rounded-lg">
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
          <div className=" mb-4">
            <hr className="w-full border-[#C9C9C9] mb-2" />
            <div className="flex justify-between px-4">
              <span
                className={cn(
                  "text-[#D7D7D7] text-2xl font-extrabold",
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
            <hr className="w-full border-[#C9C9C9] mt-2" />
          </div>

          <div className="space-y-4 px-4 mb-4">
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
                <p className={cn(jersey.className, "text-2xl text-white")}>
                  PlayStation
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                      <PlaystationConnectDialog />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <CustomButton
                    type={connectButtons.playstation}
                    handleClick={doNothing}
                  />
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
                <p className={cn(jersey.className, "text-2xl text-white")}>
                  Xbox
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                      <XboxConnectDialog />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <CustomButton
                    type={connectButtons.xbox}
                    handleClick={doNothing}
                  />
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
                <p className={cn(jersey.className, "text-2xl text-white")}>
                  Nintendo
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                      <NintendoConnectDialog />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <CustomButton
                    type={connectButtons.nintendo}
                    handleClick={doNothing}
                  />
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
                <p className={cn(jersey.className, "text-2xl text-white")}>
                  Steam
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    <DialogContent className=" w-[95%] h-[95%] rounded-lg">
                      <SteamConnectDialog />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <CustomButton
                    type={connectButtons.steam}
                    handleClick={doNothing}
                  />
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
                    <p className={cn(jersey.className, "text-2xl text-white")}>
                      Bitboy
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    ) : (
                      <CustomButton
                        type={connectButtons.bitboy}
                        handleClick={doNothing}
                      />
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
                    <p className={cn(jersey.className, "text-2xl text-white")}>
                      Sui
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className={cn(jersey.className, "text-2xl text-white")}>
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
                    ) : (
                      <CustomButton
                        type={connectButtons.sui}
                        handleClick={doNothing}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
