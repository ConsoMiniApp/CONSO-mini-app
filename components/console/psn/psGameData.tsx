// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Trophy, Calendar, Gamepad2 } from "lucide-react";
// import Image from "next/image";
// import { GameData } from "@/lib/types";

// export default function PSGameData({ data }: { data: GameData }) {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader className="space-y-4">
//         <div className="flex items-start space-x-4">
//           <div className="relative w-24 h-24 rounded-lg overflow-hidden">
//             <Image
//               src={data.trophyTitleIconUrl}
//               alt={data.trophyTitleName}
//               fill
//               className="object-cover"
//             />
//           </div>
//           <div className="flex-1">
//             <CardTitle className="text-2xl">{data.trophyTitleName}</CardTitle>
//             <div className="flex items-center space-x-2 mt-2">
//               <Badge variant="secondary">{data.trophyTitlePlatform}</Badge>
//               <Badge variant="outline">v{data.trophySetVersion}</Badge>
//             </div>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="space-y-2">
//           <div className="flex justify-between text-sm">
//             <span className="text-muted-foreground">Trophy Progress</span>
//             <span className="font-medium">{data.progress}%</span>
//           </div>
//           <Progress value={data.progress} className="h-2" />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-4">
//             <h3 className="font-semibold flex items-center gap-2">
//               <Trophy className="h-4 w-4" />
//               Earned Trophies
//             </h3>
//             <div className="grid grid-cols-2 gap-2">
//               <TrophyCount
//                 type="platinum"
//                 earned={data.earnedTrophies.platinum}
//                 total={data.definedTrophies.platinum}
//               />
//               <TrophyCount
//                 type="gold"
//                 earned={data.earnedTrophies.gold}
//                 total={data.definedTrophies.gold}
//               />
//               <TrophyCount
//                 type="silver"
//                 earned={data.earnedTrophies.silver}
//                 total={data.definedTrophies.silver}
//               />
//               <TrophyCount
//                 type="bronze"
//                 earned={data.earnedTrophies.bronze}
//                 total={data.definedTrophies.bronze}
//               />
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="font-semibold">Additional Info</h3>
//             <div className="space-y-2 text-sm">
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground">Trophy Groups</span>
//                 <span>{data.trophyGroupCount}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-muted-foreground">Service</span>
//                 <span className="flex gap-2">
//                   {data.npServiceName == "trophy" ? "PS4" : "PS5"}
//                   <Gamepad2 className="w-5 h-5" />
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 text-muted-foreground">
//                 <Calendar className="h-4 w-4" />
//                 <span>
//                   Last Updated: {formatDate(data.lastUpdatedDateTime)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function TrophyCount({
//   type,
//   earned,
//   total,
// }: {
//   type: string;
//   earned: number;
//   total: number;
// }) {
//   const colors: any = {
//     platinum: "bg-zinc-300",
//     gold: "bg-yellow-400",
//     silver: "bg-gray-300",
//     bronze: "bg-orange-600",
//   };

//   return (
//     <div
//       className={`${colors[type]} rounded p-2 text-black flex justify-between items-center`}
//     >
//       <Trophy className="h-4 w-4" />
//       <span className="font-medium">
//         {earned}/{total}
//       </span>
//     </div>
//   );
// }
