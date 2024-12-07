import { cn } from "@/lib/utils";
import React from "react";
import { jersey } from "../ui/fonts";
import { CustomButtonType } from "@/lib/types";

interface ButtonProps {
  type: CustomButtonType;
  handleClick: () => void;
  text?: string;
  className?: string;
}

function getButtonDetails(type: CustomButtonType) {
  switch (type) {
    case CustomButtonType.CONNECT:
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
    case CustomButtonType.MINING:
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
    case CustomButtonType.SOON:
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
        buttonTextStyles: cn(jersey.className, "text-2xl tracking-[0.05em]"),
        buttonStyles: {
          backgroundImage: "url('/other-logos/button-bg-invite.svg')",
          backgroundSize: "cover",
        },
        buttonClassName:
          "w-[184px] h-[40px] flex justify-center items-center rounded-lg cursor-pointer hover:opacity-90 hover:scale-95 transition-transform",
      };
  }
}

const CustomButton = ({ type, handleClick, text, className }: ButtonProps) => {
  const { buttonText, buttonTextStyles, buttonStyles, buttonClassName } =
    getButtonDetails(type);
  return (
    <a
      className={cn(buttonClassName, className)}
      style={buttonStyles}
      onClick={() => handleClick()}
    >
      <span className={buttonTextStyles}>{text ? text : buttonText}</span>
    </a>
  );
};

export default CustomButton;
