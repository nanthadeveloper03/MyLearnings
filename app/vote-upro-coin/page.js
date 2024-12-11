import Voting from './voting'; 

// Page-specific metadata
// export const metadata = {
//     title: 'Vote for UPRO Coin & Earn 1 USDT Reward – Ultrapro Exchange',
//     description: "Help expand UPRO Coin by voting to list it on other exchanges and earn 1 USDT for each vote. Support UPRO's growth and get rewarded instantly!",
//     keywords: 'Vote UPRO Coin, Earn 1 USDT, Crypto Voting, UPRO Listing, Ultrapro Exchange, Vote for UPRO, Crypto Rewards, UPRO Coin, USDT Reward, Cryptocurrency, Blockchain, Digital Assets, Vote Crypto, Crypto Promotion, Exchange Listing.'
// };

export async function generateMetadata () {
    return {
        title: 'Vote for UPRO Coin & Earn 1 USDT Reward – Ultrapro Exchange',
        description: "Help expand UPRO Coin by voting to list it on other exchanges and earn 1 USDT for each vote. Support UPRO's growth and get rewarded instantly!",
        keywords: 'Vote UPRO Coin, Earn 1 USDT, Crypto Voting, UPRO Listing, Ultrapro Exchange, Vote for UPRO, Crypto Rewards, UPRO Coin, USDT Reward, Cryptocurrency, Blockchain, Digital Assets, Vote Crypto, Crypto Promotion, Exchange Listing.',
        openGraph: {
            title: 'Vote for UPRO Coin & Earn 1 USDT Reward – Ultrapro Exchange',
            description: "Help expand UPRO Coin by voting to list it on other exchanges and earn 1 USDT for each vote. Support UPRO's growth and get rewarded instantly!",
            url: new URL('https://www.ultraproex.com/vote-upro-coin'),
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
            title: 'Vote for UPRO Coin & Earn 1 USDT Reward – Ultrapro Exchange',
            description: "Help expand UPRO Coin by voting to list it on other exchanges and earn 1 USDT for each vote. Support UPRO's growth and get rewarded instantly!",
            // url: 'https://www.ultraproex.com/',
        },
    }
 };

export default function VotingPage() {
    return (
        <div>
            <Voting />
        </div>
    );
}
