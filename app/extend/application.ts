import { createHmac } from 'crypto';

module.exports = {
  cryptoHex(str: string) {
    const hash = createHmac('sha1', this.config.crypto.secret);
    return hash.update(str).digest('hex');
  }
}