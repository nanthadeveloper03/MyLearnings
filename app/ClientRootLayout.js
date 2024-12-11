"use client"
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from './provider';

export default function ClientRootLayout({ children }) {
  const [theme, setTheme] = useState('is_light');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("togglETHeme") || 'is_light';
      setTheme(savedTheme);
    }
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <ReduxProvider>
        <div className={theme}>
          {children}
        </div>
      </ReduxProvider>
    </>
  );
}
