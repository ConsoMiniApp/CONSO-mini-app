import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import fs from "fs";
import nacl from "tweetnacl";

// telgram public key
const telegramPublicKey = process.env.TELEGRAM_PUBLIC_KEY_PRODUCTION; // production
const botId = 7655845111; // production

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  // get all query params
  const query = requestURL.searchParams;
  // const initDataString = requestURL.searchParams.get("testParam");
  const authDate = query.get("auth_date") as string;
  const queryId = query.get("query_id") as string;
  const user = query.get("user") as string;
  const signature = query.get("signature") as string;

  try {
    const data = await validateInitData(authDate, queryId, user, signature);
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

const validateInitData = async (
  authDate: string,
  queryId: string,
  user: string,
  signature: string
) => {
  try {
    // create data check string '12345678:WebAppData\nauth_date=<auth_date>\nquery_id=<query_id>\nuser=<user>'
    const dataCheckString = `${botId}:WebAppData\nauth_date=${authDate}\nquery_id=${queryId}\nuser=${user}`;

    // Convert the public key and signature to Uint8Array
    const publicKey = Buffer.from(telegramPublicKey as string, "hex");
    const signatureBase64 = Buffer.from(signature, "base64");

    // Verify the signature
    const isValid = nacl.sign.detached.verify(
      Buffer.from(dataCheckString), // Data to verify
      signatureBase64, // Signature
      publicKey // Public key
    );

    console.log("Is the signature valid?", isValid);
    return { isValid: isValid };
  } catch (error: any) {
    console.error("Error verifying signature: ", error);
    return { error: error };
  }
};
