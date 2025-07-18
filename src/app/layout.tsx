import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";




const poppins = Poppins({
  variable: "--font-poppins",
  subsets:['latin'],
  weight:['100','200','300','400','500','600','700','800','900'],

});

export const metadata: Metadata = {
  title: "Swimlane",
  description: "Swimlane",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <div className="flex min-h-screen">
          <Header />
      

          <main className="flex-1">{children}</main>

        </div>

      </body>
    </html>
  );
}
