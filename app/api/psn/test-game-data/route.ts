import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getUserTitles,
} from "psn-api";

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  const npsso = requestURL.searchParams.get("npsso");

  try {
    const data = await getData(npsso as string);

    console.log("data", data);

    const response = {
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
    const accessCode = await exchangeNpssoForCode(value as string);

    const authorization = await exchangeCodeForAccessToken(accessCode);

    // 3. Get the user's list of titles (games).
    const { trophyTitles } = await getUserTitles(authorization, "me");

    return { data: trophyTitles };
  } catch (error: any) {
    return { error: "error getting user data, invalid npsso code" };
  }
};
