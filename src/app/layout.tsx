import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TanstackProvider } from "@/providers/TanstackProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "GitshareSpace.",
  description:
    "GitShareSpace is a community-driven platform for sharing GitHub repositories, fostering collaboration, and connecting developers worldwide. With GitShareSpace, users can effortlessly share their repositories with the community, discover new projects, and engage with fellow developers through likes and comments.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} scroll-smooth bg-inset text-default`}
      >
        <TanstackProvider>{children}</TanstackProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
