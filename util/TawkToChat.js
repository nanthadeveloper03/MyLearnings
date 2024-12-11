import { useEffect } from 'react';

const TawkToChat = () => {
    useEffect(() => {
        var Tawk_API = process.env.NEXT_PUBLIC_CHAT_API_KEY || {};
        var Tawk_LoadStart = new Date();

        (function () {
            var s1 = document.createElement('script');
            var s0 = document.getElementsByTagName('script')[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/66e3d0e950c10f7a00a93bbf/1i7kug4c9';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);

    return null;
};

export default TawkToChat;
