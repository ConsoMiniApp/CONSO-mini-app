import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import Image from "next/image";
import { ibmPlex, jersey } from "../ui/fonts";
import { cn } from "@/lib/utils";
import CustomButton from "@/components/app/common/CustomButton";
import { CustomButtonType } from "@/lib/types";
import { useRef, useState } from "react";
import { BackIcon, Coin } from "../ui/icons";

interface AdvertisementDialogProps {
  videoSrc: string;
  advertiserInfo: {
    title: string;
    description: string;
    link: string;
    logoUrl: string;
    bgImageUrl: string;
  };
  playSound: () => void;
}

// this dialog shows a video and then advertiser info after the video ends
export function AdvertisementDialogV2({
  videoSrc,
  advertiserInfo,
  playSound,
}: AdvertisementDialogProps) {
  const [showAdInfo, setShowAdInfo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setShowAdInfo(true);
  };

  // const enterFullScreen = () => {
  //   if (videoRef.current) {
  //     if (videoRef.current.requestFullscreen) {
  //       videoRef.current.requestFullscreen();
  //     }
  //   }
  // };

  return (
    <div>
      {!showAdInfo ? (
        <>
          <video
            ref={videoRef}
            src={videoSrc}
            controls={true}
            autoPlay
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onEnded={handleVideoEnd}
            className="rounded-lg bg-black"
            // onLoadedMetadata={enterFullScreen}
          ></video>
          {/* Top Section */}
          <div className="flex justify-end items-center z-10 absolute top-0 left-0 right-0 p-4">
            {/* <Image
              src="/pngs/eigenlayer.png"
              alt="Advertisement"
              width={50}
              height={50}
              className="bg-white rounded-lg p-2"
            /> */}

            <div className="flex gap-2 bg-[#5C6E7E] rounded-full p-2">
              <Coin />
              <p className={cn(jersey.className, "text-2xl text-white")}>
                10 with this ad
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          {/* Top Section */}
          <div className="flex justify-between items-center z-10 absolute top-0 left-0 right-0 p-4">
            <DialogClose>
              <a className="">
                <div
                  onClick={() => {
                    setTimeout(() => {
                      playSound();
                    }, 1000);
                  }}
                >
                  <BackIcon />
                </div>
              </a>
            </DialogClose>

            <div className="flex gap-2 bg-black rounded-full p-2">
              <Coin />
              <p className={cn(jersey.className, "text-2xl text-white")}>
                10 with this ad
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={advertiserInfo.bgImageUrl}
              alt="Advertisement Background"
              layout="fill"
              objectFit="cover"
              className="z-[-1] "
            />
          </div>

          {/* Bottom Advertiser Info Section */}
          <div className="bg-black w-full h-[250px] absolute bottom-0 left-0">
            <Image
              className="relative left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4"
              src={advertiserInfo.logoUrl}
              alt="Advertiser Logo"
              width={120}
              height={120}
            />
            <div className="flex flex-col gap-2 text-white items-center justify-start">
              <p className={cn(jersey.className, "text-4xl mt-[-50px] ")}>
                {advertiserInfo.title}
              </p>
              <p
                className={cn(
                  ibmPlex.className,
                  "text-sm w-[50%] text-center mb-2"
                )}
              >
                {advertiserInfo.description}
              </p>
              <CustomButton
                type={CustomButtonType.PRIMARY}
                text="GET"
                handleClick={() => {
                  console.log("GET", advertiserInfo.link);
                  // open advertiserInfo.link
                  window.open(advertiserInfo.link, "_blank");
                }}
                className="text-black"
              ></CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
