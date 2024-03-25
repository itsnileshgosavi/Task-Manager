import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "@/components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/userProvider";
import { Suspense } from "react";
import Loading from "./loading/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Manager",
  description: "Manage your tasks here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="halloween">
      <body className={inter.className}>
        <UserProvider>
          
          <Suspense fallback={<Loading/>}>
          <Header />
          {children}
          <Footer />
          </Suspense>
          
          
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </UserProvider>
      </body>
    </html>
  );
}
