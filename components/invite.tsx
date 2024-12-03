import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, jersey } from "./ui/fonts";

export default function Invite() {
  return (
    <div className="min-h-screen bg-[#5C6E7E]">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Top Status Card */}
        <div className=" p-4 rounded-3xl m-4 border-2 shadow-lg bg-black border-neutral-800">
          <div className="flex justify-around mb-4">
            <div></div>
            <span
              className={cn(
                "text-6xl text-white tracking-widest",
                jersey.className
              )}
            >
              INVITE
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

          <div className="flex flex-col items-center mx-auto space-y-1 mb-4">
            <div className="flex gap-2 w-full justify-center">
              <Image
                src="/other-logos/coin.svg"
                width={25}
                height={25}
                alt="Lightning"
                className="inline-block"
              />
              <span className={cn("text-[#DE5EA6] text-2xl", jersey.className)}>
                Total Boost:
              </span>
              <span className={cn("text-white text-2xl", jersey.className)}>
                x4.5
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
              <span className={cn("text-[#DE5EA6] text-2xl", jersey.className)}>
                Tap Bonus:
              </span>
              <span className={cn("text-white text-2xl", jersey.className)}>
                x4.5
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
              <span className={cn("text-[#DE5EA6] text-2xl", jersey.className)}>
                All Consoles:
              </span>
              <span className={cn("text-white text-2xl", jersey.className)}>
                Play Station 5
              </span>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-green.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting PlayStation")}
                >
                  <span className={cn(jersey.className, "text-2xl")}>
                    Mining...
                  </span>
                </a>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-yellow.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting PlayStation")}
                >
                  <span className={cn(jersey.className, "text-2xl")}>
                    Connect
                  </span>
                </a>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-yellow.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting PlayStation")}
                >
                  <span className={cn(jersey.className, "text-2xl")}>
                    Connect
                  </span>
                </a>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-yellow.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting PlayStation")}
                >
                  <span className={cn(jersey.className, "text-2xl")}>
                    Connect
                  </span>
                </a>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-gray.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting Bitboy")}
                >
                  <span
                    className={cn(jersey.className, "text-2xl text-[#CECECE]")}
                  >
                    Soon...
                  </span>
                </a>
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

                <a
                  className="w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform"
                  style={{
                    backgroundImage: "url('/other-logos/button-bg-gray.svg')",
                    backgroundSize: "cover",
                  }}
                  onClick={() => console.log("Connecting Sui")}
                >
                  <span
                    className={cn(jersey.className, "text-2xl text-[#CECECE]")}
                  >
                    Soon...
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
