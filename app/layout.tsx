import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Co-Pilot - Project Management",
  description: "Task and project management board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
