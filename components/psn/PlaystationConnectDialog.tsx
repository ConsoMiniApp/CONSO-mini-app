import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "../conso/CustomButton";
import { CustomButtonType } from "@/lib/types";

export function PlayStationConnectDialog() {
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none ">
        {/* <DialogClose className="absolute top-0 right-0 p-2 ">
          <Image
            src="/other-logos/close.svg"
            alt="Advertisement"
            width={24}
            height={24}
          />
        </DialogClose> */}
        {/* Top Status Card */}
        <div className="p-4 rounded-3xl border-2 shadow-lg bg-black border-neutral-800">
          <div className="flex justify-between ">
            <DialogClose>
              <Image
                src="/other-logos/back-arrow.svg"
                width={32}
                height={32}
                alt="Back"
              />
            </DialogClose>
            <span className={cn("text-6xl text-white ", jersey.className)}>
              CONSO
            </span>
            <div className="w-8"></div>
          </div>
          {/* Console Details */}
          <div
            className={cn(
              " flex flex-col gap-2 justify-center items-center mt-4"
            )}
          >
            <p
              className={cn(
                "text-[#DE5EA6] text-2xl text-nowrap tracking-wider",
                jersey.className
              )}
            >
              CONNECT CONSOLE
            </p>

            <p
              className={cn(
                "text-white text-2xl text-nowrap tracking-wider",
                jersey.className
              )}
            >
              PlayStation
            </p>
            <Image
              src={"console-logos/playstation-pixelated.svg"}
              height={120}
              width={120}
              alt="PlayStation"
            />

            <p
              className={cn(
                "text-[#FFE500] text-2xl text-nowrap tracking-wider",
                jersey.className
              )}
            >
              4.5x Boost
            </p>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="p-4 mt-4 rounded-3xl shadow-lg bg-white ">
          <div className="flex justify-between px-2">
            <p
              className={cn(
                handjet.className,
                "text-xl text-[#7C7C7C] tracking-wider"
              )}
            >
              {" "}
              INSTRUCTIONS
            </p>
            <div className="flex gap-2">
              <Image
                src="/other-logos/youtube.svg"
                width={26}
                height={19}
                alt="Delete"
                onClick={() => console.log("Delete")}
              />
              <a
                href="https://youtu.be"
                target="__blank"
                className={cn(
                  jersey.className,
                  "text-[#002E87] text-lg underline"
                )}
              >
                Tutorial
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 px-2 mt-3">
            {/* Console Connected Card */}
            <div className=" flex flex-col gap-3 tracking-tighter">
              <p className={cn(ibmPlex500.className, " text-xs flex gap-1")}>
                <span
                  className={cn(ibmPlex700.className, "text-xs text-black")}
                >
                  1.{" "}
                </span>
                <span>
                  Visit
                  <a
                    href="https://www.playstation.com"
                    target="__blank"
                    className="underline text-[#002E87]"
                  >
                    https://www.playstation.com
                  </a>{" "}
                  and sign in.
                </span>
              </p>

              <p className={cn(ibmPlex500.className, " text-xs flex gap-1")}>
                <span
                  className={cn(ibmPlex700.className, "text-xs text-black")}
                >
                  2.{" "}
                </span>
                <span>
                  Get your "npsso" code from -
                  <a
                    href="https://ca.account.sony.com/api/v1/ssocookie"
                    target="__blank"
                    className="underline text-[#002E87]"
                  >
                    https://ca.account.sony.com/api/v1/ssocookie
                  </a>{" "}
                </span>
              </p>

              <p className={cn(ibmPlex500.className, " text-xs flex gap-1")}>
                <span
                  className={cn(ibmPlex700.className, "text-xs text-black")}
                >
                  3.{" "}
                </span>
                <span>Enter 64 character “npsso” code :</span>
              </p>
              <form className="flex flex-col gap-4 ">
                <input
                  type="text"
                  placeholder="YOUR_NPSSO_CODE"
                  className={cn(
                    "border-2 border-gray-400 bg-[#D7D7D7] rounded-lg p-2  ml-4 text-xs tracking-wider mr-2",
                    ibmPlex500.className
                  )}
                />

                <p
                  className={cn(
                    ibmPlex500.className,
                    " text-[11px] text-[#7C7C7C] tracking-tighter ml-4"
                  )}
                >
                  PlayStation Console holders will act as NODES, contributing
                  data and mining tokens with a 2.5x BOOST multiplier over the
                  base rate.
                </p>

                <div className="flex justify-center mt-2">
                  <CustomButton
                    text="CONNECT PLAYSTATION"
                    type={CustomButtonType.CONSOLE_CONNECT}
                    handleClick={() => {
                      console.log("Connect PlayStation");
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Empty Space */}
        <br />
      </div>
    </>
  );
}
