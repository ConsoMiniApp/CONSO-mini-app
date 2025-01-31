import { MysteryBox } from "@/components/game/types";

// User: User table type
export type ConsoleType =
  | "playstation"
  | "xbox"
  | "steam"
  | "nintendo"
  | "bitboy"
  | "sui";

export type MysteryBoxType = {
  [key: number]: MysteryBoxInfo;
};

export type ConnectedConsoles = {
  [key in ConsoleType]: ConnectedConsole[];
};

export interface ConsoUser {
  created_at: string;
  id: string;
  username: string;
  nickname: string;
  user_points: number;
  current_boost: number;
  degen_score: number;
  completed_missions: number[];
  global_rank: number;
  connected_consoles: ConnectedConsoles;
  game_high_score: number;
  game_total_distance: number;
  completed_conso_game_missions: number[];
  show_conso_game_mission_notif: boolean;
  unclaimed_mystery_boxes: UnclaimedMysteryBox[];
  claimed_mystery_boxes: number[];
  game_assets: GameAssets;
  referral_code: string;
}

export interface GameAssets {
  potions: number;
  characters: string[];
  jetpacks: string[];
}

export interface Character {
  name: string;
  key: string;
  image: string;
  selected: boolean;
  owned: boolean;
  price: number;
}

export interface Jetpack {
  name: string;
  key: string;
  image: string;
  selected: boolean;
  owned: boolean;
  price: number;
}

export interface ConnectedConsole {
  id: string;
  console_username: string;
  joined_date: string;
  console_user_identifier: string;
  conso_bonus: number;
  status: string;
  selected: boolean;
  degen_score?: number;
}

export interface Referre {
  nickname: string;
  user_points: number;
  game_total_distance: number;
  connected_consoles: ConsoleType[];
}

export interface UnclaimedMysteryBox {
  id: number;
  collected_on: string;
}

export interface MysteryBoxInfo {
  id: number;
  type: string;
  title: string;
  quantity: number;
  image: string;
  link: string;
  class: string;
}

// button types
export enum CustomButtonType {
  PRIMARY = "primary",
  SUCCESS = "success",
  SUCCESS_MEDIUM = "successmedium",
  INACTIVE = "inactive",
  DISCONNECT = "disconnect",
  OTHER = "other",
  PRIMARY_WIDE = "primarywide",
  PRIMARY_MEDIUM = "primarymedium",
  TASK_COIN_AMOUNT = "taskcoinamount",
  TASK_COIN_AMOUNT_CREDITED = "taskcoinamountcredited",
}

// Playstation
export interface PlaystationGameData {
  npServiceName: string;
  npCommunicationId: string;
  trophySetVersion: string;
  trophyTitleName: string;
  trophyTitleIconUrl: string;
  trophyTitlePlatform: string;
  hasTrophyGroups: boolean;
  trophyGroupCount: number;
  definedTrophies: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  progress: number;
  earnedTrophies: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  hiddenFlag: boolean;
  lastUpdatedDateTime: string;
}

// Xbox
interface GameAchievement {
  currentAchievements: number;
  totalAchievements: number;
  currentGamerscore: number;
  totalGamerscore: number;
  progressPercentage: number;
}

interface GameImage {
  url: string;
  type: string;
  caption: string | null;
}

export interface XboxGameDataType {
  titleId: string;
  name: string;
  type: string;
  devices: string[];
  displayImage: string;
  achievement: GameAchievement;
  images: GameImage[];
  titleHistory: {
    lastTimePlayed: string;
  };
}

export interface XboxUserData {
  id: string;
  hostId: string;
  settings: UserSetting[];
  isSponsoredUser: boolean;
}

// Nintendo
export interface NintendoGameDataType {
  titleId: string;
  name: string;
  type: string;
  devices: string[];
  displayImage: string;
  achievement: GameAchievement;
  images: GameImage[];
  titleHistory: {
    lastTimePlayed: string;
  };
}

export interface NintendoUserData {
  id: string;
  hostId: string;
  settings: UserSetting[];
  isSponsoredUser: boolean;
}

// Steam
export interface SteamGameDataType {
  titleId: string;
  name: string;
  type: string;
  devices: string[];
  displayImage: string;
  achievement: GameAchievement;
  images: GameImage[];
  titleHistory: {
    lastTimePlayed: string;
  };
}

export interface SteamUserData {
  id: string;
  hostId: string;
  settings: UserSetting[];
  isSponsoredUser: boolean;
}

interface UserSetting {
  id: string;
  value: string;
}
