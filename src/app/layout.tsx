import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Hackathon Web",
  description: "Frontend for hackathon project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-gray-100 text-gray-900 h-full">
        <main className="h-full">{children}</main>
      </body>
    </html>
  );
}
