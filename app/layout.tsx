import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Polkadot Tourism",
  description: "A mobile-first tourism app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
          <div className="relative w-full max-w-[430px] h-[932px] bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 overflow-hidden">
              <div className="relative h-full w-full flex flex-col">
                <div className="flex-1 relative mx-3">
                  {children}
                </div>
                <BottomNav />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
