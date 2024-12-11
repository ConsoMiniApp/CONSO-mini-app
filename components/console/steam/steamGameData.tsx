import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Laptop, Gamepad2 } from "lucide-react";
import { XboxGameDataType } from "@/lib/types";
import Image from "next/image";

interface XboxGameDataProps {
  title: XboxGameDataType;
}

export default function SteamGameData({ title }: XboxGameDataProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const screenshots = title.images.filter((img) => img.type === "Screenshot");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title.name}</span>
          <div className="flex space-x-2">
            {title.devices.includes("PC") && <Laptop className="w-5 h-5" />}
            {title.devices.includes("XboxSeries") && (
              <Gamepad2 className="w-5 h-5" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={title.displayImage}
            alt={title.name}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Achievements</h3>
          <Progress
            value={title.achievement.progressPercentage}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              {title.achievement.currentGamerscore} /{" "}
              {title.achievement.totalGamerscore} Gamerscore
            </span>
            <span>{title.achievement.progressPercentage}% Complete</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Game Info</h3>
          <div className="grid grid-cols-2 gap-2">
            <Badge variant="outline">Type: {title.type}</Badge>
            <Badge variant="outline">ID: {title.titleId}</Badge>
            <Badge variant="outline">
              Last Played: {formatDate(title.titleHistory.lastTimePlayed)}
            </Badge>
          </div>
        </div>

        {screenshots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Screenshots</h3>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {screenshots.map((screenshot, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <img
                        src={screenshot.url}
                        alt={`Screenshot ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
