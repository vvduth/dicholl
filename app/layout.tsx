import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    template: "%s | Dichol",
    default: "Dichol",
  },
  description: "A modern, fast, e commerce platform.",
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
          
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
