import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";

const steamEndpoint = "http://api.steampowered.com/";

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  const apiKey = requestURL.searchParams.get("apiKey");

  try {
    const data = await getData(apiKey as string);

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
    // // steam id : 76561199797840379
    // const response = await axios({
    //   method: "get",
    //   url: `${steamEndpoint}/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=76561199797840379`,
    //   // headers: {
    //   //   "x-authorization": `${process.env.XBOX_API_TOKEN}`,
    //   //   "Content-Type": "application/json",
    //   // },
    //   params: {
    //     // Any specific query parameters you may need (example below)
    //     // userId: 'exampleUserId'
    //   },
    // });

    // return response.data;

    return { data: value };
  } catch (error: any) {
    console.error("Error fetching user summary:", error);
    return { error: error };
  }
};
