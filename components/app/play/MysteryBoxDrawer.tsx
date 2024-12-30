import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { ClaimTokenDialog } from "../common/ClaimTokensDialog";

const unclaimedMysteryBoxes = [
  {
    title: "12 DEC",
  },
  {
    title: "12 DEC",
  },
  {
    title: "12 DEC",
  },
  {
    title: "12 DEC",
  },
  {
    title: "12 DEC",
  },
  {
    title: "12 DEC",
  },
];

const claimedMysteryBoxes = [
  {
    title: "POTIONS",
    count: 2,
    image: "/play-logos/potion-logo.svg",
    class:
      "border-2 border-[#00BA64] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#5EEFAC]",
  },
  {
    title: "TOKENS",
    count: 200,
    image: "/other-logos/coin.svg",
    class:
      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#FFF59D]",
  },
  {
    title: "NFT",
    count: 1,
    image: "/other-logos/nft-logo.png",
    class:
      "border-2 border-[#00A3FF] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#71CCFF]",
  },
  {
    title: "POTIONS",
    count: 2,
    image: "/play-logos/potion-logo.svg",
    class:
      "border-2 border-[#00BA64] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#5EEFAC]",
  },
  {
    title: "TOKENS",
    count: 200,
    image: "/other-logos/coin.svg",
    class:
      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#FFF59D]",
  },
  {
    title: "NFT",
    count: 1,
    image: "/other-logos/nft-logo.png",
    class:
      "border-2 border-[#00A3FF] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#71CCFF]",
  },
];

export function MysteryBoxDrawer() {
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
            MYSTERY BOX
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
            Earn NOSY tokens by contributing to the network in various ways.
          </p>
        </div>

        {/* Unclaimed boxes */}
        <div className="flex flex-col justify-between px-2 mt-4 ">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            UNCLAIMED
          </p>
          <div className="grid grid-cols-3 gap-5 mt-4">
            {unclaimedMysteryBoxes.map((box, index) => (
              <Dialog>
                <DialogTrigger>
                  <div
                    key={index}
                    className="border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 "
                  >
                    <p
                      className={cn(
                        handjet.className,
                        "text-xs text-black tracking-widest"
                      )}
                    >
                      {box.title}
                    </p>
                    <Image
                      src={"/play-logos/mystery-box.gif"}
                      alt="Mystery Box"
                      width={47}
                      height={47}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="h-screen border-none backdrop-blur-md">
                  <ClaimTokenDialog
                    handleConfirm={() => console.log("you got 200 tokens")}
                  />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>

        {/* Claimed boxes */}
        <div className="flex flex-col justify-between px-2 mt-4">
          <p
            className={cn(
              handjet.className,
              "text-xl text-black tracking-wider"
            )}
          >
            {" "}
            CLAIMED BOXES
          </p>
          <div className="grid grid-cols-3 gap-5 mt-4">
            {claimedMysteryBoxes.map((box, index) => (
              <div key={index} className={box.class}>
                <p
                  className={cn(
                    handjet.className,
                    "text-xs text-black tracking-widest"
                  )}
                >
                  {box.title}
                </p>
                <Image src={box.image} alt="potion" width={47} height={47} />

                <div
                  className={cn(
                    jersey.className,
                    "absolute bottom-[-18px] left-1/2 transform -translate-x-1/2  px-2 bg-[#DE5EA6] rounded-lg border-2 border-white text-white text-[18px] w-[60%] text-center"
                  )}
                >
                  x {box.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
