import OSS from 'ali-oss';
import { readdirSync, readFileSync } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

function md5(buf) {
  return createHash('md5').update(buf).digest('hex').toUpperCase();
}

const DIST = 'docs/.vitepress/dist';

// 递归上传目录
async function uploadDir(client, dir, prefix) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const localPath = join(dir, entry.name);
    const ossPath = prefix + '/' + entry.name;
    if (entry.isDirectory()) {
      await uploadDir(client, localPath, ossPath);
    } else {
      // 检查是否需要更新（基于内容 MD5，避免"同大小不同内容"被跳过）
      try {
        const head = await client.head(ossPath);
        const remoteEtag = String(head?.etag || '').replace(/"/g, '').toUpperCase();
        const localMd5 = md5(readFileSync(localPath));
        if (remoteEtag === localMd5) {
          console.log('  skip', ossPath);
          continue;
        }
      } catch {}
      await client.put(ossPath, localPath);
      console.log('  upload', ossPath);
    }
  }
}

async function main() {
  const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: process.env.OSS_KEY_ID,
    accessKeySecret: process.env.OSS_KEY_SECRET,
    bucket: 'docs-wehifun',
  });

  console.log('Uploading to OSS...');
  await uploadDir(client, DIST, '');
  console.log('Upload complete.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
