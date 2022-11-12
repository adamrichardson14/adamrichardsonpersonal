import "./globals.css";
import { Inter } from "@next/font/google";
import Nav from "./Nav";

const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className={`bg-gray-920`}>
        <Nav />

        {children}
      </body>
    </html>
  );
}
