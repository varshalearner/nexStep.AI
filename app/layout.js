import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "nexStep.AI : Smart Mock Interviewer",
  description: "One step solution to prepare for interviews through this smart AI Mock Interview Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="w-full h-full overflow-x-hidden">
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={`${inter.className} bg-gray-100 text-gray-800 min-h-screen flex flex-col overflow-x-hidden`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}