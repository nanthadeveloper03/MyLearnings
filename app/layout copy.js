"use client"
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Open_Sans, Poppins } from "next/font/google";
import "../styles/app.css";
import "../styles/swiper-bundle.min.css";
import "../styles/custom.css";
import "../styles/dashboard.css";
import ReduxProvider from './provider';


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--poppins",
  display: "swap",
});

const dm = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--dm",
  display: "swap",
});


// export const metadata = {
//   title: 'UltraPro | Crypto Exchange',
//   description: 'UltraPro secure and safest platform',
// };

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('is_light');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("togglETHeme") || 'is_light';
      setTheme(savedTheme);
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dm.variable} body header-fixed ${theme}`}>
        <ToastContainer theme="colored" />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
