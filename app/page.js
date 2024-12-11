// "use client"
// import { useSelector } from 'react-redux';
// import Layout from "@/components/layout/Layout"
// import Banner1 from "@/components/sections/home/Banner1";
// import Bonus from "@/components/sections/home/Bonus";
// // import CryptoMarket from "@/components/sections/home/CryptoMarket";
// import HomeGuide from "@/components/sections/home/HomeGuide";
// import SecuritySlider from "@/components/sections/home/SecuritySlider";
// import Download from "@/components/sections/home/Download";
// import FeaturesSection from "@/components/sections/home/Feature";
// import CustomerService from "@/components/sections/home/CustomerService";
// import Faq from "@/components/sections/home/Faq";
// import WelcomPopup from "@/components/sections/home/WelcomPopup";

// import "../styles/home.css"

// export default function Home() {

//     const { isAuthenticated } = useSelector((state) => state.auth);

//     return (
//         <>
//             <Layout headerStyle={1} footerStyle={1}>
//                 {!isAuthenticated &&
//                     <WelcomPopup />
//                 }
//                 <Banner1 isAuthenticated={isAuthenticated} />
//                 {!isAuthenticated &&
//                     <Bonus isAuthenticated={isAuthenticated} />
//                 }
//                 {/* <CryptoMarket /> */}
//                 <HomeGuide />
//                 <SecuritySlider />
//                 <Download />
//                 <FeaturesSection />
//                 <CustomerService />
//                 <Faq />
//             </Layout>
//         </>
//     )
// }

'use client'
import { useSelector } from 'react-redux';
import Layout from "@/components/layout/Layout";
import Banner1 from "@/components/sections/home/Banner1";
import Bonus from "@/components/sections/home/Bonus";
// import CryptoMarket from "@/components/sections/home/CryptoMarket";
import HomeGuide from "@/components/sections/home/HomeGuide";
import SecuritySlider from "@/components/sections/home/SecuritySlider";
import Download from "@/components/sections/home/Download";
import FeaturesSection from "@/components/sections/home/Feature";
import CustomerService from "@/components/sections/home/CustomerService";
import Faq from "@/components/sections/home/Faq";
import WelcomPopup from "@/components/sections/home/WelcomPopup";
import "../styles/home.css";
import Head from 'next/head';
import { useEffect, useState } from 'react';

import ChatSupport from "@/components/sections/support/ChatSupport";
import './support/support.css';


export default function Home({pageProps}) {
    // Using Redux's useSelector to get the authentication state
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [popup, setPopup] = useState(null);
    useEffect(() => {
        // Check the popup value from localStorage when the component mounts
        const popupValue = localStorage.getItem('popup');
        setPopup(popupValue === 'true');
    }, []);
    return (
        <>
            <Head>
                <title>Home - My Website</title>
                <meta name="description" content="Welcome to My Website. Discover our features, services, and latest updates here." />
                <meta name="keywords" content="home, features, services, updates" />
                <meta property="og:title" content="Home - My Website" />
                <meta property="og:description" content="Welcome to My Website. Discover our features, services, and latest updates here." />
                <meta property="og:image" content="/path/to/image.jpg" />
                <meta property="og:url" content="https://www.mywebsite.com" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Home - My Website" />
                <meta name="twitter:description" content="Welcome to My Website. Discover our features, services, and latest updates here." />
                <meta name="twitter:image" content="/path/to/image.jpg" />
            </Head>
     
            <Layout headerStyle={1} footerStyle={1}>
                      
                {/* Conditional rendering based on authentication status */}
                {/* {isAuthenticated &&  <WelcomPopup />} */}

                <Banner1 isAuthenticated={isAuthenticated} />
                {!isAuthenticated && <Bonus isAuthenticated={isAuthenticated} />}
                {/* Uncomment this when you want to include the CryptoMarket component */}
                {/* <CryptoMarket /> */}
                <HomeGuide />
                <SecuritySlider />
                <Download />
                <FeaturesSection />
                <CustomerService />
                <Faq />
            </Layout>
{isAuthenticated && <ChatSupport />}
            

           
        </>
    );
}
