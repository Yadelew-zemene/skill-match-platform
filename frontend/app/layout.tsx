
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
             <body className="bg-gray-50 min-h-screen">
         <AuthProvider>
           <Navbar />
           {children}
           <Toaster position="top-right" />
           <Footer />
         </AuthProvider>
      </body>
    </html>
  );
}