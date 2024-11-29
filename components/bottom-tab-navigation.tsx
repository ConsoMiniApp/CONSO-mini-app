import { useState } from "react";
import { Home, Gamepad2, Trophy, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Leaderboard from "./leaderboard";
import Account from "./account";
import Homepage from "./homepage";
import TestApi from "./psn/PSNData";
import PSData from "./psn/PSNData";
import Image from "next/image";
import Miner from "./miner";
import { jersey } from "./ui/fonts";

export default function BottomTabNavigation() {
  const [activeTab, setActiveTab] = useState("miner");

  const tabs = [
    {
      id: "miner",
      label: "Miner",
      icon: "/navigation-logos/miner-active.svg",
      inactive_icon: "/navigation-logos/miner-inactive.svg",
    },
    {
      id: "rank",
      label: "Rank",
      icon: "/navigation-logos/rank-active.svg",
      inactive_icon: "/navigation-logos/rank-inactive.svg",
    },
    {
      id: "play",
      label: "Play",
      icon: "/navigation-logos/play-active.svg",
      inactive_icon: "/navigation-logos/play-inactive.svg",
    },
    {
      id: "task",
      label: "Task",
      icon: "/navigation-logos/task-active.svg",
      inactive_icon: "/navigation-logos/task-inactive.svg",
    },
    {
      id: "invite",
      label: "Invite",
      icon: "/navigation-logos/invite-active.svg",
      inactive_icon: "/navigation-logos/invite-inactive.svg",
    },
  ];

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      <main className="flex-1 overflow-y-auto">
        {activeTab === "miner" && (
          <div className="space-y-4">
            <Miner />
          </div>
        )}
        {activeTab === "rank" && (
          <div className="space-y-4">
            <h1 className={cn(`text-5xl  `, jersey.className)}>Game</h1>
            <p>
              This is where you can start playing or view your current games.
            </p>
          </div>
        )}
        {activeTab === "play" && (
          <div className="space-y-4">
            {/* <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p>Check out the top players and your ranking here.</p> */}
            <Leaderboard />
          </div>
        )}
        {activeTab === "task" && (
          <div className="space-y-4">
            <Account />
            {/* <PSData /> */}
          </div>
        )}
        {activeTab === "invite" && (
          <div className="space-y-4">
            <Account />
            {/* <PSData /> */}
          </div>
        )}
      </main>

      <nav className="bg-[#1E2E3D] fixed bottom-0 left-0 right-0 border-border">
        <ul className="flex justify-around items-center h-24">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full h-full flex flex-col items-center justify-center space-y-1",
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <Image
                  src={activeTab == tab.id ? tab.icon : tab.inactive_icon}
                  width={50}
                  height={50}
                  alt="Miner"
                  className="mb-1"
                />
                <span
                  className={cn(
                    jersey.className,
                    activeTab == tab.id
                      ? "text-xl text-[#FFE500]"
                      : "text-lg text-white"
                  )}
                >
                  {tab.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
