import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Auth App",
  description: "A simple authentication demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="max-w-[1000px] mx-auto px-6">
          <Header />
          <div className="pt-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
