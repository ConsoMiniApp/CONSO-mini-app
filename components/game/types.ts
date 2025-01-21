export interface GameInitSettings {
  environment: EnvironmentOptionsType;
  character: CharacterOptionsType;
  jetpack: JetpackOptionsType;
  mysteryBoxes: Array<MysteryBox>;
  powerUps: Array<PowerUp>;
}

export interface MysteryBox {
  id: string;
  name: string;
  link: string;
  timestamp: number;
}

export interface PowerUp {
  character: CharacterOptionsType;
  time: number;
  timestamp: number;
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

export type PatternType = "low" | "medium" | "high";
export interface CoinPattern {
  x: number;
  y: number;
}

export type PatternGroup = {
  positions: CoinPattern[];
  coinCount: number;
};

export type CoinPatterns = {
  [key in PatternType]: PatternGroup[];
};
export type LaserPosition = { x: number; y: number };

export type LaserPatternGroup = {
  positions: LaserPosition[];
};
