// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Trophy, User, Shield, MapPin, Info } from "lucide-react";
// import { XboxUserData } from "@/lib/types";

// interface UserProfileProps {
//   user: XboxUserData;
// }

// export default function SteamUserProfile({ user }: UserProfileProps) {
//   const { settings } = user;
//   const getSetting = (id: string) =>
//     settings.find((s) => s.id === id)?.value || "";
//   const preferredColor =
//     getSetting("PreferredColor").split("/").pop()?.split(".")[0] || "00000";

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="flex flex-col items-center space-y-4">
//         <Avatar className="w-32 h-32">
//           <AvatarImage
//             src={getSetting("GameDisplayPicRaw")}
//             alt={getSetting("Gamertag")}
//           />
//           <AvatarFallback>
//             {getSetting("Gamertag").slice(0, 2).toUpperCase()}
//           </AvatarFallback>
//         </Avatar>
//         <div className="text-center">
//           <h2 className="text-2xl font-bold">{getSetting("Gamertag")}</h2>
//           <p className="text-muted-foreground">{getSetting("RealName")}</p>
//         </div>
//         <Badge
//           style={{
//             backgroundColor: `#${preferredColor}`,
//             color: parseInt(preferredColor, 16) > 0x7fffff ? "black" : "white",
//           }}
//         >
//           {getSetting("AccountTier")}
//         </Badge>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Trophy className="w-5 h-5 text-yellow-500" />
//             <span className="font-semibold">Gamerscore</span>
//           </div>
//           <span>{getSetting("Gamerscore")}</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <User className="w-5 h-5 text-blue-500" />
//             <span className="font-semibold">Account Tier</span>
//           </div>
//           <span>{getSetting("AccountTier")}</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Shield className="w-5 h-5 text-green-500" />
//             <span className="font-semibold">Reputation</span>
//           </div>
//           <span>{getSetting("XboxOneRep")}</span>
//         </div>
//         {getSetting("Location") && (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <MapPin className="w-5 h-5 text-red-500" />
//               <span className="font-semibold">Location</span>
//             </div>
//             <span>{getSetting("Location")}</span>
//           </div>
//         )}
//         {getSetting("Bio") && (
//           <div className="mt-4">
//             <div className="flex items-center space-x-2 mb-2">
//               <Info className="w-5 h-5 text-purple-500" />
//               <span className="font-semibold">Bio</span>
//             </div>
//             <p className="text-sm text-muted-foreground">{getSetting("Bio")}</p>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// const defaultUser: UserData = {
//     "id": "2535462061975238",
//     "hostId": "2535462061975238",
//     "settings": [
//         {
//             "id": "GameDisplayPicRaw",
//             "value": "https://images-eds-ssl.xboxlive.com/image?url=wHwbXKif8cus8csoZ03RWwcxuUQ9WVT6xh5XaeeZD02wEfGZeuD.XMoGFVYkwHDqVhmWOj.Y1531UzdO7F7GgEAoSiL66ik4oV.70yKP9QeTye32xNPLkuJQ4xiV_p0OGOwA09YHBE.und08dSq34uAmCncp_81C_SapVNMHaCY-&format=png"
//         },
//         {
//             "id": "Gamerscore",
//             "value": "17936"
//         },
//         {
//             "id": "Gamertag",
//             "value": "LostPirate9913"
//         },
//         {
//             "id": "AccountTier",
//             "value": "Gold"
//         },
//         {
//             "id": "XboxOneRep",
//             "value": "GoodPlayer"
//         },
//         {
//             "id": "PreferredColor",
//             "value": "https://dlassets-ssl.xboxlive.com/public/content/ppl/colors/00014.json"
//         },
//         {
//             "id": "RealName",
//             "value": "Suresh Santhanam"
//         },
//         {
//             "id": "Bio",
//             "value": ""
//         },
//         {
//             "id": "Location",
//             "value": ""
//         }
//     ],
//     "isSponsoredUser": false
// }
