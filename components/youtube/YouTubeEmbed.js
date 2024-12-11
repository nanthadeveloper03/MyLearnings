// // components/YouTubeEmbed.js
// import React, { useEffect, useRef } from "react";

// const YouTubeEmbed = ({ videoId, onVideoEnd }) => {
//   const iframeRef = useRef(null);

//   const handleIframeEvent = (event) => {
//     if (event.data === 'ended') {
//       onVideoEnd();
//     }
//   };

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       console.log("window.YT======", window.YT);
      
//       if (typeof window.YT !== 'undefined' && typeof window.YT.Player === 'function') {
//         const player = new window.YT.Player(iframe, {
//           events: {
//             'onReady': () => player.play(), 
//             'onStateChange': handleIframeEvent 
//           }
//         });
//       } else {
//         console.warn('YouTube iframe API not available. Consider fallback mechanism.');
//       }
//     }

//     return () => {
//       if (iframe) {
//         iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":[]}', '*'); 
//       }
//     };
//   }, [iframeRef, videoId, onVideoEnd]);
//   return (

//     <div style={{ marginBottom: "20px" }}>
//        <iframe
//        ref={iframeRef}
//         width="100%"
//         height="214"
//         src={`https://www.youtube.com/embed/${videoId}?`}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//   </div>
//   );
// };


// export default YouTubeEmbed;
