import { createHmac } from 'crypto';
import { createHash } from 'crypto';

const AK_ID = process.env.OSS_KEY_ID;
const AK_SECRET = process.env.OSS_KEY_SECRET;

// HMAC-SHA1 签名（阿里云 OpenAPI 通用签名算法）
function sign(method, params) {
  const canonicalizedQueryString = Object.keys(params)
    .sort()
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');

  const stringToSign = `${method}&${encodeURIComponent('/')}&${encodeURIComponent(canonicalizedQueryString)}`;
  const hmac = createHmac('sha1', AK_SECRET + '&');
  hmac.update(stringToSign);
  return hmac.digest('base64');
}

async function refreshCDN() {
  const params = {
    Action: 'RefreshObjectCaches',
    Format: 'JSON',
    Version: '2018-05-10',
    AccessKeyId: AK_ID,
    SignatureMethod: 'HMAC-SHA1',
    Timestamp: new Date().toISOString().replace(/\.\d{3}/, ''),
    SignatureVersion: '1.0',
    SignatureNonce: Math.random().toString(36).substring(2, 17),
    ObjectPath: 'https://docs.wehifun.cn/',
    ObjectType: 'Directory',
  };

  params.Signature = sign('GET', params);

  const qs = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const url = `https://cdn.aliyuncs.com/?${qs}`;
  console.log('Refreshing CDN...');

  const resp = await fetch(url);
  const data = await resp.json();
  console.log(JSON.stringify(data, null, 2));

  if (resp.ok) {
    console.log('CDN refresh triggered successfully.');
  } else {
    console.error('CDN refresh failed:', data);
    process.exit(1);
  }
}

refreshCDN();
