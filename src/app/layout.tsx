import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Tanstack
import { QueryProvider } from "../lib/lib/providers/QueryProvider";
// componenets
import { NavBar } from "../components/organisms";
// toast
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EasyBorder",
  description: "Border Wait Times app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Tanstack Query Provider */}
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 p-5">{children}</main>
            <Toaster/>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
