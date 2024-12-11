import RightCoin from './rightCoin'; 

// Page-specific metadata
// export const metadata = {
//     title: 'Best Trusted Crypto Exchanges – Secure & Reliable Trading',
//     description: 'Discover the best trusted crypto exchanges selected by Ultrapro based on trust, asset security, and transparency. Find secure trading platforms that protect your assets.',
//     keywords: 'Trusted Crypto Exchanges, Best Crypto Exchanges, Secure Trading, Asset Security, Ultrapro, Reliable Crypto Platforms, Crypto Trust, Trading Security, Digital Assets, Crypto Trading, Blockchain, Exchange Transparency, User Protection, Cryptocurrency Exchanges, Safe Trading'
// };

export async function generateMetadata () {
    return {
        title: 'Best Trusted Crypto Exchanges – Secure & Reliable Trading',
        description: 'Discover the best trusted crypto exchanges selected by Ultrapro based on trust, asset security, and transparency. Find secure trading platforms that protect your assets.',
        keywords: 'Trusted Crypto Exchanges, Best Crypto Exchanges, Secure Trading, Asset Security, Ultrapro, Reliable Crypto Platforms, Crypto Trust, Trading Security, Digital Assets, Crypto Trading, Blockchain, Exchange Transparency, User Protection, Cryptocurrency Exchanges, Safe Trading',
        openGraph: {
            title: 'Best Trusted Crypto Exchanges – Secure & Reliable Trading',
            description: 'Discover the best trusted crypto exchanges selected by Ultrapro based on trust, asset security, and transparency. Find secure trading platforms that protect your assets.',
            url: new URL('https://www.ultraproex.com/best-trusted-crypto-exchanges'),
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
            title: 'Best Trusted Crypto Exchanges – Secure & Reliable Trading',
            description: 'Discover the best trusted crypto exchanges selected by Ultrapro based on trust, asset security, and transparency. Find secure trading platforms that protect your assets.',
            // url: 'https://www.ultraproex.com/',
        },
    }
 };

export default function RightCoinPage() {
    return (
        <div>
            <RightCoin />
        </div>
    );
}
