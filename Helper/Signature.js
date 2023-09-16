
const ethUtil = require('ethereumjs-util');
var Signature ={
    verify(message, signature, address) {
      const messageHash = ethUtil.hashPersonalMessage(Buffer.from(message));
    const signatureBuffer = ethUtil.toBuffer(signature);
    const v = signatureBuffer[64]; // Extract the last byte as the recovery id
    const r = signatureBuffer.slice(0, 32);
    const s = signatureBuffer.slice(32, 64);
    const addressBuffer = ethUtil.toBuffer(address);

    const recoveredAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(
      ethUtil.ecrecover(messageHash, v, r, s)
    ));

    return address.toLowerCase() === recoveredAddress.toLowerCase();
    }
  } 

  module.exports = Signature