import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { FormProvider } from "@/components/context";

const rubik = Rubik({
  weight: ["300", "400", "600", "700", "500"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Comment Interactions",
  description:
    "A simple comment system with Next.js, TypeScript, Tailwind CSS, and Clerk",
  keywords: ["comments", "next.js", "typescript", "tailwindcss", "clerk"],

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <FormProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={` ${rubik.variable} antialiased`}>
            {children}
            <Toaster />
          </body>
        </html>
      </FormProvider>
    </ClerkProvider>
  );
}
