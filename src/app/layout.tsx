import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TodoProviderWrapper } from "@/components/TodoContext";
import { MainHeader } from "@/components/MainHeader";
import { MainFooter } from "@/components/MainFooter";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo list",
  description: "Simple example of a todo list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <ClerkProvider>
          <TodoProviderWrapper>
            <MainHeader />
            <SignedOut>
              <SignInButton mode="modal" />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <main className="flex-1 w-full max-w-6xl mx-auto border-2 border-gray-200 flex flex-col min-h-0">
                {children}
              </main>
              <MainFooter />
            </SignedIn>
          </TodoProviderWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
