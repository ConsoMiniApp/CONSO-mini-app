import { cn } from "@/lib/utils";
import React from "react";
import { jersey } from "@/components/ui/fonts";
import { CustomButtonType } from "@/lib/types";
import Image from "next/image";

interface ButtonProps {
  type: CustomButtonType;
  handleClick: () => void;
  text?: string;
  className?: string;
}

function getButtonDetails(type: CustomButtonType) {
  switch (type) {
    case CustomButtonType.PRIMARY:
      return {
        buttonText: "Connect",
        buttonTextStyles: cn(jersey.className, "text-xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-yellow.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform",
      };
    case CustomButtonType.PRIMARY_MEDIUM:
      return {
        buttonText: "Connect",
        buttonTextStyles: cn(jersey.className, "text-2xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-md-bg-yellow.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[162px] h-[40px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform",
      };
    case CustomButtonType.PRIMARY_WIDE:
      return {
        buttonText: "",
        buttonTextStyles: cn(jersey.className, "text-2xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-wide-bg-yellow.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[290px] h-[36px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform",
      };
    case CustomButtonType.DISCONNECT:
      return {
        buttonText: "Disconnect",
        buttonTextStyles: cn(jersey.className, "text-xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-red.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer",
      };
    case CustomButtonType.SUCCESS:
      return {
        buttonText: "Mining...",
        buttonTextStyles: cn(jersey.className, "text-xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-green.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer",
      };
    case CustomButtonType.SUCCESS_MEDIUM:
      return {
        buttonText: "Mining...",
        buttonTextStyles: cn(jersey.className, "text-xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-md-bg-green.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[164px] h-[45px] flex justify-center items-center rounded-lg cursor-pointer",
      };
    case CustomButtonType.TASK_COIN_AMOUNT:
      return {
        buttonText: "Mining...",
        buttonTextStyles: cn(jersey.className, "text-xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-green.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer text-black",
        icon: "./other-logos/coin.svg",
      };
    case CustomButtonType.INACTIVE:
      return {
        buttonText: "Soon...",
        buttonTextStyles: cn(
          jersey.className,
          "text-xl tracking-[0.05em]",
          "text-[#CECECE]"
        ),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-gray.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[90px] h-[37px] flex justify-center items-center rounded-lg cursor-pointer",
      };

    default:
      return {
        buttonText: "",
        buttonTextStyles: cn(jersey.className, "text-4xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-invite.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[284px] h-[62px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform",
      };
  }
}

const CustomButton = ({ type, handleClick, text, className }: ButtonProps) => {
  const { buttonText, buttonTextStyles, buttonStyles, buttonClassName, icon } =
    getButtonDetails(type);
  return (
    <a
      className={cn(buttonClassName, className)}
      style={buttonStyles}
      onClick={() => handleClick()}
    >
      {icon && (
        <Image
          src="./other-logos/coin.svg"
          width={20}
          height={20}
          alt=""
          className="inline-block mr-2"
          onClick={() => console.log("Coin")}
        />
      )}
      <span className={buttonTextStyles}>{text ? text : buttonText}</span>
    </a>
  );
};

export default CustomButton;
