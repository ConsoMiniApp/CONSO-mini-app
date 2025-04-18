import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";
import {
  CharacterOptionsType,
  EnvironmentOptionsType,
  GameInitSettings,
  JetpackOptionsType,
} from "./types";
import { characterOptions } from "./constants";
import { UnclaimedMysteryBox } from "@/lib/types";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  gameInitSettings: GameInitSettings;
  // updateUserData: (
  //   gameTokensCollected: number,
  //   gameMysteryBoxesCollected: UnclaimedMysteryBox[],
  //   gameDistance: number
  // ) => void;
  exitGame: (
    gameTokensCollected: number,
    gameMysteryBoxesCollected: UnclaimedMysteryBox[],
    gameDistance: number
  ) => Promise<void>;
}

export const PhaserGame = forwardRef<IRefPhaserGame, IProps>(
  function PhaserGame({ currentActiveScene, gameInitSettings, exitGame }, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    console.log(
      "PhaserGame initialized with :",
      gameInitSettings.character,
      gameInitSettings.jetpack,
      gameInitSettings.environment
    );

    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = StartGame("game-container", gameInitSettings);

        if (typeof ref === "function") {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        // console.log("current-scene-ready", scene_instance);
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }

        if (typeof ref === "function") {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
      });
      return () => {
        EventBus.removeListener("current-scene-ready");
      };
    }, [currentActiveScene, ref]);

    useEffect(() => {
      EventBus.on(
        "exit-game",
        (
          scene_instance: Phaser.Scene,
          coinCount: number,
          mysteryBoxes: UnclaimedMysteryBox[],
          distanceTravelled: number
        ) => {
          console.log("exit-game triggered");
          scene_instance.scene.pause();
          scene_instance.scene.stop();
          // console.log(
          //   scene_instance,
          //   coinCount,
          //   mysteryBoxCount,
          //   distanceTravelled
          // );

          exitGame(coinCount, mysteryBoxes, distanceTravelled);
        }
      );
      return () => {
        EventBus.removeListener("exit-game");
      };
    }, [currentActiveScene, ref]);

    return <div id="game-container"></div>;
  }
);
