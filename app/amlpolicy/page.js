import AMLPolicy from './amlpolicy'; 

export async function generateMetadata () {
    return {
        title: 'AML Policy – Ultrapro Exchange',
        description: "Read Ultrapro Exchange's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy and security are our top priorities.",
        keywords: 'Refund Policy, Ultrapro Exchange, Data Protection, User Privacy, Personal Information, Privacy Practices, Data Security, Crypto Exchange Privacy, Blockchain Security, Digital Assets, User Data, Information Protection, Cryptocurrency Privacy, Secure Transactions, Privacy Guidelines.',
        openGraph: {
            title: 'AML Policy – Ultrapro Exchange',
            description: "Read Ultrapro Exchange's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy and security are our top priorities.",
            url: new URL('https://www.ultraproex.com/privacy-policy'),
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
            title: 'AML Policy – Ultrapro Exchange',
            description: "Read Ultrapro Exchange's Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy and security are our top priorities.",
            // url: 'https://www.ultraproex.com/',
        },
    }
 };
export default function AMLPolicyInn() {
    return (
        <div>
            <AMLPolicy />
        </div>
    );
}
