import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react"; // ✅ Import SessionProvider

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] });

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <Toaster />
        <SessionProvider> {/* ✅ Wrap with SessionProvider */}
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
