// User: User table type
export type ConsoleType =
  | "playstation"
  | "xbox"
  | "steam"
  | "nintendo"
  | "bitboy"
  | "sui";

export type ConnectedConsoles = {
  [key in ConsoleType]: ConnectedConsole[];
};

export interface ConsoUser {
  id: string;
  nickname: string;
  username: string;
  degen_score: number;
  current_boost: number;
  user_points: number;
  connected_consoles: ConnectedConsoles;
  created_at: string;
  completed_missions: number[];
  global_rank: number;
  game_total_distance: number;
  referral_code: string;
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
