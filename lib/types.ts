export interface GameData {
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

// TO DO: Add the NintendoGameDataType interface
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

// TO DO: Add the Steam interface
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
