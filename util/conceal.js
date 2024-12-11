const CryptoJS = require('crypto-js');
const fetch = require('./envelope');

function decryptText(encryptedText) {
    try {
        const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(fetch.feedback), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        throw new Error('Decryption failed');
    }
}

function encryptText(text) {
    try {
        const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(fetch.feedback), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
        
    } catch (error) {
        throw new Error('Encryption failed');
    }
}

function encryptObject(data) {
    try {
        const text = typeof data === 'object' ? JSON.stringify(data) : data;
        const key = CryptoJS.enc.Utf8.parse(fetch.feedback);
        const encrypted = CryptoJS.AES.encrypt(text, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    } catch (error) {
        throw new Error('Encryption failed');
    }
}


module.exports = { encryptText, decryptText,encryptObject }