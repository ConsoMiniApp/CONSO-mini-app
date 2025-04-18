import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "@/components/ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { BackArrow, SuccessIcon } from "@/components/ui/icons";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function NintendoConnectDialog() {
  // scroll to top of screen on component load
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none mt-12">
        {/* Top Status Card */}
        <div className="p-4 rounded-3xl border-2 shadow-lg bg-black border-neutral-800">
          <div className="flex justify-between ">
            <DialogClose>
              <BackArrow />
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
              Nintendo
            </p>
            <Image
              src={"console-logos/nintendo-pixelated.svg"}
              height={120}
              width={120}
              alt="Nintendo"
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

          <div className="flex flex-col gap-3 px-1 mt-3">
            {/* Console Connected Card */}
            <div className=" flex flex-col gap-3 tracking-tighter">
              {/* <p className={cn(ibmPlex500.className, " text-xs")}>
                <span
                  className={cn(ibmPlex700.className, "text-xs text-black")}
                >
                  1.{" "}
                </span>
                Log in to{" "}
                <a
                  href="https://xbl.io"
                  target="__blank"
                  className="underline text-[#002E87]"
                >
                  https://xbl.io
                </a>{" "}
                and create an API key.
              </p> */}

              <p className={cn(ibmPlex500.className, " text-xs")}>
                <span
                  className={cn(ibmPlex700.className, "text-xs text-black")}
                >
                  1.{" "}
                </span>
                Enter your Nintendo Console - Serial Number.
              </p>
              <form className="flex flex-col gap-4 ">
                <input
                  type="text"
                  placeholder="YOUR_SERIAL_NUMBER"
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
                  Xbox Console holders will act as NODES, contributing data and
                  mining tokens with a 2.5x BOOST multiplier over the base rate.
                </p>

                <div className="flex justify-center mt-2">
                  <CustomButton
                    text="CONNECT NINTENDO"
                    type={CustomButtonType.PRIMARY_WIDE}
                    handleClick={() => {
                      console.log("Connect Nintendo");
                      toast("Nintendo Connected.", {
                        className: cn(jersey.className, "text-xl text-white"),
                        icon: <SuccessIcon />,
                      });
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
