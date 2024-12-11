import Compare from './compareCryptoEx'; 

// Page-specific metadata
// export const metadata = {
//     title: 'Compare Crypto Prices Across Major Exchanges – Ultrapro',
//     description: 'Compare cryptocurrency prices across various major exchanges. Track real-time prices for top crypto coins and discover opportunities to optimize your trades.',
//     keywords: 'Compare Crypto Prices, Major Exchanges, Crypto Price Comparison, Real-Time Crypto Tracking, Ultrapro, Cryptocurrency Prices, Top Crypto Coins, Exchange Comparison, Crypto Trading, Bitcoin Prices, Altcoin Prices, Digital Assets, Crypto Opportunities, Blockchain, Trading Optimization'
// };

export async function generateMetadata () {
    return {
        title: 'Compare Crypto Prices Across Major Exchanges – Ultrapro',
        description: 'Compare cryptocurrency prices across various major exchanges. Track real-time prices for top crypto coins and discover opportunities to optimize your trades.',
        keywords: 'Compare Crypto Prices, Major Exchanges, Crypto Price Comparison, Real-Time Crypto Tracking, Ultrapro, Cryptocurrency Prices, Top Crypto Coins, Exchange Comparison, Crypto Trading, Bitcoin Prices, Altcoin Prices, Digital Assets, Crypto Opportunities, Blockchain, Trading Optimization',
        openGraph: {
            title: 'Compare Crypto Prices Across Major Exchanges – Ultrapro',
            description: 'Compare cryptocurrency prices across various major exchanges. Track real-time prices for top crypto coins and discover opportunities to optimize your trades.',
            url: new URL('https://www.ultraproex.com/compare-other-exchanges'),
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
            title: 'Compare Crypto Prices Across Major Exchanges – Ultrapro',
            description: 'Compare cryptocurrency prices across various major exchanges. Track real-time prices for top crypto coins and discover opportunities to optimize your trades.',
            // url: 'https://www.ultraproex.com/',
        },
        }
 };
export default function CompareCryptoExPage() {
    return (
        <div>
            <Compare />
        </div>
    );
}
