"use client";
import Link from "next/link";
import { Trophy, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Homepage({
  setActiveTab,
}: {
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const [window, setWindow] = useState();
  const featuredGames = [
    {
      id: 1,
      name: "Crypto Clash",
      players: 10000,
      image: "/icon3.svg",
    },
    {
      id: 2,
      name: "Blockchain Battles",
      players: 8500,
      image: "/icon2.svg",
    },
    {
      id: 3,
      name: "NFT Legends",
      players: 7200,
      image: "/icon1.svg",
    },
  ];

  const topPlayers = [
    { rank: 1, name: "CryptoChamp", points: 10000 },
    { rank: 2, name: "BlockMaster", points: 9500 },
    { rank: 3, name: "TokenWarrior", points: 9000 },
  ];

  useEffect(() => {
    console.log("telegram mini app useEffect");
    //@ts-ignore
    console.log("window telegram ", Telegram);
    setWindow(window);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <p>{JSON.stringify(window)}</p>
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to <span className="text-primary">CONSO</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Play, earn, and trade in the next generation of blockchain gaming.
        </p>
        <div className="flex justify-center gap-4">
          {/* <Button size="lg" onClick={() => router.push()}>
            Test New Tab
          </Button> */}
          <a target="__blank" href="https://google.com">
            Test link
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setActiveTab("account")}
          >
            Create Account
          </Button>
        </div>
      </section>

      {/* Featured Games */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <Card key={game.id}>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>
                  {game.players.toLocaleString()} players online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={game.image}
                  alt={game.name}
                  className="w-full object-cover rounded-lg"
                  height={20}
                  width={20}
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full">Play Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Top Players</h2>
          <Button variant="outline" asChild>
            <Link href="/leaderboard">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPlayers.map((player) => (
            <Card key={player.rank}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy
                    className={`h-5 w-5 ${
                      player.rank === 1
                        ? "text-yellow-500"
                        : player.rank === 2
                        ? "text-gray-400"
                        : "text-amber-600"
                    }`}
                  />
                  {player.name}
                </CardTitle>
                <CardDescription>Rank #{player.rank}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-lg">
                  {player.points.toLocaleString()} points
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Create an account now and start your journey in the world of
          blockchain gaming.
        </p>
        <Button size="lg" onClick={() => setActiveTab("account")}>
          <User className="mr-2 h-5 w-5" />
          Create Account
        </Button>
      </section>
    </div>
  );
}
