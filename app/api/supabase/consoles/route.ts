import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

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
    return { data: value };
  } catch (error: any) {
    console.error("Error fetching user summary:", error);
    return { error: error };
  }
};
