"use client";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { useEffect, useState } from "react";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Conso Test App",
//   description: "A test app for Conso",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(true);
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

  if (isMobile)
    return (
      <html lang="en">
        <head>
          {/* <script src="https://telegram.org/js/telegram-web-app.js"></script> */}
        </head>
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
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
