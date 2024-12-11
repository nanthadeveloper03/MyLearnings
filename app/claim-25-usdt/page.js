import HowToClaim from './claim_25_usdt'; 

// Page-specific metadata
// export const metadata = {
//     title: 'How to Claim 25 USDT in Simple Steps – Ultrapro Exchange',
//     description: 'Claim your 25 USDT by completing simple tasks and KYC on Ultrapro Exchange. Withdraw your USDT on any network starting October 9, with no restrictions!',
//     keywords: 'Claim 25 USDT, USDT Reward, KYC Verification, Ultrapro Exchange, Earn USDT, Crypto Bonus, Crypto Trading, USDT Withdrawal, Free USDT, Crypto Promotion, Digital Assets, Blockchain, Cryptocurrency, No Limits, Crypto Rewards'
// };

export async function generateMetadata () {
    return {
        title: 'How to Claim 25 USDT in Simple Steps – Ultrapro Exchange',
        description: 'Claim your 25 USDT by completing simple tasks and KYC on Ultrapro Exchange. Withdraw your USDT on any network starting October 9, with no restrictions!',
        keywords: 'Claim 25 USDT, USDT Reward, KYC Verification, Ultrapro Exchange, Earn USDT, Crypto Bonus, Crypto Trading, USDT Withdrawal, Free USDT, Crypto Promotion, Digital Assets, Blockchain, Cryptocurrency, No Limits, Crypto Rewards',
     openGraph: {
         title: 'How to Claim 25 USDT in Simple Steps – Ultrapro Exchange',
         description: 'Claim your 25 USDT by completing simple tasks and KYC on Ultrapro Exchange. Withdraw your USDT on any network starting October 9, with no restrictions!',
         url: new URL('https://www.ultraproex.com/claim-25-usdt'),
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
         title: 'How to Claim 25 USDT in Simple Steps – Ultrapro Exchange',
         description: 'Claim your 25 USDT by completing simple tasks and KYC on Ultrapro Exchange. Withdraw your USDT on any network starting October 9, with no restrictions!',
         // url: 'https://www.ultraproex.com/',
       },
    }
 };
export default function HowToClaimPage() {
    return (
        <div>
            <HowToClaim />
        </div>
    );
}
