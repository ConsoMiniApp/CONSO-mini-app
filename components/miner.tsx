import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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

const connectButtons = {
  playstation: CustomButtonType.MINING,
  xbox: CustomButtonType.CONNECT,
  nintendo: CustomButtonType.CONNECT,
  steam: CustomButtonType.CONNECT,
  bitboy: CustomButtonType.SOON,
  sui: CustomButtonType.SOON,
};

export default function Miner() {
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
              4,000,000
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

              <button
                className={cn(
                  "text-[#FFE500] text-2xl font-extrabold flex items-center gap-2",
                  jersey.className
                )}
              >
                LESS
                <ChevronDown className="h-6 w-6" />
              </button>
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
                        handleClick={doNothing}
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
          </div>
        </div>
      </div>
    </div>
  );
}
