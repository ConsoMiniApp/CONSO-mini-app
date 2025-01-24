import { MAX_PLAYSTATION_BONUS } from "../constants";
import { PlaystationGameData } from "../types";

interface GameData {
  games: PlaystationGameData[];
}

export const calculateGameBonus = (data: GameData) => {
  // if (!data.games.length) return 0; // No games played, bonus is 0

  // const topGames = data.games
  //   .sort((a, b) => b.progress - a.progress) // Sort by progress descending
  //   .slice(0, 5); // Take the top 5 games

  // // console.log("Top games :", topGames);
  // const gamesConsidered = topGames.length;

  // // Calculate weighted average
  // const totalProgress = topGames.reduce(
  //   (acc, game) => acc + game.progress / 100,
  //   0
  // );

  // let weightedAverage = totalProgress / gamesConsidered;

  // // gaming_degen_score
  // let gamingDegenScore = 0;
  // if (weightedAverage > 0.5) {
  //   gamingDegenScore = 1;
  // } else {
  //   gamingDegenScore = weightedAverage * 2;
  // }

  // // console.log("Normalized Weighted average :", weightedAverage);

  // // Adjust if less than 5 games
  // const finalBonus =
  //   (gamesConsidered / 5) * gamingDegenScore * MAX_PLAYSTATION_BONUS;

  return Math.floor(MAX_PLAYSTATION_BONUS / 4);
};
