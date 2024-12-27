"use client";
import BottomTabNavigation from "@/components/bottom-tab-navigation";
import { useAppContext } from "@/contexts/AppContext";
import { validateTelgramUser } from "@/lib/telegram/validateUser";
import { useEffect } from "react";

export default function Home() {
  const { telegramUsername, setTelegramUsername } = useAppContext();
  async function verifyTelegramUser(urlEncodedData: string) {
    const response = await validateTelgramUser(urlEncodedData);

    console.log("is User Valid?", response.data.isValid);
    return response.data.isValid;
  }

  async function getTelegramUserDetails() {
    let urlEncodedData = "";

    if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
      //@ts-ignore
      urlEncodedData = window.Telegram.WebApp.initData;
      console.log("Telegram init Data", urlEncodedData);
    } else {
      urlEncodedData =
        "query_id=AAGxXiEyAAAAALFeITJSbJqG&user=%7B%22id%22%3A841047729%2C%22first_name%22%3A%22MHT%22%2C%22last_name%22%3A%22%7C%20AlphaDevs%22%2C%22username%22%3A%22mht0x%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FAVbOg0HTNE5Rmsm8HgAjWfe_J9CiAjOVycFzJCcwonI.svg%22%7D&auth_date=1735018277&signature=wA_Nt7Qr9St_Wy-XZr2iWHefDLgzvZCSPc19rNsvfveHcoGbgdhOf7MYoOHFSCB6fVqNgRuzcjTgOE_TFWSWDA&hash=012c965a6f2a9129b7de5f2b6707ead24098e4d9e2edd3dc47fadf0ac4585c5d";
    }
    const res = await verifyTelegramUser(urlEncodedData);

    // Parse the string
    if (res) {
      const params = new URLSearchParams(urlEncodedData);

      // Convert to key-value pairs
      const keyValuePairs: any = {};
      params.forEach((value, key) => {
        if (key === "user") {
          keyValuePairs[key] = JSON.parse(value);
          return;
        }
        keyValuePairs[key] = value;
      });

      console.log(keyValuePairs);
      setTelegramUsername(keyValuePairs.user.username);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getTelegramUserDetails();
    }
  }, []);

  return (
    <div>
      <BottomTabNavigation />
    </div>
  );
}
