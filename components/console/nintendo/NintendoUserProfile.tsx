import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, User, Shield, MapPin, Info } from "lucide-react";
import { NintendoUserData } from "@/lib/types";

interface UserProfileProps {
  user: NintendoUserData;
}

export default function NintendoUserProfile({ user }: UserProfileProps) {
  const { settings } = user;
  const getSetting = (id: string) =>
    settings.find((s) => s.id === id)?.value || "";
  const preferredColor =
    getSetting("PreferredColor").split("/").pop()?.split(".")[0] || "00000";

  console.log("user", user);

  return <>Nintendo User Profile Data</>;
}

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
