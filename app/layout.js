import { Open_Sans, Poppins } from "next/font/google";
import "../styles/app.css";
import "../styles/swiper-bundle.min.css";
import "../styles/custom.css";
import "../styles/dashboard.css";
import ClientRootLayout from './ClientRootLayout';
import { Metadata } from 'next'; 
import { HoverProvider } from "@/util/hoverContext";
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

export const metadata = {
  // title: {
  //   template: '%s',
  //   default: 'Trade Bitcoin & Buy Cryptocurrency with Ultrapro Exchange'
  // },
  title: 'Trade Bitcoin & Buy Cryptocurrency with Ultrapro Exchange',
  description: 'Trade Bitcoin & explore a wide range of cryptocurrencies with Ultrapro Exchange. Enjoy secure, fast, and user-friendly crypto trading with top-notch features .',
  keywords: ' Bitcoin, Cryptocurrency, Crypto Trading, Buy Bitcoin, Secure Exchange, Ultrapro, Digital Assets, Staking, Arbitrage, DeFi, UPRO Coin, Blockchain, Trade Crypto, Altcoins',
  metadataBase: new URL('https://www.ultraproex.com'),
  alternates: {
    canonical: './',
    languages: {
      'en-US': '/en-US',
      // 'de-DE': '/de-DE',
    },
  },
  
  openGraph: {
    // title: {
    //   template: '%s',
    //   default: 'Trade Bitcoin & Buy Cryptocurrency with Ultrapro Exchange'
    // },
    title: 'Trade Bitcoin & Buy Cryptocurrency with Ultrapro Exchange',
    description: 'Trade Bitcoin & explore a wide range of cryptocurrencies with Ultrapro Exchange. Enjoy secure, fast, and user-friendly crypto trading with top-notch features .',
    url: new URL('https://www.ultraproex.com'),
    siteName: 'Ultrapro Crypto Exchange',
    images: [
      {
        url: '/assets/images/logo/logo.png',
        // width: 800,
        // height: 600,
        alt: 'ultrapro-logo'
      },
      // {
      //   url: 'https://www.ultraproex.com/og-alt.png',
      //   // width: 1800,
      //   // height: 1600,
      //   // alt: 'ultraproex',
      // },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trade Bitcoin & Buy Cryptocurrency with Ultrapro Exchange',
    description: 'Trade Bitcoin & explore a wide range of cryptocurrencies with Ultrapro Exchange. Enjoy secure, fast, and user-friendly crypto trading with top-notch features.',
    url: 'https://www.ultraproex.com/',
    site: 'UltraPro Crypto Exchange'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dm.variable} body header-fixed`}>
      <HoverProvider>
        <ClientRootLayout>
        {children}
        </ClientRootLayout>
        </HoverProvider>
      </body>
    </html>
  );
}
