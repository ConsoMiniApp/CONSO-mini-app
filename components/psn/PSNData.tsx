"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/psn/getUserData";
import PSUserProfile from "./psUserProfile";
import { getGameData } from "@/lib/psn/getGameData";
import PSGameData from "./psGameData";
import { GameData } from "@/lib/types";

export default function PSNData() {
  const [loading, setLoading] = useState(false);

  const [gamesLoading, setGamesLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [gamesData, setGamesData] = useState<any>();

  const fetchUserSummary = async () => {
    console.log("fetching test data");
    setLoading(true);

    const response = await getUserData({
      value: "test_value",
    });
    console.log("response from api/test-user-data", response.data.data);
    setData(response.data.data);
    setLoading(false);
  };

  const fetchGamesSummary = async () => {
    console.log("fetching games data");
    setGamesLoading(true);

    const response = await getGameData({
      value: "test_value",
    });

    console.log("response from api/test-game-data", response.data.data);
    setGamesData(response.data.data);
    setGamesLoading(false);
  };

  return (
    <div className="container mx-auto  space-y-6">
      <h1 className="text-3xl font-bold">PS Account Overview</h1>

      <h1 className="text-xl font-bold">User Profile Data</h1>

      <Button onClick={fetchUserSummary} disabled={loading}>
        {loading ? "Fetching data..." : "User Summary API Call"}
      </Button>

      {!loading && data && <PSUserProfile data={data} />}

      <h1 className="text-xl font-bold">Games Data</h1>

      <Button onClick={fetchGamesSummary} disabled={gamesLoading}>
        {gamesLoading ? "Fetching data..." : "Games Data API Call"}
      </Button>

      {!gamesLoading &&
        gamesData &&
        gamesData.map((game: GameData) => <PSGameData data={game} />)}
    </div>
  );
}
