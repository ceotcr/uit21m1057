import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import MyNavBar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AffordMed",
  description: "AffordMed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + "bg-black text-white w-screen h-screen flex flex-col justify-center items-center"}>
        <Providers>
          <MyNavBar />
          <main className="min-w-full h-[calc(100vh-6rem)] flex items-center justify-center flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
