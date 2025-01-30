import { JetpackOptionsType } from "@/components/game/types";
import { Jetpack } from "@/lib/types";

export function getSelectedJetpack(jetpacks: Jetpack[]): JetpackOptionsType {
  const selectedJetpack = jetpacks.find((jetpack) => jetpack.selected);

  if (selectedJetpack) {
    return selectedJetpack.key === "heli"
      ? JetpackOptionsType.Heli
      : selectedJetpack.key === "rocket"
      ? JetpackOptionsType.Rocket
      : JetpackOptionsType.Jetpack;
  }

  return JetpackOptionsType.Jetpack;
}
