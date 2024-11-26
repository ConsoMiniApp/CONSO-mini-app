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
    console.log(authorization);

    const response = await getProfileFromUserName(
      authorization,
      "vintron_myth"
    );
    console.log(response);
    return { data: response };

    // 2. Get the user's `accountId` from the username.
    // const allAccountsSearchResults = await makeUniversalSearch(
    //   authorization,
    //   "vintron_myth",
    //   "SocialAllAccounts"
    // );

    // console.log(allAccountsSearchResults);

    // const targetAccountId =
    //   allAccountsSearchResults.domainResponses[0].results[0].socialMetadata
    //     .accountId;

    // console.log(targetAccountId); // --> "1234567890"

    // const targetAccountId = "2482607976011043157";

    // 3. Get the user's list of titles (games).
    // const { trophyTitles } = await getUserTitles(
    //   authorization,
    //   targetAccountId
    // );

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

    // return { data: trophyTitles };
  } catch (error: any) {
    console.error("Error fetching user summary:", error);
    return { error: error };
  }
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
