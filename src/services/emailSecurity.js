import crypto from "crypto";

function encryptWithPublicKey(publicKey, data) {

    const bufferMessage = Buffer.from(data, 'utf-8');

    return crypto.publicEncrypt(publicKey, bufferMessage);
};

export default encryptWithPublicKey;