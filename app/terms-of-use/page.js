import Termsandconditions from './terms'; 

// Page-specific metadata
// export const metadata = {
//     title: 'Terms of Use – Ultrapro Exchange',
//     description: 'Review the Terms of Use for Ultrapro Exchange. Understand our policies, user responsibilities, and the terms governing your use of our platform and services.',
//     keywords: 'Terms of Use, Ultrapro Exchange, User Agreement, Platform Policies, Crypto Exchange Terms, Terms and Conditions, User Responsibilities, Legal Agreement, Crypto Trading Rules, Digital Assets, Blockchain Terms, Service Agreement, Cryptocurrency Platform, Exchange Policies, User Guidelines'
// };

export async function generateMetadata () {
    return {
        title: 'Terms of Use – Ultrapro Exchange',
        description: 'Review the Terms of Use for Ultrapro Exchange. Understand our policies, user responsibilities, and the terms governing your use of our platform and services.',
        keywords: 'Terms of Use, Ultrapro Exchange, User Agreement, Platform Policies, Crypto Exchange Terms, Terms and Conditions, User Responsibilities, Legal Agreement, Crypto Trading Rules, Digital Assets, Blockchain Terms, Service Agreement, Cryptocurrency Platform, Exchange Policies, User Guidelines',
        openGraph: {
            title: 'Terms of Use – Ultrapro Exchange',
            description: 'Review the Terms of Use for Ultrapro Exchange. Understand our policies, user responsibilities, and the terms governing your use of our platform and services.',
            url: new URL('https://www.ultraproex.com/terms-of-use'),
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
            title: 'Terms of Use – Ultrapro Exchange',
            description: 'Review the Terms of Use for Ultrapro Exchange. Understand our policies, user responsibilities, and the terms governing your use of our platform and services.',
            // url: 'https://www.ultraproex.com/',
        },
    }
 };

export default function TermsandconditionsPage() {
    return (
        <div>
            <Termsandconditions />
        </div>
    );
}
