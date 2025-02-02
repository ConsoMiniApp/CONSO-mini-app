import { Character, Jetpack, MysteryBoxType } from "./types";

export const MAX_PLAYSTATION_BONUS = 6000;
export const PLAYSTATION_MULTIPLIER = 2.5; // K
export const PLAYSTATION_CONSTANT_EMISSION_RATE = 2.08;
export const XBOX_MULTIPLIER = 2.5; // K
export const XBOX_CONSTANT_EMISSION_RATE = 2.08;
export const STEAM_DECK_MULTIPLIER = 2; // K
export const STEAM_DECK_CONSTANT_EMISSION_RATE = 1.67;
export const STEAM_WEB_MULTIPLIER = 1.2; // K
export const STEAM_WEB_CONSTANT_EMISSION_RATE = 1.25;
export const NINTENDO_SWITCH_MULTIPLIER = 1.5; // K
export const NINTENDO_SWITCH_CONSTANT_EMISSION_RATE = 1.25;

export const PLAYSTATION_REWARD_CONSTANT_EMISSION = 50; // Rconstant after 90 days i.e. DECAY_THRESHOLD_DAYS
export const DECAY_THRESHOLD_DAYS = 90;

export const ALPHA = 100;
export const DECAY_CONSTANT = 0.0007451; // lambda
export const NORMALIZING_FACTOR = 20.0;

// Play page constants
export const initialCharacters: Character[] = [
  {
    name: "DEFAULT",
    key: "og",
    image: "/play-logos/default-character.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "NINJA",
    key: "ninja",
    image: "/play-logos/ninja-character.gif",
    selected: false,
    owned: false,
    price: 200,
  },
  {
    name: "SAMURAI",
    key: "samurai",
    image: "/play-logos/samurai-character.gif",
    selected: false,
    owned: false,
    price: 2500,
  },
];

export const initialJetpacks: Jetpack[] = [
  {
    name: "OG PACK",
    key: "jetpack",
    image: "/play-logos/og-jetpack.gif",
    selected: true,
    owned: true,
    price: 0,
  },
  {
    name: "ROCKET",
    key: "rocket",
    image: "/play-logos/og-rocket.gif",
    selected: false,
    owned: false,
    price: 2500,
  },
  {
    name: "HELICOPTER",
    key: "heli",
    image: "/play-logos/og-heli.gif",
    selected: false,
    owned: false,
    price: 5000,
  },
];

// game missions
export const allGameMissions = [
  {
    id: 1,
    name: "Run in Meters",
    description:
      "Connect atleast 2 different consoles to play the game. You can play with any consoles from same provider.",
    points: 200,
    category: "game",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 2,
    name: "Collect 3 Mystery Boxes",
    description: "Collect atleast 3 mystery boxes to play the game.",
    points: 200,
    category: "game",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 3,
    name: "Collect All Skins",
    description: "Collect all skins to play the game.",
    points: 250,
    category: "game",
    imgSrc: "/pngs/x-logo.png",
  },
  {
    id: 4,
    name: "Collect All Jetpacks",
    description: "Collect all jetpacks to play the game.",
    points: 250,
    category: "game",
    imgSrc: "/pngs/x-logo.png",
  },
];

// type of mystery boxes : TO DO
export const mysteryBoxTypes: MysteryBoxType = {
  1: {
    id: 1,
    type: "potion",
    title: "POTIONS",
    quantity: 1,
    image: "/play-logos/potion-logo.svg",
    link: "",
    className:
      "border-2 border-[#00BA64] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#5EEFAC]",
  },
  2: {
    id: 2,
    type: "coin",
    title: "TOKENS",
    quantity: 100,
    image: "/other-logos/coin.svg",
    link: "",
    className:
      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#FFF59D]",
  },
  3: {
    id: 3,
    type: "nft",
    title: "NFT",
    quantity: 1,
    image: "/other-logos/nft-logo.png",
    link: "https://claim.metagamehub.io/game/conso-test-app",
    className:
      "border-2 border-[#00A3FF] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#71CCFF]",
  },
  4: {
    id: 4,
    type: "coin",
    title: "TOKENS",
    quantity: 500,
    image: "/other-logos/coin.svg",
    link: "",
    className:
      "border-2 border-[#FFE500] shadow-lg rounded-lg flex flex-col items-center justify-center gap-2 py-4 relative bg-[#FFF59D]",
  },
};

// Invite link
export const INVITE_LINK =
  "https://t.me/share/url?url=https://t.me/test_app_349857_bot/testapp?inviteCode=ref_abcdefgh&text=Ready%20to%20level%20up%20with%20Conso%3F%0A%F0%9F%94%97%20Connect%20your%20consoles%20to%20unlock%20rewards.%0A%F0%9F%92%B0%20Play%20games%20and%20mine%20tokens%20effortlessly.%0A%F0%9F%8F%86%20Compete%20to%20dominate%20the%20leaderboard%21";
