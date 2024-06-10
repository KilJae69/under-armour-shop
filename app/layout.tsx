import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Under Shop",
    default: "Welcome | Under E Commerce Store",
  },
  description:
    "This is a fan-made e-commerce site created as a portfolio project to demonstrate the capabilities of building an online store using modern web development technologies. It showcases a functional e-commerce platform inspired by Under Armour products, but is not affiliated with or endorsed by Under Armour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <WixClientContextProvider>
          <Navbar />
          <div className="mt-nav-height">{children}</div>
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
