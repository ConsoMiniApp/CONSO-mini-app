import { EnvironmentBackgroundsLayersType, CoinPatterns } from "./types";

export const coinPatterns: CoinPatterns = {
  // average max collectible : 3
  low: [
    {
      // Horizontal three dots
      positions: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 200, y: 0 },
      ],
      coinCount: 3,
    },

    {
      // Horizontal three dots
      positions: [
        { x: 0, y: 160 },
        { x: 100, y: 160 },
        { x: 200, y: 160 },
      ],
      coinCount: 3,
    },
    {
      // Horizontal three dots
      positions: [
        { x: 0, y: 320 },
        { x: 100, y: 320 },
        { x: 200, y: 320 },
      ],
      coinCount: 3,
    },
    {
      // Horizontal three dots
      positions: [
        { x: 0, y: 480 },
        { x: 100, y: 480 },
        { x: 200, y: 480 },
      ],
      coinCount: 3,
    },
    {
      // Horizontal three dots
      positions: [
        { x: 0, y: 640 },
        { x: 100, y: 640 },
        { x: 200, y: 640 },
      ],
      coinCount: 3,
    },
  ],
  // average max collectible : 6
  medium: [
    {
      // Vertical stack of paired dots
      positions: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
        { x: 0, y: 200 },
        { x: 100, y: 200 },
      ],
      coinCount: 6,
    },
    {
      // 3x3 grid
      positions: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 200, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
        { x: 200, y: 100 },
        { x: 0, y: 200 },
        { x: 100, y: 200 },
        { x: 200, y: 200 },
      ],
      coinCount: 9,
    },
  ],
  high: [
    {
      // Ascending diagonal pattern
      positions: [
        { x: 0, y: 0 },
        { x: 60, y: 30 },
        { x: 120, y: 60 },
        { x: 180, y: 90 },
        { x: 240, y: 120 },
      ],
      coinCount: 5,
    },
    {
      // Wave pattern in middle
      positions: [
        { x: 0, y: 60 },
        { x: 60, y: 30 },
        { x: 120, y: 60 },
        { x: 180, y: 30 },
        { x: 240, y: 60 },
      ],
      coinCount: 5,
    },
    {
      // 4x2 grid
      positions: [
        { x: 0, y: 0 },
        { x: 60, y: 0 },
        { x: 120, y: 0 },
        { x: 180, y: 0 },
        { x: 0, y: 60 },
        { x: 60, y: 60 },
        { x: 120, y: 60 },
        { x: 180, y: 60 },
      ],
      coinCount: 8,
    },
  ],
};

export const environmentBackgrounds: EnvironmentBackgroundsLayersType = {
  city: [
    "bg_citylinet_b1",
    "bg_citylinet_b2",
    "bg_citylinet_b3",
    "bg_citylinet_ground",
    "bg_citylinet_last",
  ],
  forest: [
    "bg_forest_b1",
    "bg_forest_b2",
    "bg_forest_b3",
    "bg_forest_ground",
    "bg_forest_last",
  ],
  mars: [
    "bg_mars_b1",
    "bg_mars_b2",
    "bg_mars_b3",
    "bg_mars_ground",
    "bg_mars_last",
  ],
};

export const constantKeyAnimations: Array<AnimationOptions> = [
  {
    key: "player_transition",
    texture: "transition",
    start: 1,
    end: 0,
    frameRate: 10,
    repeat: 0,
  },
  {
    key: "armor__run",
    texture: "armor",
    start: 4,
    end: 7,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "armor__fly",
    texture: "armor",
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "flash__run",
    texture: "flash",
    start: 4,
    end: 7,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "flash__fly",
    texture: "flash",
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "angel__run",
    texture: "angel",
    start: 4,
    end: 7,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "angel__fly",
    texture: "angel",
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "mystery_box_animation",
    texture: "mystery_box",
    start: 0,
    end: 1,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "power_up_animation",
    texture: "power_up",
    start: 0,
    end: 1,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "zapper_90",
    texture: "zapper_90",
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "laser",
    texture: "laser",
    start: 0,
    end: 5,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "rocket",
    texture: "rocket",
    start: 0,
    end: 3,
    frameRate: 10,
    repeat: -1,
  },
  {
    key: "rocket_warning_animation",
    texture: "rocket_warning",
    start: 0,
    end: 1,
    frameRate: 10,
    repeat: -1,
  },
];

type AnimationOptions = {
  key: string;
  texture: string;
  start: number;
  end: number;
  frameRate: number;
  repeat: number;
};

export const characterOptions = [
  "og",
  "ninja",
  "samurai",
  "flash",
  "armor",
  "angel",
];
export const backgroundOptions = ["city", "forest", "mars"];
export const jetpackOptions = ["jetpack", "rocket", "heli"];
