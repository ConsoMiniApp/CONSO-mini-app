import { useEffect, useState } from "react";
import { Wallet, Coins, Clock, Gamepad2, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PSNData from "./psn/PSNData";
import XboxData from "./xbox/xboxData";
import SteamData from "./steam/steamData";
import NintendoData from "./nintendo/NintendoData";

type GamingAccount = {
  platform: string;
  connected: boolean;
  icon: React.ElementType;
};

export default function Account() {
  const [walletBalance, setWalletBalance] = useState(0.06);
  const [tokenBalance, setTokenBalance] = useState(5000);
  const [showPSNData, setShowPSNData] = useState(false);
  const [showXboxData, setShowXboxData] = useState(false);
  const [showSteamData, setShowSteamData] = useState(false);
  const [showNintendoData, setShowNintendoData] = useState(false);

  const [gamingAccounts, setGamingAccounts] = useState<GamingAccount[]>([
    { platform: "PlayStation 5", connected: true, icon: Gamepad2 },
    { platform: "Xbox", connected: true, icon: Gamepad2 },
    { platform: "Nintendo Switch", connected: true, icon: Gamepad2 },
    { platform: "Steam", connected: true, icon: Gamepad2 },
  ]);

  const handleGamingAccountClick = (platform: string) => {
    console.log(`Clicked on ${platform}`);
    if (platform === "PlayStation 5") {
      setShowPSNData(!showPSNData);
    }
    if (platform === "Xbox") {
      setShowXboxData(!showXboxData);
    }
    if (platform === "Steam") {
      setShowSteamData(!showSteamData);
    }
    if (platform === "Nintendo Switch") {
      setShowNintendoData(!showNintendoData);
    }
  };

  useEffect(() => {
    // Fetch wallet balance from the blockchain
    // Fetch token balance from the blockchain
    // Fetch total points from the game server
    // Fetch time played from the game server
    setWalletBalance(0.06);
    setTokenBalance(5000);
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Account Overview</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
            <CardDescription>Your current wallet balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Wallet className="mr-2 h-6 w-6" />
              {walletBalance.toFixed(2)} ETH
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CONSO Token Balance</CardTitle>
            <CardDescription>Your game tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center">
              <Coins className="mr-2 h-6 w-6" />
              {tokenBalance.toLocaleString()} CONSO
            </div>
          </CardContent>
        </Card>
      </div>

      {showPSNData && (
        <>
          <Button onClick={() => setShowPSNData(false)} variant={"outline"}>
            Go Back
          </Button>
          <PSNData />
        </>
      )}
      {showXboxData && (
        <>
          <Button onClick={() => setShowXboxData(false)} variant={"outline"}>
            Go Back
          </Button>
          <XboxData />
        </>
      )}
      {showSteamData && (
        <>
          <Button onClick={() => setShowSteamData(false)} variant={"outline"}>
            Go Back
          </Button>
          <SteamData />
        </>
      )}
      {showNintendoData && (
        <>
          <Button
            onClick={() => setShowNintendoData(false)}
            variant={"outline"}
          >
            Go Back
          </Button>
          <NintendoData />
        </>
      )}

      {!showPSNData && !showXboxData && !showSteamData && !showNintendoData && (
        <Card>
          <CardHeader>
            <CardTitle>Gaming Accounts</CardTitle>
            <CardDescription>Connect your gaming platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gamingAccounts.map((account, index) => (
                <div
                  key={account.platform}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <account.icon className="h-5 w-5" />
                    <Label htmlFor={`${account.platform}-toggle`}>
                      {account.platform}
                    </Label>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleGamingAccountClick(account.platform)}
                  >
                    {account.connected ? "View Data" : "Connect"}
                  </Button>
                  {/* <Switch
                  id={`${account.platform}-toggle`}
                  checked={account.connected}
                  onCheckedChange={() => toggleConnection(index)}
                /> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
