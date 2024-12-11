// components/GoogleTranslate.js
import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'af,ar,bs,ca,hr,cs,da,nl,en,eo,et,tl,fi,fr,fy,ga,de,el,gu,ht,ha,hi,hu,is,id,it,ja,jw,kn,km,ko,la,lv,lt,lb,mk,ml,mt,mi,mr,ne,no,pl,pt,pa,ro,ru,sr,si,sk,sl,so,es,su,sw,sv,ta,te,th,tr,uk,ur,vi,cy,yi,zu',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Prevent the automatic banner popup
        }, 'google_translate_element');
      };
    };

    addGoogleTranslateScript();

    // Clean up on unmount
    return () => {
      const script = document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) document.body.removeChild(script);
    };
  }, []);

  return <div id="google_translate_element" />;
};

export default GoogleTranslate;
