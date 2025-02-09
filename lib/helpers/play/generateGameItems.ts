import {
  CharacterOptionsType,
  MysteryBox,
  PowerUp,
} from "@/components/game/types";
function getRandomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type CharacterOption = "flash" | "angel" | "armor";

export function generateGameItems(): {
  mysteryBoxes: MysteryBox[];
  powerUps: PowerUp[];
} {
  const CharacterOptionsType: CharacterOption[] = ["flash", "angel", "armor"];

  let timestamps = new Set<number>();

  // Generate power-ups
  const numPowerUps = getRandomInRange(2, 3);
  const powerUpTimestamps =
    numPowerUps === 2
      ? [getRandomInRange(30, 90), getRandomInRange(90, 150)]
      : [
          getRandomInRange(30, 90),
          getRandomInRange(110, 150),
          getRandomInRange(170, 210),
        ];

  const powerUps: PowerUp[] = powerUpTimestamps.map((timestamp, index) => {
    timestamps.add(timestamp);
    return {
      character: CharacterOptionsType[index] as CharacterOptionsType,
      time: index === 0 ? 10 : index === 1 ? 5 : 5,
      timestamp,
    };
  });

  // Generate mystery boxes
  const numMysteryBoxes = getRandomInRange(1, 2);
  const mysteryBoxTimestamps =
    numMysteryBoxes === 1
      ? [getRandomInRange(60, 120)]
      : [getRandomInRange(60, 120), getRandomInRange(150, 210)];

  // Ensure minimum 5s gap between power-ups and mystery boxes
  const mysteryBoxes: MysteryBox[] = [];
  for (let i = 0; i < mysteryBoxTimestamps.length; i++) {
    let ts = mysteryBoxTimestamps[i];
    while (Array.from(timestamps).some((t) => Math.abs(t - ts) < 5)) {
      const adjustBy = getRandomInRange(10, 20);
      if (ts - adjustBy >= 60 || ts - adjustBy >= 150) {
        ts -= adjustBy;
      } else {
        ts += adjustBy;
      }
    }
    timestamps.add(ts);
    mysteryBoxes.push({ id: i + 1, timestamp: ts });
  }

  return { mysteryBoxes, powerUps };
}
