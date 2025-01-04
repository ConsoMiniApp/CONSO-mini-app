// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { getUserData } from "@/lib/xbox/getUserData";
// import PSUserProfile from "./xboxUserProfile";
// import { getGameData } from "@/lib/xbox/getGameData";
// import PSGameData from "./xboxGameData";
// import { GameData, XboxGameDataType } from "@/lib/types";
// import XboxUserProfile from "./xboxUserProfile";
// import XboxGameData from "./xboxGameData";

// export default function XboxData() {
//   const [loading, setLoading] = useState(false);

//   const [gamesLoading, setGamesLoading] = useState(false);
//   const [data, setData] = useState<any>();
//   const [gamesData, setGamesData] = useState<any>();

//   const fetchUserSummary = async () => {
//     console.log("fetching test data");
//     setLoading(true);

//     const response = await getUserData({
//       value: "test_value",
//     });
//     console.log("response from api/xbox/test-user-data", response.data);
//     if (response.data.error) {
//       alert("Error fetching user summary");
//       setLoading(false);
//       return;
//     }
//     setData(response.data.profileUsers[0]);
//     setLoading(false);
//   };

//   const fetchGamesSummary = async () => {
//     console.log("fetching games data");
//     setGamesLoading(true);

//     const response = await getGameData({
//       value: "test_value",
//     });

//     console.log("response from api/xbox/test-game-data", response.data);
//     setGamesData(response.data.titles);
//     setGamesLoading(false);
//   };

//   return (
//     <div className="container mx-auto space-y-6">
//       <h1 className="text-3xl font-bold">Xbox Account Overview</h1>

//       <h1 className="text-xl font-bold">User Account Data</h1>

//       <Button onClick={fetchUserSummary} disabled={loading}>
//         {loading ? "Fetching data..." : "User Summary API Call"}
//       </Button>

//       {!loading && data && <XboxUserProfile user={data} />}

//       <h1 className="text-xl font-bold">Games Data</h1>

//       <Button onClick={fetchGamesSummary} disabled={gamesLoading}>
//         {gamesLoading ? "Fetching data..." : "Games Data API Call"}
//       </Button>

//       {!gamesLoading &&
//         gamesData &&
//         gamesData.map((game: XboxGameDataType) => (
//           <XboxGameData title={game} />
//         ))}
//     </div>
//   );
// }
