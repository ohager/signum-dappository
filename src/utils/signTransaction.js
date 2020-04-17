import { generateSignature, generateSignedTransactionBytes, verifySignature } from '@burstjs/crypto'

export function signTransaction(unsignedHexMessage, publicKey, privateKey){
    const signature = generateSignature(unsignedHexMessage, privateKey);
    if (!verifySignature(signature, unsignedHexMessage, publicKey)) {
        throw new Error('The signed message could not be verified! Transaction not broadcasted!');
    }
    return generateSignedTransactionBytes(unsignedHexMessage, signature);
}
