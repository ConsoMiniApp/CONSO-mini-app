"use client";
import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";

export default function Play() {
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    console.log("Current Scene: ", scene);
  };
  return (
    <div>
      {/* <PhaserGame ref={phaserRef} currentActiveScene={currentScene} /> */}
      {/* <div
            className={cn(
              "text-6xl text-white text-center mt-40",
              jersey.className
            )}
          >
            COMING SOON ...
          </div> */}
    </div>
  );
}
