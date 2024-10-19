import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

export const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const geistText = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-text",
  weight: "100 900",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  preload: true,
  variable: "--font-jetbrains-mono",
  weight: ["100", "300", "400", "500", "700", "800"],
});
