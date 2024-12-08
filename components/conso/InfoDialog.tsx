import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex500, ibmPlex700, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { CustomButtonType } from "@/lib/types";

export function InfoDialog() {
  return (
    <>
      <div className="overflow-y-scroll scrollbar-always-visible ">
        {/* Top Section */}
        <div className="flex justify-between  ">
          <p
            className={cn(
              handjet.className,
              "text-xl text-[#7C7C7C] tracking-wider"
            )}
          >
            {" "}
            CONSO REWARD SYSTEM
          </p>
          <DialogClose>
            <a>
              <Image
                src="/other-logos/close.svg"
                alt="Advertisement"
                width={24}
                height={24}
              />
            </a>
          </DialogClose>
        </div>

        {/* All Details */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 ">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            Earn CONSO tokens by contributing to the network in various ways.
            Check out the mining rates based on your engagement level:
          </p>

          <div className="ml-1">
            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight flex gap-2"
              )}
            >
              {" "}
              <Image
                src={"/other-logos/console.svg"}
                alt="Console"
                width={24}
                height={14}
              />
              <p
                className={cn(
                  jersey.className,
                  "text-[#DE5EA6] text-xl tracking-wider"
                )}
              >
                CONSOLES:
                <span
                  className={cn(
                    jersey.className,
                    "text-[#A08F00] text-xl tracking-wider"
                  )}
                >
                  {" "}
                  The Data Providers
                </span>
              </p>
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight mt-1 flex gap-2 items-start"
              )}
            >
              <Image
                src={"/other-logos/right-arrow.svg"}
                alt="Console"
                width={24}
                height={14}
              />{" "}
              <p>
                Connected consoles act as data providers, boosting mining rates
                and enriching the ecosystem.
              </p>
            </p>

            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight flex gap-2 mt-3"
              )}
            >
              {" "}
              <Image
                src={"/other-logos/boost.svg"}
                alt="Console"
                width={16}
                height={16}
              />
              <p
                className={cn(
                  jersey.className,
                  "text-[#DE5EA6] text-xl tracking-wider"
                )}
              >
                ACTIVE ENGAGEMENT:
                <span
                  className={cn(
                    jersey.className,
                    "text-[#A08F00] text-xl tracking-wider"
                  )}
                >
                  {" "}
                  Mini App Users
                </span>
              </p>
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight mt-1 flex items-start gap-2"
              )}
            >
              <Image
                src={"/other-logos/right-arrow.svg"}
                alt="Console"
                width={24}
                height={14}
              />{" "}
              <p>
                Earn extra by contributing through gaming, tapping, and watching
                ads.
              </p>
            </p>
          </div>
        </div>

        {/* Bottom Advertiser Info Section */}
        {/* <div className="absolute flex justify-center bottom-0 left-1/2 transform -translate-x-1/2 py-4 bg-white w-full rounded-lg">
          <DialogClose>
            <CustomButton
              type={CustomButtonType.CONNECT}
              text="ACCEPT "
              handleClick={() => {
                localStorage.setItem("termsAccepted", "true");
              }}
              className="text-black"
            ></CustomButton>
          </DialogClose>
        </div> */}
      </div>
    </>
  );
}
