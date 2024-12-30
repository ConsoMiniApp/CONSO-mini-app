import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ClaimTokenDialog } from "../common/ClaimTokensDialog";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { CoinSmallIcon } from "@/components/ui/icons";
import { ConfirmShopDialog } from "../common/ConfirmShopDialog";
import { useState } from "react";

const initialCharacter = [
  {
    name: "DEFAULT",
    key: "og",
    image: "/play-logos/default-character.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "NINJA",
    key: "ninja",
    image: "/play-logos/ninja-character.gif",
    selected: false,
    owned: false,
    price: 200,
  },
  {
    name: "SAMURAI",
    key: "samurai",
    image: "/play-logos/samurai-character.gif",
    selected: false,
    owned: false,
    price: 2500,
  },
];

const initialJetpacks = [
  {
    name: "OG PACK",
    key: "jetpack",
    image: "/play-logos/og-jetpack.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "ROCKET",
    key: "rocket",
    image: "/play-logos/og-rocket.gif",
    selected: false,
    owned: false,
    price: 2500,
  },
  {
    name: "HELICOPTER",
    key: "heli",
    image: "/play-logos/og-heli.gif",
    selected: false,
    owned: false,
    price: 5000,
  },
];

export function ShopDrawer() {
  const [characters, setCharacters] = useState(initialCharacter);
  const [jetpacks, setJetpacks] = useState(initialJetpacks);
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
                    onClick={() => {
                      if (!character.owned) return;
                      setCharacters((prev) =>
                        prev.map((char, i) =>
                          i === index
                            ? { ...char, selected: true }
                            : { ...char, selected: false }
                        )
                      );

                      switchJetpacks(character.key);
                    }}
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
                {!character.owned && (
                  <DialogContent className="h-screen border-none backdrop-blur-md">
                    <ConfirmShopDialog
                      handleConfirm={() => {
                        setCharacters((prev) =>
                          prev.map((char, i) =>
                            i === index
                              ? { ...char, selected: true, owned: true }
                              : { ...char, selected: false }
                          )
                        );
                        console.log("you purchased an item");
                        switchJetpacks(character.key);
                      }}
                      item={character}
                    />
                  </DialogContent>
                )}
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
                    onClick={() => {
                      if (!jetpack.owned) return;
                      setJetpacks((prev) =>
                        prev.map((char, i) =>
                          i === index
                            ? { ...char, selected: true }
                            : { ...char, selected: false }
                        )
                      );
                    }}
                  >
                    <p
                      className={cn(
                        handjet.className,
                        "text-xs text-black tracking-widest"
                      )}
                    >
                      {jetpack.name}
                    </p>
                    <Image
                      src={jetpack.image}
                      alt="jetpack "
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
                {!jetpack.owned && (
                  <DialogContent className="h-screen border-none backdrop-blur-md">
                    <ConfirmShopDialog
                      handleConfirm={() => {
                        setJetpacks((prev) =>
                          prev.map((char, i) =>
                            i === index
                              ? { ...char, selected: true, owned: true }
                              : { ...char, selected: false }
                          )
                        );
                        console.log("you purchased an item");
                      }}
                      item={jetpack}
                    />
                  </DialogContent>
                )}
              </Dialog>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
