import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TaskStoreProvider } from "@/providers/task-store-provider";
import HeaderSideBarWrapper from "@/components/HeaderSideBarWrapper";



const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],

});

export const metadata: Metadata = {
  title: "Swimlane Dashboard",
  description: "Swimlane Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en"
     suppressHydrationWarning
    >
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <TaskStoreProvider>
          <div className="flex min-h-screen">
            <HeaderSideBarWrapper/>
            <main className="flex-1">{children}</main>
          </div>
        </TaskStoreProvider>
      </body>
    </html>
  );
}
