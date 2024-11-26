import { useState } from "react";
import { Home, Gamepad2, Trophy, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import Leaderboard from "./leaderboard";
import Account from "./account";
import Homepage from "./homepage";
import TestApi from "./psn/PSNData";
import PSData from "./psn/PSNData";

export default function BottomTabNavigation() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "game", icon: Gamepad2, label: "Game" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
    { id: "account", icon: Wallet, label: "Account" },
  ];

  return (
    <div className="min-h-screen pb-16 flex flex-col">
      <main className="flex-1 overflow-y-auto p-4">
        {activeTab === "home" && (
          <div className="space-y-4">
            {/* <h1 className="text-2xl font-bold">Home</h1>
            <p>
              Welcome to the home page. Here you can see featured content, news,
              or a dashboard.
            </p> */}
            <Homepage setActiveTab={setActiveTab} />
          </div>
        )}
        {activeTab === "game" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Game</h1>
            <p>
              This is where you can start playing or view your current games.
            </p>
          </div>
        )}
        {activeTab === "leaderboard" && (
          <div className="space-y-4">
            {/* <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p>Check out the top players and your ranking here.</p> */}
            <Leaderboard />
          </div>
        )}
        {activeTab === "account" && (
          <div className="space-y-4">
            <Account />
            {/* <PSData /> */}
          </div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <ul className="flex justify-around items-center h-16">
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
                <tab.icon className="w-6 h-6" />
                <span className="text-xs">{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
