import rs from 'jsrsasign';
import { getRsaPrivateKey, hex2b64 } from './auth';

// 拼接获取ac_token的基础token
export default function getToken() {
  const ts = new Date().getTime() * 1000,
    app_id = 1498470812764423;

  let d = `app_id=${app_id}&app_secret=49ebbbe8ecba66cbd4af670fddfc8292&ts=${ts}`;
  let sig = new rs.Signature({ alg: 'SHA1withRSA', prov: 'cryptojs/jsrsa' });
  sig.init(rs.KEYUTIL.getKey(getRsaPrivateKey()));
  sig.updateString(d);
  let sign = hex2b64(sig.sign());
  return { app_id, sign, ts };
}
