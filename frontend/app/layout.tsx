import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS System",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}