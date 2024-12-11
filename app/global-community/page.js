import Community from './community'; 

// Page-specific metadata
// export const metadata = {
//     title: 'Join the Ultrapro Exchange Global Community – Connect & Share',
//     description: 'Be part of the Ultrapro Exchange global community. Connect with crypto enthusiasts, share insights, and stay updated with the latest in blockchain and cryptocurrency.',
//     keywords: 'Ultrapro Community, Global Crypto Community, Crypto Enthusiasts, Blockchain Network, Ultrapro Exchange, Crypto Connections, Join Community, Digital Assets, Cryptocurrency Network, Global Trading, Crypto Insights, Blockchain Enthusiasts, Community Engagement, Crypto Updates, Crypto Discussions'
// };

export async function generateMetadata () {
    return {
        title: 'Join the Ultrapro Exchange Global Community – Connect & Share',
        description: 'Be part of the Ultrapro Exchange global community. Connect with crypto enthusiasts, share insights, and stay updated with the latest in blockchain and cryptocurrency.',
        keywords: 'Ultrapro Community, Global Crypto Community, Crypto Enthusiasts, Blockchain Network, Ultrapro Exchange, Crypto Connections, Join Community, Digital Assets, Cryptocurrency Network, Global Trading, Crypto Insights, Blockchain Enthusiasts, Community Engagement, Crypto Updates, Crypto Discussions',
        openGraph: {
            title: 'Join the Ultrapro Exchange Global Community – Connect & Share',
            description: 'Be part of the Ultrapro Exchange global community. Connect with crypto enthusiasts, share insights, and stay updated with the latest in blockchain and cryptocurrency.',
            url: new URL('https://www.ultraproex.com/global-community'),
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
            title: 'Join the Ultrapro Exchange Global Community – Connect & Share',
            description: 'Be part of the Ultrapro Exchange global community. Connect with crypto enthusiasts, share insights, and stay updated with the latest in blockchain and cryptocurrency.',
            // url: 'https://www.ultraproex.com/',
        },
    }
 };

export default function CommunityPage() {
    return (
        <div>
            <Community />
        </div>
    );
}
