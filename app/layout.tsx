import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./Components/Sidebar/Sidebar";
import GlobalStyles from "./Providers/GlobalStylesProvider";
import ContextProvider from "./Providers/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <GlobalStyles>
            <SideBar/>
            {children}
          </GlobalStyles>
        </ContextProvider>
        </body>
    </html>
  );
}
