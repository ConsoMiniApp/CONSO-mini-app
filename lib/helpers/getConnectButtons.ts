import { ConnectedConsole, ConnectedConsoles, ConsoleType } from "../types";
import { CustomButtonType } from "../types";

export const defaultConnectButtons = {
  playstation: CustomButtonType.PRIMARY,
  xbox: CustomButtonType.PRIMARY,
  nintendo: CustomButtonType.PRIMARY,
  steam: CustomButtonType.PRIMARY,
  bitboy: CustomButtonType.INACTIVE,
  sui: CustomButtonType.INACTIVE,
};

export function getConnectButtons(connectedConsoles: ConnectedConsoles) {
  let connectButtons = { ...defaultConnectButtons };
  connectButtons.playstation =
    connectedConsoles.playstation !== undefined &&
    connectedConsoles.playstation.length > 0
      ? checkIfAtleastOneConsoleIsMining(connectedConsoles.playstation)
      : CustomButtonType.PRIMARY;
  connectButtons.xbox =
    connectedConsoles.xbox !== undefined && connectedConsoles.xbox.length > 0
      ? checkIfAtleastOneConsoleIsMining(connectedConsoles.xbox)
      : CustomButtonType.PRIMARY;
  connectButtons.nintendo =
    connectedConsoles.nintendo !== undefined &&
    connectedConsoles.nintendo.length > 0
      ? checkIfAtleastOneConsoleIsMining(connectedConsoles.nintendo)
      : CustomButtonType.PRIMARY;
  connectButtons.steam =
    connectedConsoles.steam !== undefined && connectedConsoles.steam.length > 0
      ? checkIfAtleastOneConsoleIsMining(connectedConsoles.steam)
      : CustomButtonType.PRIMARY;
  connectButtons.bitboy = CustomButtonType.INACTIVE;
  connectButtons.sui = CustomButtonType.INACTIVE;

  return connectButtons;
}

function checkIfAtleastOneConsoleIsMining(consoles: ConnectedConsole[]) {
  for (let i = 0; i < consoles.length; i++) {
    if (consoles[i].status == "Mining") {
      return CustomButtonType.SUCCESS;
    }
  }
  return CustomButtonType.PRIMARY;
}
