import Expo from './expo'; 

// Page-specific metadata
// export const metadata = {
//     title: 'The World’s Biggest Online Crypto Expo – Ultrapro Expo',
//     description: 'Join the world’s biggest online crypto expo with Ultrapro. Discover the latest in blockchain, crypto innovations, and network with industry leaders worldwide.',
//     keywords: 'Crypto Expo, Blockchain Event, Online Crypto Expo, Ultrapro Expo, Cryptocurrency, Blockchain Conference, Crypto Innovations, DeFi, Web3, Digital Assets, NFTs, Crypto Networking, Bitcoin, Crypto Trends, Crypto Conference.'
// };

export async function generateMetadata () {
    return {
     title: 'The World’s Biggest Online Crypto Expo – Ultrapro Expo',
     description: 'Join the world’s biggest online crypto expo with Ultrapro. Discover the latest in blockchain, crypto innovations, and network with industry leaders worldwide.',
     keywords: 'Crypto Expo, Blockchain Event, Online Crypto Expo, Ultrapro Expo, Cryptocurrency, Blockchain Conference, Crypto Innovations, DeFi, Web3, Digital Assets, NFTs, Crypto Networking, Bitcoin, Crypto Trends, Crypto Conference',
     openGraph: {
         title: 'The World’s Biggest Online Crypto Expo – Ultrapro Expo',
         description: 'Join the world’s biggest online crypto expo with Ultrapro. Discover the latest in blockchain, crypto innovations, and network with industry leaders worldwide.',
         url: new URL('https://www.ultraproex.com/crypto-expo'),
         siteName: 'UltraPro Crypto Exchange',
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
         title: 'The World’s Biggest Online Crypto Expo – Ultrapro Expo',
         description: 'Join the world’s biggest online crypto expo with Ultrapro. Discover the latest in blockchain, crypto innovations, and network with industry leaders worldwide.',
         // url: 'https://www.ultraproex.com/',
       },
    }
 };

export default function ExpoPage() {
    return (
        <div>
            <Expo />
        </div>
    );
}
