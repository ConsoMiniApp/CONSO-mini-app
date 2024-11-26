"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/steam/getUserData";
import { getGameData } from "@/lib/steam/getGameData";

export default function SteamData() {
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
    console.log("response from api/steam/test-user-data", response.data);
    if (response.data.error) {
      alert("Error fetching user summary");
      setLoading(false);
      return;
    }
    setData(response.data);
    setLoading(false);
  };

  const fetchGamesSummary = async () => {
    console.log("fetching games data");
    setGamesLoading(true);

    const response = await getGameData({
      value: "test_value",
    });

    console.log("response from api/steam/test-game-data", response.data);
    setGamesData(response.data);
    setGamesLoading(false);
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Steam Account Overview</h1>

      <h1 className="text-xl font-bold">User Account Data</h1>

      <Button onClick={fetchUserSummary} disabled={loading}>
        {loading ? "Fetching data..." : "User Summary API Call"}
      </Button>

      {!loading && data && (
        // <SteamUserProfile user={data} />
        <p>User Profile</p>
      )}

      <h1 className="text-xl font-bold">Games Data</h1>

      <Button onClick={fetchGamesSummary} disabled={gamesLoading}>
        {gamesLoading ? "Fetching data..." : "Games Data API Call"}
      </Button>

      {
        !gamesLoading && gamesData && <p>Games Data</p>
        // gamesData.map((game: NintendoGameDataType) => (
        //   <SteamGameData title={game} />
        // ))
      }
    </div>
  );
}
