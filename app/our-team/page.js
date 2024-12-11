import OurTeams from './ourteam';

// Page-specific metadata
// export const metadata = {
//     title: 'Meet the Ultrapro Exchange Team – Experts in Crypto Innovation',
//     description: 'Meet the dedicated team behind Ultrapro Exchange. Our experts are committed to driving crypto innovation and delivering exceptional solutions for our users.',
//     keywords: 'Ultrapro Team, Meet Our Team, Crypto Experts, Blockchain Professionals, Ultrapro Exchange, Team Members, Crypto Innovation, Digital Assets, Blockchain Specialists, Financial Technology, Crypto Leaders, Team Overview, Cryptocurrency Experts, Crypto Solutions, DeFi Team',
// };

export async function generateMetadata () {
    return {
        title: 'Meet the Ultrapro Exchange Team – Experts in Crypto Innovation',
        description: 'Meet the dedicated team behind Ultrapro Exchange. Our experts are committed to driving crypto innovation and delivering exceptional solutions for our users.',
        keywords: 'Ultrapro Team, Meet Our Team, Crypto Experts, Blockchain Professionals, Ultrapro Exchange, Team Members, Crypto Innovation, Digital Assets, Blockchain Specialists, Financial Technology, Crypto Leaders, Team Overview, Cryptocurrency Experts, Crypto Solutions, DeFi Team',
     openGraph: {
         title: 'Meet the Ultrapro Exchange Team – Experts in Crypto Innovation',
         description: 'Meet the dedicated team behind Ultrapro Exchange. Our experts are committed to driving crypto innovation and delivering exceptional solutions for our users.',
         url: new URL('https://www.ultraproex.com/our-team'),
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
         title: 'Meet the Ultrapro Exchange Team – Experts in Crypto Innovation',
         description: 'Meet the dedicated team behind Ultrapro Exchange. Our experts are committed to driving crypto innovation and delivering exceptional solutions for our users.',
         // url: 'https://www.ultraproex.com/',
       },
    }
 };
export default function OurTeamsPage() {
    return (
        <div>
            <OurTeams />
        </div>
    );
}
