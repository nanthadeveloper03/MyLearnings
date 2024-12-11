import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; // Use named import

const ApkDownload = () => {
    const apkUrl = process.env.NEXT_PUBLIC_APK_URL;
    return (
        <div className="qr-code-wrapper">
            <QRCodeSVG value={apkUrl} size={150} />
        </div>
    );
};

export default ApkDownload;
