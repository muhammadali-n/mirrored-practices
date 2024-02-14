import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../themes/main.scss";
import GlobalState from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store Accelerator",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalState>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalState>
  );
}
