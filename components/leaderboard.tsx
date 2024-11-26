import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Coins } from "lucide-react";

type Player = {
  rank: number;
  name: string;
  points: number;
  tokens: number;
};

const players: Player[] = [
  { rank: 1, name: "CryptoChamp", points: 10000, tokens: 500 },
  { rank: 2, name: "BlockMaster", points: 9500, tokens: 475 },
  { rank: 3, name: "TokenWarrior", points: 9000, tokens: 450 },
  { rank: 4, name: "ChainBreaker", points: 8500, tokens: 425 },
  { rank: 5, name: "NFTNinja", points: 8000, tokens: 400 },
  { rank: 6, name: "CoinCrusader", points: 7500, tokens: 375 },
  { rank: 7, name: "DeFiDuke", points: 7000, tokens: 350 },
  { rank: 8, name: "CryptoKing", points: 6500, tokens: 325 },
  { rank: 9, name: "TokenTamer", points: 6000, tokens: 300 },
  { rank: 10, name: "Coin", points: 5500, tokens: 275 },
  { rank: 11, name: "NFTKnight", points: 5000, tokens: 250 },
  { rank: 12, name: "Chain", points: 4500, tokens: 225 },
  { rank: 13, name: "DeFiDuchess", points: 4000, tokens: 200 },
  { rank: 14, name: "CryptoQueen", points: 3500, tokens: 175 },
  { rank: 15, name: "TokenTracker", points: 3000, tokens: 150 },
  // Add more players as needed
];

export default function Leaderboard() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          <Trophy className="inline-block mr-2 text-yellow-500" />
          Game Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Tokens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.rank}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">
                  {player.rank === 1 && (
                    <Trophy className="inline-block mr-1 text-yellow-500" />
                  )}
                  {player.rank === 2 && (
                    <Trophy className="inline-block mr-1 text-gray-400" />
                  )}
                  {player.rank === 3 && (
                    <Trophy className="inline-block mr-1 text-amber-600" />
                  )}
                  {/* {player.rank} */}
                </TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="font-mono">
                    {player.points.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="font-mono">
                    <Coins className="inline-block mr-1 h-3 w-3" />
                    {player.tokens.toLocaleString()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
