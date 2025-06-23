import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Hackathon Web",
  description: "Frontend for hackathon project",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
