"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Miner from "./miner";
import { jersey } from "./ui/fonts";
import Rank from "./rank";
import Play from "./play";
import Tasks from "./tasks";
import Invite from "./invite";
import {
  InviteActive,
  InviteInactive,
  MinerActive,
  MinerInactive,
  PlayActive,
  PlayInactive,
  RankActive,
  RankInactive,
  TaskActive,
  TaskInactive,
} from "./ui/icons";
import { useAppContext } from "@/contexts/AppContext";

export default function BottomTabNavigation() {
  const [activeTab, setActiveTab] = useState("miner");
  const { navigationBarHidden } = useAppContext();

  const tabs = [
    {
      id: "miner",
      label: "Miner",
      icon: <MinerActive />,
      inactive_icon: <MinerInactive />,
    },
    {
      id: "rank",
      label: "Rank",
      icon: <RankActive />,
      inactive_icon: <RankInactive />,
    },
    {
      id: "play",
      label: "Play",
      icon: <PlayActive />,
      inactive_icon: <PlayInactive />,
    },
    {
      id: "task",
      label: "Task",
      icon: <TaskActive />,
      inactive_icon: <TaskInactive />,
    },
    {
      id: "invite",
      label: "Invite",
      icon: <InviteActive />,
      inactive_icon: <InviteInactive />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-[var(--tg-safe-area-inset-top)] bg-black"></div>

      <main className="mt-10">
        {activeTab === "miner" && (
          <div className="space-y-4">
            <Miner />
          </div>
        )}
        {activeTab === "rank" && (
          <div className="">
            <Rank />
          </div>
        )}
        {activeTab === "play" && (
          <div className="space-y-4">
            <Play />
          </div>
        )}
        {activeTab === "task" && (
          <div className="space-y-4">
            <Tasks />
          </div>
        )}
        {activeTab === "invite" && (
          <div className="space-y-4">
            <Invite />
          </div>
        )}
      </main>
      {!navigationBarHidden && (
        <nav className="bg-[#1E2E3D] fixed bottom-0 left-0 right-0 pb-[var(--tg-safe-area-inset-bottom)] ">
          <ul className="flex justify-around items-center h-22 pt-2 ">
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
                  {activeTab == tab.id ? tab.icon : tab.inactive_icon}

                  <span
                    className={cn(
                      jersey.className,
                      activeTab == tab.id
                        ? "text-xl text-[#FFE500] tracking-wider"
                        : "text-xl text-white tracking-wider"
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
