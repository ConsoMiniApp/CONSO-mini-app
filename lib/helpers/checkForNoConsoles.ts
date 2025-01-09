import { ConnectedConsole, ConnectedConsoles } from "../types";

export const checkForNoConsoles = (consoles: ConnectedConsoles) => {
  let noConsoles = true;
  if (!consoles) return noConsoles;
  Object.entries(consoles).forEach(
    ([consoleType, consoleData]: [string, ConnectedConsole[]]) => {
      if (consoleData.length > 0) {
        noConsoles = false;
      }
    }
  );
  return noConsoles;
};
