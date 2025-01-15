export interface GameInitSettings {
  environment: EnvironmentOptionsType;
  character: CharacterOptionsType;
  jetpack: JetpackOptionsType;
}

export interface EnvironmentBackgroundsLayersType {
  city: string[];
  forest: string[];
  mars: string[];
}

export enum EnvironmentOptionsType {
  City = "city",
  Forest = "forest",
  Mars = "mars",
}

export enum JetpackOptionsType {
  Jetpack = "jetpack",
  Rocket = "rocket",
  Heli = "heli",
  None = "",
}

export enum CharacterOptionsType {
  Og = "og",
  Ninja = "ninja",
  Samurai = "samurai",
  Flash = "flash",
  Armor = "armor",
  Angel = "angel",
}
