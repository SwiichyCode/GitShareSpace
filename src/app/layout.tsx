import "@/styles/globals.css";
import { Toaster } from "@/components/atoms/toaster";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar/_index";
import { env } from "@/env";

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
      <body className={`font-sans ${inter.variable} bg-inset text-default`}>
        <Header />
        <Sidebar />
        {children}

        <Toaster />
      </body>
      <GoogleAnalytics gaId={env.GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
