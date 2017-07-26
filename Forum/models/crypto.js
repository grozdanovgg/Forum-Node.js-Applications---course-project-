const CryptoJS = require('crypto-js');

const secretKey = 'jaS4VUDw1XPjReqHou6r';

class Crypto {
    encrypt(message) {
        const cryptoMessage = CryptoJS.SHA3(message, secretKey);
        return cryptoMessage;
    }
}

module.exports = new Crypto;
