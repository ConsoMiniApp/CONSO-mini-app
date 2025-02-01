import { allGameMissions } from "@/lib/constants";

import { ConnectedConsoles } from "@/lib/types";
// TO DO : check which game missions out of all game missions are completed

export function checkGameMissions(
  id: number,
  connectedConsoles: ConnectedConsoles
) {
  console.log(connectedConsoles);
  switch (id) {
    case 1:
      return chekGameRunInMeters(connectedConsoles);
      break;
    case 2:
      return collectThreeMysteryBoxes(connectedConsoles);
      break;
    case 3:
      return collectAllSkins(connectedConsoles);
      break;
    case 4:
      return collectAllJetpacks(connectedConsoles);
      break;
    default:
      return false;
  }
}

// id:1
function chekGameRunInMeters(connectedConsoles: ConnectedConsoles): boolean {
  const connectedConsoleCount = Object.values(connectedConsoles).filter(
    (consoleArray) => consoleArray.length > 0
  ).length;

  return connectedConsoleCount >= 2;
}

// id:2
function collectThreeMysteryBoxes(
  connectedConsoles: ConnectedConsoles
): boolean {
  return Object.values(connectedConsoles).some(
    (consoleArray) => consoleArray.length >= 2
  );
}

// id:3
function collectAllSkins(connectedConsoles: ConnectedConsoles): boolean {
  return Object.values(connectedConsoles).every(
    (consoleArray) => consoleArray.length > 0
  );
}

// id:4
function collectAllJetpacks(connectedConsoles: ConnectedConsoles): boolean {
  return Object.values(connectedConsoles).every(
    (consoleArray) => consoleArray.length > 0
  );
}
