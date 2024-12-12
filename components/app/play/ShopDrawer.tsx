import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ClaimTokenDialog } from "../common/ClaimTokensDialog";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { CoinSmallIcon } from "@/components/ui/icons";

const characters = [
  {
    name: "DEFAULT",
    image: "/play-logos/default-character.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "NINJA",
    image: "/play-logos/ninja-character.gif",
    selected: false,
    owned: true,
    price: 200,
  },
  {
    name: "SAMURAI",
    image: "/play-logos/samurai-character.gif",
    selected: false,
    owned: false,
    price: 2500,
  },
];

const jetpacks = [
  {
    name: "OG PACK",
    image: "/play-logos/default-jetpack.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "ROCKET",
    image: "/play-logos/rocket-jetpack.gif",
    selected: false,
    owned: true,
    price: 2500,
  },
  {
    name: "HELICOPTER",
    image: "/play-logos/helicopter-jetpack.gif",
    selected: false,
    owned: false,
    price: 5000,
  },
];

export function ShopDrawer() {
  const activities = [
    { name: "PlayStation", rate: "2.5x" },
    { name: "Xbox", rate: "2.5x" },
    { name: "Bitboy", rate: "2.0x" },
    { name: "Sui Console", rate: "2.0x" },
    { name: "Nintendo", rate: "1.75x" },
    { name: "Steam", rate: "1.5x" },
  ];
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none p-4 ">
        {/* Top Section */}
        <div className="flex justify-between px-2">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            SHOP ACCESSORIES
          </p>
          {/* <DialogClose>
            <a>
              <Close />
            </a>
          </DialogClose> */}
        </div>

        {/* Sub Heading */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 px-2">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            Earn CONSO tokens by contributing to the network in various ways.
          </p>
        </div>

        {/* All Characters */}
        <div className="flex flex-col justify-between px-2 mt-4">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            CHARACTERS
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {characters.map((character, index) => (
              <Dialog>
                <DialogTrigger>
                  <div
                    key={index}
                    className={cn(
                      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative",
                      character.selected ? "bg-[#FFE500]" : "bg-white"
                    )}
                  >
                    <p
                      className={cn(
                        handjet.className,
                        "text-xs text-black tracking-widest"
                      )}
                    >
                      {character.name}
                    </p>
                    <Image
                      src={character.image}
                      alt="Mystery Box"
                      width={134}
                      height={100}
                    />
                    <div
                      className={cn(
                        jersey.className,
                        "absolute bottom-[-16px] left-1/2 -translate-x-1/2  w-[60%]  "
                      )}
                    >
                      {!character.owned && (
                        <div className="bg-[#00BA64] rounded-md flex gap-1 px-2 justify-center">
                          <Image
                            src="/other-logos/coin.svg"
                            height={15}
                            width={15}
                            alt="coin-image"
                          />{" "}
                          <p
                            className={cn(
                              jersey.className,
                              "text-md text-white"
                            )}
                          >
                            {character.price.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="h-screen border-none backdrop-blur-md">
                  <ConfirmDialog
                    handleConfirm={() => console.log("you got 200 tokens")}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* All Jetpacks */}
        <div className="flex flex-col justify-between px-2 mt-8">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-widest"
            )}
          >
            {" "}
            JETPACK
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {jetpacks.map((jetpack, index) => (
              <Dialog>
                <DialogTrigger>
                  <div
                    key={index}
                    className={cn(
                      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative",
                      jetpack.selected ? "bg-[#FFE500]" : "bg-white"
                    )}
                  >
                    <p
                      className={cn(
                        handjet.className,
                        "text-xs text-black tracking-wider"
                      )}
                    >
                      {jetpack.name}
                    </p>
                    <Image
                      src={jetpack.image}
                      alt="potion"
                      width={134}
                      height={100}
                    />
                    <div
                      className={cn(
                        jersey.className,
                        "absolute bottom-[-16px] left-1/2 -translate-x-1/2  w-[60%]  "
                      )}
                    >
                      {!jetpack.owned && (
                        <div className="bg-[#00BA64] rounded-md flex gap-1 px-2 justify-center">
                          <Image
                            src="/other-logos/coin.svg"
                            height={15}
                            width={15}
                            alt="coin-image"
                          />{" "}
                          <p
                            className={cn(
                              jersey.className,
                              "text-md text-white"
                            )}
                          >
                            {jetpack.price.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="h-screen border-none backdrop-blur-md">
                  <ConfirmDialog
                    handleConfirm={() => console.log("you got 200 tokens")}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
