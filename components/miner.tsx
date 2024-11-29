import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { jersey } from "./ui/fonts";

export default function Miner() {
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
        <div className=" flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-bold tracking-wider">
              CONNECT TO EARN
            </span>
            <button className="text-yellow-400 flex items-center">
              LESS
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* PlayStation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="PlayStation"
                  className="inline-block"
                />
                <span className="text-white">PlayStation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">4.5x</span>
                <button className="bg-emerald-500 text-white px-4 py-1 rounded">
                  Mining...
                </button>
              </div>
            </div>

            {/* Xbox */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Xbox"
                  className="inline-block"
                />
                <span className="text-white">Xbox</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">3.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Steam */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Steam"
                  className="inline-block"
                />
                <span className="text-white">Steam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Nintendo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Nintendo"
                  className="inline-block"
                />
                <span className="text-white">Nintendo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-yellow-400 text-black px-4 py-1 rounded">
                  Connect
                </button>
              </div>
            </div>

            {/* Bitboy */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="Bitboy"
                  className="inline-block"
                />
                <span className="text-white">Bitboy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-gray-700 text-white px-4 py-1 rounded">
                  Soon...
                </button>
              </div>
            </div>

            {/* SuiPlayOx1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  width={24}
                  height={24}
                  alt="SuiPlayOx1"
                  className="inline-block"
                />
                <span className="text-white">SuiPlayOx1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">2.5x</span>
                <button className="bg-gray-700 text-white px-4 py-1 rounded">
                  Soon...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
