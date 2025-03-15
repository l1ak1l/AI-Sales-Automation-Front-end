import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "./store/store";
import { Providers } from "@/components/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice Agents Platform",
  description: "AI-powered voice agents for your business",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <Navbar />
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}