"use client";
import BottomTabNavigation from "@/components/bottom-tab-navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      //@ts-ignore
      console.log("window telegram", window.telegram);
    }
  }, []);
  return (
    <div>
      <BottomTabNavigation />
    </div>
  );
}
