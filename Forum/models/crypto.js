const CryptoJS = require('crypto-js');

const secretKey = 'jaS4VUDw1XPjReqHou6r';

class Crypto {
    encrypt(message) {
            const cryptoMessage = CryptoJS.SHA3(message, secretKey);
            return cryptoMessage;
        }
        // decrypt(cryptoMessage) {
        //     const bytes = CryptoJS.AES.decrypt(cryptoMessage.toString(), secretKey);
        //     const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        //     return plaintext;
        // }
}

module.exports = new Crypto;