import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { handjet, ibmPlex, ibmPlex500, ibmPlex700, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { Close } from "../ui/icons";

export function TermsDisclaimer() {
  return (
    <>
      <div className="overflow-y-scroll scrollbar-none  ">
        {/* Top Section */}
        <div className="flex justify-between  ">
          <p
            className={cn(
              handjet.className,
              "text-xl text-[#7C7C7C] tracking-wider"
            )}
          >
            {" "}
            TERMS & CONDITIONS
          </p>
          <DialogClose>
            <Close />
          </DialogClose>
        </div>

        {/* All Details */}
        <div className="flex flex-col space-y-4 text-black mt-2 mr-2 ">
          <p className={cn(ibmPlex500.className, "text-xs tracking-tight")}>
            {" "}
            By using the CONSO app, you agree to the following terms:
          </p>

          <div className="ml-1">
            <p className={cn(ibmPlex700.className, "text-xs tracking-tight ")}>
              {" "}
              1. Data Privacy:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1"
              )}
            >
              {" "}
              CONSO does not store your API keys. They are solely used to verify
              console ownership and understand gaming preferences.
            </p>

            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight mt-3"
              )}
            >
              {" "}
              2. Decentralized & Secure:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1"
              )}
            >
              {" "}
              Your data remains safe in our decentralized system, with no
              intermediaries holding control or access to your personal data.
            </p>
            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight mt-3"
              )}
            >
              {" "}
              3. Purpose of Data:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1"
              )}
            >
              {" "}
              We use data to personalize in-app ads and sponsorships, enhancing
              your experience with relevant content.
            </p>
            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight mt-3"
              )}
            >
              {" "}
              4. Earnings:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1"
              )}
            >
              {" "}
              Rewards are based on your activity and contributions to the NOSY
              ecosystem.
            </p>
            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight mt-3"
              )}
            >
              {" "}
              5. Consent & Opt-Out:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1"
              )}
            >
              {" "}
              By linking your console, you consent to these practices. You can
              disconnect or adjust data-sharing preferences at any time.
            </p>
            <p
              className={cn(
                ibmPlex700.className,
                "text-xs tracking-tight mt-3"
              )}
            >
              {" "}
              6. Questions:
            </p>
            <p
              className={cn(
                ibmPlex500.className,
                "text-xs tracking-tight ml-5 mt-1 mb-16"
              )}
            >
              {" "}
              For any privacy concerns, please contact support@consoapp.com.
            </p>
          </div>
        </div>

        {/* Bottom Advertiser Info Section */}
        <div className="absolute flex justify-center bottom-0 left-1/2 transform -translate-x-1/2 py-4 bg-white w-full rounded-lg">
          <DialogClose>
            <CustomButton
              type={CustomButtonType.PRIMARY}
              text="ACCEPT "
              handleClick={() => {
                localStorage.setItem("termsAccepted", "true");
              }}
              className="text-black"
            ></CustomButton>
          </DialogClose>
        </div>
      </div>
    </>
  );
}
