// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import ClientProvider from "./ClientProvider"; // Import the ClientProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pharmacy Warehouse Management",
  description: "Manage your pharmacy warehouse with ease.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
