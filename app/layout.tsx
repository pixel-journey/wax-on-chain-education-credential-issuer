import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue only after the required lesson",
  description: "alice finished intro, so wax-101 can be recorded. bob has not, so he is refused. Nothing is minted.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
