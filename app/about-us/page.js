import Aboutus from './about_us'; 

// Page-specific metadata
// export const metadata = {
//     title: "Learn About Ultrapro Exchange's Journey – Innovating Crypto Access",
//     description: 'Discover Ultrapro Exchange’s journey in reshaping the financial landscape. We’re committed to making cryptocurrency accessible to everyone with secure, innovative solutions.',
//     keywords: 'About Ultrapro, Ultrapro Journey, Cryptocurrency, Blockchain Innovation, Crypto Access, Digital Assets, Ultrapro Exchange, Financial Revolution, Crypto Solutions, Blockchain, Bitcoin, Crypto Trading, Secure Exchange, Crypto Platform, DeFi'
// };

export async function generateMetadata () {
    return {
        title: "Learn About Ultrapro Exchange's Journey – Innovating Crypto Access",
        description: 'Discover Ultrapro Exchange’s journey in reshaping the financial landscape. We’re committed to making cryptocurrency accessible to everyone with secure, innovative solutions.',
        keywords: 'About Ultrapro, Ultrapro Journey, Cryptocurrency, Blockchain Innovation, Crypto Access, Digital Assets, Ultrapro Exchange, Financial Revolution, Crypto Solutions, Blockchain, Bitcoin, Crypto Trading, Secure Exchange, Crypto Platform, DeFi',
     openGraph: {
         title: "Learn About Ultrapro Exchange's Journey – Innovating Crypto Access",
         description: "Discover Ultrapro Exchange’s journey in reshaping the financial landscape. We’re committed to making cryptocurrency accessible to everyone with secure, innovative solutions.",
         url: new URL('https://www.ultraproex.com/about-us'),
         siteName: 'Ultrapro Crypto Exchange',
         images: [
           {
             url: '/assets/images/logo/logo.png',
             alt: 'ultrapro-logo'
           },
         ],
         locale: 'en_US',
         type: 'website',
       },
       twitter: {
         card: 'summary_large_image',
         title: "Learn About Ultrapro Exchange's Journey – Innovating Crypto Access",
         description: "Discover Ultrapro Exchange’s journey in reshaping the financial landscape. We’re committed to making cryptocurrency accessible to everyone with secure, innovative solutions.",
         // url: 'https://www.ultraproex.com/',
       },
    }
 };
export default function AboutusPage() {
    return (
        <div>
            <Aboutus />
        </div>
    );
}
