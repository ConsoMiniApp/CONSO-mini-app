import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Info } from "lucide-react";

export default function PSUserProfile({ data }: any) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">PS User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={data.profile.avatarUrls[0].avatarUrl}
                  alt={data.profile.onlineId}
                />
                <AvatarFallback>
                  {data.profile.onlineId.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{data.profile.onlineId}</h2>
                <p className="text-muted-foreground">
                  {data.profile.personalDetail.firstName}{" "}
                  {data.profile.personalDetail.lastName}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">Account ID:</span>{" "}
                {data.profile.accountId}
              </div>
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold">About Me:</span>{" "}
                {data.profile.aboutMe || "No description provided"}
              </div>
            </div>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Trophies Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Level:</span>
                <Badge variant="secondary">
                  {data.profile.trophySummary.level}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <Badge variant="secondary">
                  {data.profile.trophySummary.progress}%
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <TrophyBadge
                  type="platinum"
                  count={data.profile.trophySummary.earnedTrophies.platinum}
                />
                <TrophyBadge
                  type="gold"
                  count={data.profile.trophySummary.earnedTrophies.gold}
                />
                <TrophyBadge
                  type="silver"
                  count={data.profile.trophySummary.earnedTrophies.silver}
                />
                <TrophyBadge
                  type="bronze"
                  count={data.profile.trophySummary.earnedTrophies.bronze}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrophyBadge({ type, count }: any) {
  const colors: any = {
    platinum: "bg-zinc-300",
    gold: "bg-yellow-400",
    silver: "bg-gray-300",
    bronze: "bg-orange-600",
  };

  return (
    <div
      className={`flex items-center justify-between p-2 rounded ${colors[type]} text-black`}
    >
      <Trophy className="w-4 h-4" />
      <span className="font-semibold">{count}</span>
    </div>
  );
}
