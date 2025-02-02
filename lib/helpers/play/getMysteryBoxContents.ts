import { mysteryBoxTypes } from "@/lib/constants";

interface MysteryBoxContents {
  consoPoints: number;
  gamePotions: number;
}

export function getMysteryBoxContents(
  mysteryBoxId: number
): MysteryBoxContents {
  const mysteryBox = mysteryBoxTypes[mysteryBoxId];
  switch (mysteryBox.type) {
    case "potion":
      return {
        consoPoints: 0,
        gamePotions: mysteryBox.quantity,
      };
    case "coin":
      return {
        consoPoints: mysteryBox.quantity,
        gamePotions: 0,
      };
    case "nft":
      return {
        consoPoints: 0,
        gamePotions: 0,
      };
    default:
      return {
        consoPoints: 0,
        gamePotions: 0,
      };
  }
}
