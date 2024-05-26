import * as crypto from 'crypto';

const encodeSecretKey = (plainKey: string) => {
    try {
      const encodedText = Buffer.from(plainKey, "utf-8");
      const hash = crypto.createHash("sha256").update(encodedText).digest();
      // @ts-expect-error
      const hexHash = Buffer.from(hash, "hex");
      const uint8ArrayHashString = new Uint8Array(hexHash).toString();
      return uint8ArrayHashString;
    } catch (error) {
      console.error(error);
      return "";
    }
  };

 console.log(encodeSecretKey("abc"));