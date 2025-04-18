import { AUTO } from "phaser";
import * as Phaser from "phaser";
import { MainGame } from "./scenes/MainGame";
import { GameInitSettings } from "./types";
import { GameOver } from "./scenes/GameOver";
import { MysteryBoxCardScene } from "./scenes/card-scenes/MysteryBoxCardScene";
import { ResumeGameCardScene } from "./scenes/card-scenes/ResumeGameCardScene";
import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";

const StartGame = (parent: string, gameInitSettings: GameInitSettings) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1800,
    height: 1000,

    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 1200 },
        debug: process.env.NEXT_PUBLIC_NODE_ENV === "development",
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: "game-container",
    scene: [
      Boot,
      new Preloader(
        gameInitSettings.character,
        gameInitSettings.environment,
        gameInitSettings.jetpack
      ),
      // LoadingScene,
      new MainGame(
        gameInitSettings.character,
        gameInitSettings.environment,
        gameInitSettings.jetpack,
        gameInitSettings.mysteryBoxes,
        gameInitSettings.powerUps
      ),
      GameOver,
      MysteryBoxCardScene,
      ResumeGameCardScene,
    ],
    input: {
      activePointers: 1,
    },
  };
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
