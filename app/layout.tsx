import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wordle!",
  description: "Wordle by Youngjjju",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <body className=" max-w-screen-sm mx-auto antialiased">{children}</body>
    </html>
  );
}
