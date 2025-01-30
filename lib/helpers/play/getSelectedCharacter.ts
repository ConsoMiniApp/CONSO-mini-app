import { CharacterOptionsType } from "@/components/game/types";
import { Character } from "@/lib/types";

export function getSelectedCharacter(
  characters: Character[]
): CharacterOptionsType {
  const selectedCharacter = characters.find((character) => character.selected);

  if (selectedCharacter) {
    return selectedCharacter.key === "samurai"
      ? CharacterOptionsType.Samurai
      : selectedCharacter.key === "ninja"
      ? CharacterOptionsType.Ninja
      : CharacterOptionsType.Og;
  }

  return CharacterOptionsType.Og;
}
