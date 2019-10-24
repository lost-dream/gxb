import crypto from 'crypto';
import { mine_5, wm_2x, mine_log, mine_mix } from './auth_constant';

/* 获取签名私钥 */
export function getRsaPrivateKey() {
  let aa = '-----BEGIN RSA PRIVATE KEY-----';
  let bb = '==-----END RSA PRIVATE KEY-----';

  return aa + mine_5 + wm_2x + mine_log + mine_mix + bb;
}

/* 签名 content：需要签名的内容字符串   rsaPrivateKey：签名私钥 */
export function signature(content, rsaPrivateKey) {
  let signer = crypto.createSign('RSA-SHA1');
  signer.update(formatData(content));
  return signer.sign(rsaPrivateKey, 'base64');
}

/* 将待签名的JSON对象格式化 1.将key按照字符ascii码顺序排序 2.将value值编码 3.拼接成字符串 */
function formatData(obj) {
  let str = '';
  let arr = Object.keys(obj);
  arr.sort();
  arr.forEach(key => {
    if (Array.isArray(obj[key])) {
      let tempStr = '';
      obj[key].forEach(obj => {
        tempStr += formatData(obj) + ',';
      });
      str +=
        '&' +
        key +
        '=' +
        encodeURIComponent(tempStr.substr(0, tempStr.length - 1));
    } else if (typeof obj[key] === 'object') {
      str += '&' + key + '=' + encodeURIComponent(formatData(obj[key]));
    } else {
      str +=
        '&' +
        key +
        '=' +
        encodeURIComponent(obj[key])
          .replace(/!/g, '%21')
          .replace(/~/g, '%7E')
          .replace(/\*/g, '%2A')
          .replace(/'/g, '%27')
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29');
    }
  });
  return str.substr(1);
}

export function hex2b64(h) {
  const b64map =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  const b64pad = '=';

  let i;
  let c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  if (b64pad) while ((ret.length & 3) > 0) ret += b64pad;
  return ret;
}
