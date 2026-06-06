#!/bin/bash
set -e

# ============================================================
# VitePress 文档站部署脚本
# 功能: 构建 → 上传 OSS → 刷新 CDN
# ============================================================

# -------- 配置 --------
BUCKET="docs-wehifun"
REGION="cn-beijing"
CDN_DOMAIN="https://docs.wehifun.cn"
DIST_DIR="docs/.vitepress/dist"

echo "🔨 开始构建 VitePress..."
npm run build

echo ""
echo "📤 上传到 OSS (${BUCKET})..."
ossutil cp -r ${DIST_DIR}/ oss://${BUCKET}/ --update

echo ""
echo "🔄 刷新 CDN 缓存..."
aliyun cdn RefreshObjectCaches \
  --ObjectPath "${CDN_DOMAIN}/" \
  --ObjectType Directory

echo ""
echo "✅ 部署完成！"
echo "访问: ${CDN_DOMAIN}"
