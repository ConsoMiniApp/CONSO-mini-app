"use client";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { useEffect, useState } from "react";
import { AppProvider } from "@/contexts/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(true);
  const [isTelegram, setIsTelegram] = useState(false);
  // get device info
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const userAgent = navigator.userAgent;
  //     const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(
  //       userAgent
  //     );
  //     setIsMobile(isMobileDevice);
  //   }
  // }, []);

  // check if app is running on telegram
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      const isTelegramApp = /telegram/i.test(userAgent);
      console.log("isTelegramApp", isTelegramApp);
      setIsTelegram(isTelegramApp);
    }
  }, []);

  if (isMobile)
    return (
      <html lang="en">
        <head>
          {/* <script src="https://telegram.org/js/telegram-web-app.js"></script> */}
          <link
            rel="preload"
            href="/other-logos/button-wide-bg-yellow.svg"
            as="image"
            type="image/svg+xml"
          />
          <link
            rel="preload"
            href="/other-logos/button-bg-yellow.svg"
            as="image"
            type="image/svg+xml"
          />
          <link
            rel="preload"
            href="/other-logos/button-bg-green.svg"
            as="image"
            type="image/svg+xml"
          />
          <link
            rel="preload"
            href="/other-logos/button-bg-gray.svg"
            as="image"
            type="image/svg+xml"
          />
          <link
            rel="preload"
            href="/other-logos/button-bg-invite.svg"
            as="image"
            type="image/svg+xml"
          />
        </head>
        <AppProvider>
          <body>
            <main>{children}</main>
            <Toaster />
          </body>
        </AppProvider>
      </html>
    );
  else
    return (
      <html lang="en">
        <head>
          {/* <script src="https://telegram.org/js/telegram-web-app.js"></script> */}
        </head>
        <body>
          <div> Please Use this app on mobile device.</div>
        </body>
      </html>
    );
}
