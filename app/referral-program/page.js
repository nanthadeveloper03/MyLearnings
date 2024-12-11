import Referralprogram from "./referralProgram";
import './referprogram.css';

// Page-specific metadata
export async function generateMetadata() {
  return {
    title: "Refer Friends & Earn $2 USDT with Ultrapro Exchange",
    description:
      "Refer your friends to Ultrapro Exchange and earn $2 USDT for each successful referral. Share the benefits of crypto trading and get rewarded instantly!",
    keywords:
      "Referral Program, Earn Rewards, $2 USDT Referral, Ultrapro Referral, Crypto Referral, Refer Friends, Crypto Rewards, Bitcoin, Crypto Trading, Referral Bonus, Earn Crypto, Passive Income, Digital Assets, Cryptocurrency, Blockchain",
    openGraph: {
      title: "Refer Friends & Earn $2 USDT with Ultrapro Exchange",
      description:
        "Refer your friends to Ultrapro Exchange and earn $2 USDT for each successful referral. Share the benefits of crypto trading and get rewarded instantly!",
      url: new URL("https://www.ultraproex.com/referral-program"),
      siteName: "Ultrapro Crypto Exchange",
      images: [
        {
          url: "/assets/images/logo/logo.png",
          alt: "ultrapro-logo",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Refer Friends & Earn $2 USDT with Ultrapro Exchange",
      description:
        "Refer your friends to Ultrapro Exchange and earn $2 USDT for each successful referral. Share the benefits of crypto trading and get rewarded instantly!",
      // url: 'https://www.ultraproex.com/',
    },
  };
}
export default function ReferralProgramPage() {
  return (
    <div>
      <Referralprogram />
    </div>
  );
}
