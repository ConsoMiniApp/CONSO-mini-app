import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ClaimTokenDialog } from "../common/ClaimMysteryBoxDialog";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { CoinSmallIcon, ErrorIcon, SuccessIcon } from "@/components/ui/icons";
import { ConfirmShopDialog } from "../common/ConfirmShopDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { useAppContext } from "@/contexts/AppContext";
import { Character, Jetpack } from "@/lib/types";

interface ShopDrawerProps {
  characters: Character[];
  jetpacks: Jetpack[];
  setCharacters: React.Dispatch<React.SetStateAction<Character[]>>;
  setJetpacks: React.Dispatch<React.SetStateAction<Jetpack[]>>;
  switchJetpacks: (character: string) => void;
}

export function ShopDrawer({
  characters,
  jetpacks,
  setCharacters,
  setJetpacks,
  switchJetpacks,
}: ShopDrawerProps) {
  const supabase = createClient();
  const { telegramUsername, user, setUserData } = useAppContext();

  // console.log("shop characters", characters);
  // console.log("shop jetpacks", jetpacks);

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
                      if (character.owned) {
                        setCharacters((prev) =>
                          prev.map((char, i) =>
                            char.key === character.key
                              ? { ...char, selected: true }
                              : { ...char, selected: false }
                          )
                        );
                        switchJetpacks(character.key);
                        localStorage.setItem(
                          "selectedCharacter",
                          character.key
                        );
                      }
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
                      alt="Character"
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
                      handleConfirm={async () => {
                        // deduct conso user_points and update users_table game_assets
                        if (user.user_points < character.price) {
                          toast.error("Insufficient CONSO points");
                          return;
                        }
                        const {
                          data: updatedUserData,
                          error: updatedUserError,
                        } = await supabase
                          .from("users_table")
                          .update({
                            user_points: user.user_points - character.price,
                            game_assets: {
                              ...user.game_assets,
                              characters: [
                                ...user.game_assets.characters,
                                character.key,
                              ],
                            },
                          })
                          .eq("username", telegramUsername)
                          .select();
                        if (updatedUserError) {
                          toast.error("There was an error", {
                            className: cn(
                              jersey.className,
                              "text-xl text-white mt-10"
                            ),
                            icon: <ErrorIcon />,
                          });
                          return;
                        } else {
                          toast.success("Purchase successfull", {
                            className: cn(
                              jersey.className,
                              "text-xl text-white mt-10"
                            ),
                            icon: <SuccessIcon />,
                          });

                          setUserData({
                            ...user,
                            game_assets: {
                              ...user.game_assets,
                              characters: [
                                ...user.game_assets.characters,
                                character.key,
                              ],
                            },
                          });

                          // setCharacters((prev) =>
                          //   prev.map((char, i) =>
                          //     i === index
                          //       ? { ...char, selected: true, owned: true }
                          //       : { ...char, selected: false }
                          //   )
                          // );
                          localStorage.setItem(
                            "selectedCharacter",
                            character.key
                          );

                          switchJetpacks(character.key);
                        }
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
                      if (jetpack.owned) {
                        setJetpacks((prev) =>
                          prev.map((jet, i) =>
                            jet.key === jetpack.key
                              ? { ...jet, selected: true }
                              : { ...jet, selected: false }
                          )
                        );

                        localStorage.setItem("selectedJetpack", jetpack.key);
                      }
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
                      handleConfirm={async () => {
                        {
                          // deduct conso user_points and update users_table game_assets
                          if (user.user_points < jetpack.price) {
                            toast.error("Insufficient CONSO points");
                            return;
                          }
                          const {
                            data: updatedUserData,
                            error: updatedUserError,
                          } = await supabase
                            .from("users_table")
                            .update({
                              user_points: user.user_points - jetpack.price,
                              game_assets: {
                                ...user.game_assets,
                                jetpacks: [
                                  ...user.game_assets.jetpacks,
                                  jetpack.key,
                                ],
                              },
                            })
                            .eq("username", telegramUsername)
                            .select();
                          if (updatedUserError) {
                            toast.error("There was an error", {
                              className: cn(
                                jersey.className,
                                "text-xl text-white mt-10"
                              ),
                              icon: <ErrorIcon />,
                            });
                            return;
                          } else {
                            toast.success("Purchase successfull", {
                              className: cn(
                                jersey.className,
                                "text-xl text-white mt-10"
                              ),
                              icon: <SuccessIcon />,
                            });

                            setUserData({
                              ...user,
                              game_assets: {
                                ...user.game_assets,
                                jetpacks: [
                                  ...user.game_assets.jetpacks,
                                  jetpack.key,
                                ],
                              },
                            });

                            // setJetpacks((prev) =>
                            //   prev.map((jet, i) =>
                            //     i === index
                            //       ? { ...jet, selected: true, owned: true }
                            //       : { ...jet, selected: false }
                            //   )
                            // );
                            localStorage.setItem(
                              "selectedJetpack",
                              jetpack.key
                            );
                          }
                        }
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
