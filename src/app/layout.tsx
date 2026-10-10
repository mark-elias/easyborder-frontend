import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Tanstack
import { QueryProvider } from "../lib/providers/QueryProvider";
// light/dark mode
import { ThemeProvider } from "../lib/providers/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {/* Tanstack Query Provider */}
          <QueryProvider>
            <div className="min-h-screen flex flex-col">
              <NavBar />
              <main className="flex-1 p-5">{children}</main>
              <Toaster />
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
