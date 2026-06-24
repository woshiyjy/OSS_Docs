/**
 * 批量为 OKF 概念文件添加 YAML frontmatter
 * 用法: node scripts/add-frontmatter.mjs
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative, dirname, basename } from 'node:path';

const DOCS_ROOT = join(import.meta.dirname, '..', 'docs');

// 目录路径 → (type, tags)
const TYPE_MAP = [
  // 品种和育苗
  { dir: '品种和育苗/红果', type: '品种', tags: ['红果', '口感番茄'] },
  { dir: '品种和育苗/黄果', type: '品种', tags: ['黄果', '口感番茄'] },
  { dir: '品种和育苗/绿果', type: '品种', tags: ['绿果', '口感番茄'] },
  { dir: '品种和育苗/其他颜色', type: '品种', tags: ['其他颜色', '口感番茄'] },
  // 基础条件
  { dir: '基础条件/设施类型', type: '设施类型', tags: ['设施', '基础条件'] },
  { dir: '基础条件/栽培类型', type: '栽培类型', tags: ['栽培', '基础条件'] },
  { dir: '基础条件/水系条件', type: '水系条件', tags: ['灌溉', '基础条件'] },
  // 产区和茬口
  { dir: '产区和茬口/产区', type: '产区', tags: ['产区'] },
  { dir: '产区和茬口/茬口', type: '茬口', tags: ['茬口'] },
  { dir: '产区和茬口/价格趋势', type: '价格趋势', tags: ['价格', '市场'] },
  { dir: '产区和茬口/产业模式', type: '产业模式', tags: ['产业模式', '种植方案'] },
  // 种植过程
  { dir: '种植过程/定植前准备', type: '种植技术', tags: ['定植前准备', '种植过程'] },
  { dir: '种植过程/水肥管理', type: '种植技术', tags: ['水肥管理', '种植过程'] },
  { dir: '种植过程/环境管理', type: '种植技术', tags: ['环境管理', '种植过程'] },
  { dir: '种植过程/农事管理', type: '种植技术', tags: ['农事管理', '种植过程'] },
  { dir: '种植过程/病虫害管理', type: '种植技术', tags: ['病虫害管理', '种植过程'] },
  // 采后处理
  { dir: '采后处理/采收', type: '采后处理', tags: ['采收', '采后处理'] },
  { dir: '采后处理/清洗与消杀', type: '采后处理', tags: ['清洗与消杀', '采后处理'] },
  { dir: '采后处理/分拣', type: '采后处理', tags: ['分拣', '采后处理'] },
  { dir: '采后处理/预冷', type: '采后处理', tags: ['预冷', '采后处理'] },
  { dir: '采后处理/后熟', type: '采后处理', tags: ['后熟', '采后处理'] },
  { dir: '采后处理/包装', type: '采后处理', tags: ['包装', '采后处理'] },
  { dir: '采后处理/存储', type: '采后处理', tags: ['存储', '采后处理'] },
  { dir: '采后处理/运输', type: '采后处理', tags: ['运输', '采后处理'] },
  { dir: '采后处理/配套设施', type: '采后处理', tags: ['配套设施', '采后处理'] },
  // 示例
  { dir: '示例/智能问答', type: '模板', tags: ['智能问答', '示例'] },
  { dir: '示例/种植计划', type: '模板', tags: ['种植计划', '示例'] },
  { dir: '示例/病虫害防治', type: '模板', tags: ['病虫害防治', '示例'] },
  { dir: '示例/ROI分析', type: '模板', tags: ['ROI分析', '示例'] },
];

// 文件名 → 自定义 description（覆盖自动生成）
const DESCRIPTION_OVERRIDES = {
  '釜山88': '韩国引进的红色口感番茄品种，果实糖度高、风味浓郁',
  '高俪红': '红色口感番茄品种',
  '首而红': '红色口感番茄品种',
  '圣宏2号': '红色口感番茄品种',
  '明珠3号': '黄色口感番茄品种，色泽亮丽',
  '青甜': '绿色口感番茄品种，风味独特',
  '358': '特殊颜色口感番茄品种',
  '露地': '露天种植方式，成本最低，受自然条件影响最大',
  '小拱棚': '小拱棚设施种植，提供基础物理防护，是越夏产区主要种植方式',
  '连栋拱棚': '连栋拱棚设施种植，适合规模化生产',
  '日光温室': '日光温室设施种植，保温性能优异，适合越冬生产',
  '土壤栽培': '传统土壤栽培方式',
  '基质栽培': '无土基质栽培方式，可精准控制水肥',
  '灌溉首部': '灌溉系统首部设备配置与选型',
  '滴灌系统': '滴灌系统设计与安装规范',
  '滴箭系统': '滴箭系统配置与使用方法',
  '宁夏产区': '宁夏番茄种植产区概况，越夏茬口核心产区',
  '山东产区': '山东番茄种植产区概况',
  '广东产区': '广东番茄种植产区概况，越冬茬口优势产区',
  '越夏茬口': '越夏种植茬口，4-10月采收',
  '秋延茬口': '秋延种植茬口',
  '越冬茬口': '越冬种植茬口',
  '春延茬口': '春延种植茬口，3-4月为价格高位',
  '全年产销价格趋势': '全年各茬口产销价格走势分析',
  '全国主要销售渠道': '全国主要销售渠道与市场分布',
  '宁夏产区露地越夏茬口种植': '宁夏产区露地越夏番茄种植完整方案，含成本收益与风险分析',
  '宁夏产区小拱棚越夏茬口种植': '宁夏产区小拱棚越夏番茄种植完整方案，含成本收益与风险评估',
  '山东产区越冬和春延茬口种植': '山东产区越冬和春延茬口番茄种植方案',
  '山东产区秋延茬口种植': '山东产区秋延茬口番茄种植方案',
  '广东产区露地越冬茬口种植': '广东产区露地越冬茬口番茄种植方案',
  '广东产区小拱棚越冬茬口种植': '广东产区小拱棚越冬茬口番茄种植方案',
  '采收前准备': '采收前的物资、人员与计划准备',
  '标准化采收流程': '标准化采收操作流程与品质把控要点',
  '清洗与消杀流程': '果实清洗与消杀操作规范',
  '分拣方法与设备': '分拣标准、方法与设备选型',
  '预冷方法与设备': '预冷方式选择与设备配置方案',
  '后熟管理': '后熟处理技术与品质管理要点',
  '包装标准': '包装材料、规格与标识标准',
  '存储管理': '仓储环境控制与库存管理要点',
  '一次运输': '产区到集散中心的一次运输管理',
  '二次运输': '集散中心到终端渠道的二次运输管理',
  '一体化加工中心规划与建设': '采后一体化加工中心规划设计与建设方案',
  '基于知识库的问答模板': '基于本知识库的 AI 问答模板示例',
  '以周为单位的种植计划模板': '周度种植计划编排模板',
  '常见病虫害防治模板': '病虫害识别与防治记录模板',
  '宁夏产区小拱棚越夏茬口种植ROI分析模板': '小拱棚越夏茬口种植投入产出分析计算模板',
};

// 种植过程文件名含描述性后缀，需要特殊处理
function getTitleFromFilename(filename) {
  return filename.replace(/\.md$/, '');
}

function getDescription(filename, type) {
  const title = getTitleFromFilename(filename);
  if (DESCRIPTION_OVERRIDES[title]) {
    return DESCRIPTION_OVERRIDES[title];
  }
  // 自动生成
  if (type === '种植技术') {
    return `${title}相关技术规范与操作要点`;
  }
  return `${title}相关资料`;
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.name.endsWith('.md')) {
      yield fullPath;
    }
  }
}

function getTypeInfo(filePath) {
  const rel = relative(DOCS_ROOT, filePath);
  const dir = dirname(rel);
  // 按路径深度从长到短匹配
  const sorted = [...TYPE_MAP].sort((a, b) => b.dir.length - a.dir.length);
  for (const entry of sorted) {
    if (dir === entry.dir || dir.startsWith(entry.dir + '/')) {
      return entry;
    }
  }
  return null;
}

function yamlEscape(str) {
  // 如果字符串中有特殊字符，用引号包裹
  if (/[\[\]{}:#'"]/.test(str)) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }
  return str;
}

async function processFile(filePath) {
  const rel = relative(DOCS_ROOT, filePath);
  const filename = basename(filePath);

  // 跳过保留文件
  if (filename === 'index.md' || filename === 'log.md') {
    console.log(`  ⏭ 跳过保留文件: ${rel}`);
    return 'skip';
  }

  const content = await readFile(filePath, 'utf-8');

  // 跳过已有 frontmatter 的文件
  if (content.startsWith('---')) {
    console.log(`  ⏭ 已有 frontmatter: ${rel}`);
    return 'skip';
  }

  const typeInfo = getTypeInfo(filePath);
  if (!typeInfo) {
    console.log(`  ⚠ 未匹配类型: ${rel}`);
    return 'no-match';
  }

  const title = getTitleFromFilename(filename);
  const description = getDescription(filename, typeInfo.type);
  const tags = typeInfo.tags;

  const frontmatter = [
    '---',
    `type: ${typeInfo.type}`,
    `title: ${title}`,
    `description: ${description}`,
    `tags: [${tags.join(', ')}]`,
    `timestamp: 2026-06-24`,
    '---',
    '',
  ].join('\n');

  const newContent = frontmatter + content;
  await writeFile(filePath, newContent, 'utf-8');
  console.log(`  ✅ ${rel} → type: ${typeInfo.type}`);
  return 'updated';
}

async function main() {
  console.log('🔍 扫描 docs/ 目录...\n');

  let updated = 0;
  let skipped = 0;
  let noMatch = 0;

  for await (const filePath of walk(DOCS_ROOT)) {
    const result = await processFile(filePath);
    if (result === 'updated') updated++;
    else if (result === 'skip') skipped++;
    else if (result === 'no-match') noMatch++;
  }

  console.log(`\n📊 统计: ${updated} 个更新, ${skipped} 个跳过, ${noMatch} 个未匹配`);
  console.log('✅ 完成！');
}

main().catch(console.error);
