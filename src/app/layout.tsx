import type { Metadata } from "next";
import { poppins } from "@/utils/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anotador Berenjena",
  description: "Anotador del juego de cartas Berenjena o pocha",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
