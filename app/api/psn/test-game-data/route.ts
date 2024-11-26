import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import type { Trophy } from "psn-api";
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getProfileFromUserName,
  getTitleTrophies,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  makeUniversalSearch,
  TrophyRarity,
} from "psn-api";

const rarityMap: Record<TrophyRarity, string> = {
  [TrophyRarity.VeryRare]: "Very Rare",
  [TrophyRarity.UltraRare]: "Ultra Rare",
  [TrophyRarity.Rare]: "Rare",
  [TrophyRarity.Common]: "Common",
};

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  const testParam = requestURL.searchParams.get("testParam");

  try {
    const data = await getData(testParam as string);

    console.log("data", data);

    const response = {
      value: testParam,
      data: data,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

const getData = async (value: string) => {
  try {
    // 1. Authenticate and become authorized with PSN.
    // See the Authenticating Manually docs for how to get your NPSSO.
    const accessCode = await exchangeNpssoForCode(process.env.NPSSO as string);

    const authorization = await exchangeCodeForAccessToken(accessCode);

    // 3. Get the user's list of titles (games).
    const { trophyTitles } = await getUserTitles(authorization, "me");

    // console.log(trophyTitles);

    // const games: any[] = [];
    // for (const title of trophyTitles) {
    //   // 4. Get the list of trophies for each of the user's titles.
    //   const { trophies: titleTrophies } = await getTitleTrophies(
    //     authorization,
    //     title.npCommunicationId,
    //     "all",
    //     {
    //       npServiceName:
    //         title.trophyTitlePlatform !== "PS5" ? "trophy" : "trophy2",
    //     }
    //   );

    // 5. Get the list of _earned_ trophies for each of the user's titles.
    // const { trophies: earnedTrophies } = await getUserTrophiesEarnedForTitle(
    //   authorization,
    //   targetAccountId,
    //   title.npCommunicationId,
    //   "all",
    //   {
    //     npServiceName:
    //       title.trophyTitlePlatform !== "PS5" ? "trophy" : "trophy2",
    //   }
    // );

    // 6. Merge the two trophy lists.
    //   const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

    //   games.push({
    //     gameName: title.trophyTitleName,
    //     platform: title.trophyTitlePlatform,
    //     trophyTypeCounts: title.definedTrophies,
    //     earnedCounts: title.earnedTrophies,
    //     trophyList: mergedTrophies,
    //   });
    // }

    // 7. Write to a JSON file.
    // fs.writeFileSync("./games.json", JSON.stringify(games));

    return { data: trophyTitles };
  } catch (error: any) {
    console.error("Error fetching course videos:", error);
    return { error: error };
  }
};

const mergeTrophyLists = (
  titleTrophies: Trophy[],
  earnedTrophies: Trophy[]
) => {
  const mergedTrophies: any[] = [];

  for (const earnedTrophy of earnedTrophies) {
    const foundTitleTrophy = titleTrophies.find(
      (t) => t.trophyId === earnedTrophy.trophyId
    );

    mergedTrophies.push(
      normalizeTrophy({ ...earnedTrophy, ...foundTitleTrophy })
    );
  }

  return mergedTrophies;
};

const normalizeTrophy = (trophy: Trophy) => {
  return {
    isEarned: trophy.earned ?? false,
    earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
    type: trophy.trophyType,
    rarity: rarityMap[trophy.trophyRare ?? 0],
    earnedRate: Number(trophy.trophyEarnedRate),
    trophyName: trophy.trophyName,
    groupId: trophy.trophyGroupId,
  };
};
