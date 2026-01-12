import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/custom/Sidebar";
// import { RightPanel } from "@/components/custom/RightPanel";
import { ClientProvider } from "@/components/custom/ClientProvider";
import { ThemeProvider } from "@/components/custom/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SalesPro Dashboard",
  description: "Advanced Sales Analytics with Editable Labels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ClientProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-muted/20 custom-scrollbar">
                {children}
              </main>
            </div>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
