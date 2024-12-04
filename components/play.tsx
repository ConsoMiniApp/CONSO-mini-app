import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import Image from "next/image";
import { handjet, jersey } from "./ui/fonts";

export default function Play() {
  return (
    <div className="min-h-screen bg-[#5C6E7E]">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Top Status Card */}
        <div className=" bg-black h-screen">
          <div className="flex justify-around mb-4 mt-10">
            <div></div>
            <span className={cn("text-6xl text-white", jersey.className)}>
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
          {/* Game Section */}
          <div
            className={cn(
              "text-6xl text-white text-center mt-40",
              jersey.className
            )}
          >
            COMING SOON ...
          </div>
        </div>
      </div>
    </div>
  );
}
