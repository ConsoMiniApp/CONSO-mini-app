// Users table

import { ConnectedConsoles } from "@/lib/types";

export function checkConsoles(
  id: number,
  connectedConsoles: ConnectedConsoles
) {
  console.log(connectedConsoles);
  switch (id) {
    case 1:
      return checkTwoDifferentConsolesConnected(connectedConsoles);
      break;
    case 2:
      return checkTwoConsolesFromSameProviderConnected(connectedConsoles);
      break;
    case 3:
      return checkAllSupportedConsolesConnected(connectedConsoles);
      break;
    default:
      return false;
  }
}

// id:1
function checkTwoDifferentConsolesConnected(
  connectedConsoles: ConnectedConsoles
): boolean {
  const connectedConsoleCount = Object.values(connectedConsoles).filter(
    (consoleArray) => consoleArray.length > 0
  ).length;

  return connectedConsoleCount >= 2;
}

// id:2
function checkTwoConsolesFromSameProviderConnected(
  connectedConsoles: ConnectedConsoles
): boolean {
  return Object.values(connectedConsoles).some(
    (consoleArray) => consoleArray.length >= 2
  );
}

// id:3
function checkAllSupportedConsolesConnected(
  connectedConsoles: ConnectedConsoles
): boolean {
  return Object.values(connectedConsoles).every(
    (consoleArray) => consoleArray.length > 0
  );
}
