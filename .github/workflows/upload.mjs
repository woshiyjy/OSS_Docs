import OSS from 'ali-oss';
import { readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

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
      // 检查是否需要更新（基于文件大小）
      const localSize = statSync(localPath).size;
      try {
        const head = await client.head(ossPath);
        if (head?.res?.headers?.['content-length'] === String(localSize)) {
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
