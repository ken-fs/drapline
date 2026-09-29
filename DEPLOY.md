# 部署说明 — drapline

站点：`drapline`（Cloudflare Worker，静态资源）
仓库：https://github.com/ken-fs/drapline
域名：`drapline.xyz`（Spaceship 注册，2026-09-29 建站当日接线）
Zone ID：`94b251e4a1964144a6c192a8c7c8a857`

---

## 当前状态

| 项 | 状态 |
|---|---|
| 代码 | ✅ 已推到 `main`（9 个提交） |
| 本地构建 | ✅ `pnpm build` 通过，63 页静态产出 |
| Worker | ✅ 已部署 `https://drapline.493129720ljw.workers.dev` |
| **Cloudflare Git 集成** | ✅ **2026-09-29 已连接**（dashboard → Settings → Builds → `ken-fs/drapline`） |
| **CI 首次构建** | ✅ 构建 97d45b85 · 成功 · 构建命令自动识别为 `pnpm run build`，部署 `npx wrangler deploy` |
| 部署标记 | ✅ `prebuild` 写 `.well-known/anvilwiki-deploy.txt`，CI 读 `WORKERS_CI_COMMIT_SHA` = 269ac8f |
| Zone | ✅ `active`（NS 经 Spaceship API 改为 `daisy/lochlan.ns.cloudflare.com`） |
| 域名绑定 | ✅ `drapline.xyz` + `www.drapline.xyz` 均 HTTP 200，证书有效 |
| IndexNow | ✅ 已提交 61 个 URL（HTTP 202） |
| 站点巡检 | ✅ site-hygiene 全绿（部署标记 / sitemap 域名 / 关键页） |
| GA 属性 | ✅ `G-533QZ4BQ28`（GA4 属性 556545245），走同意门控加载 |
| Adsterra | ✅ 两个单元（728×90 leaderboard + 300×250 rectangle），**同样走同意门控** |
| ads.txt | ⚠️ AdSense 记录已放，**Adsterra 记录待补**（从 Adsterra dashboard 复制） |
| GSC 属性 | ❌ 需人工添加 + 把服务账号加为 Owner |

### 广告位与同意门控

| 页 | 单元 |
|---|---|
| 首页 | leaderboard（hero 下方，桌面）+ rectangle（工具段之后） |
| /achievements/ | rectangle |
| /auras/[slug] · /meals/[slug] | 侧栏 rectangle |
| /guide/beginner/ | 正文中段 leaderboard（桌面） |

实现要点：每个单元包在自己的 `srcdoc` iframe 里（Adsterra 的 snippet 用全局
`atOptions`，同页两个单元会互相覆盖），盒子预先占住精确尺寸（CLS 安全）。

**与 petsuniverse 的差异（有意）**：petsuniverse 的广告不门控，本站的等同意结果。
因为本站横幅原文承诺“你同意前什么都不会加载”，广告先加载会让这句话变成假的。
拒绝时广告位收起而不是留空洞。实测：同意前 0 个第三方请求，同意后 2 个 Adsterra + 1 个 GA。

> 新单元上线后通常要等 Adsterra 侧审核/填充，前期空白属正常（盒子已占位，不影响 CLS）。

### CI 构建配置（已生效，无需再动）

```
构建命令   pnpm run build        # CF 从仓库自动识别（pnpm@11.9.0 / nodejs@24.18.0）
部署命令   npx wrangler deploy
环境变量   NEXT_PUBLIC_SITE_URL 未设 → site.ts 兜底即真实域名，canonical 正确
          NEXT_PUBLIC_GA_ID     待 GA 属性建好后补（未设 = 不显示同意横幅、零第三方请求）
```

> 可选优化：dashboard 的构建配置里打开 **构建缓存**（当前日志有 `No build cache found`），
> 能把 ~20s 的构建压到几秒。非必需。

---

## 需要人工做的两件事（Git 集成已完成）

### ② GSC 属性（GA4 已接好，此项仍需人工）

服务账号：`gsc-bot@ken-seo-tools.iam.gserviceaccount.com`

1. https://search.google.com/search-console → 添加资源 → **网域** `drapline.xyz`
2. DNS TXT 验证（Cloudflare 里加一条 TXT 即可；也可用 MCP 直接写）
3. 验证通过后把服务账号加为**所有者（Owner）**

> 备选：若在 GCP 项目 `ken-seo-tools` 里启用 **Site Verification API**，则 `gsc-bot` 可自行完成
> DNS 验证（服务账号已能读该 API 的 scope，目前只差「API 未启用」这一步）。
> 启用地址：https://console.developers.google.com/apis/api/siteverification.googleapis.com/overview?project=163174629679

加好后跑：`node ~/Desktop/david/Ship/scripts/gsc.mjs sitemaps`

### ② GA4 属性
`gsc-bot` 在 GA 账户「Ship」(`405567176`) 里没有创建权限（实测 403）。
两个选择：

- **A**：在 GCP 项目里给 `gsc-bot@ken-seo-tools.iam.gserviceaccount.com` 授予 GA 账户的「编辑者」角色，
  然后 `node ~/Desktop/david/Ship/scripts/ga-create.mjs drapline drapline.xyz 405567176`（脚本已写好，会自动建属性+数据流并打印 `G-XXXX`）；
- **B**：在 GA 后台手动建属性，把测量 ID 填进 Cloudflare 的 `NEXT_PUBLIC_GA_ID` 构建变量。

> 本站 GA 是**同意门控**的：`NEXT_PUBLIC_GA_ID` 未设置时 `AnalyticsConsent` 组件**不渲染横幅**，
> 设了之后点「接受」才注入 gtag。所以现在线上零第三方请求。

---

## 站点结构（64 页）

```
/                          首页（run 决策 + 数据库入口）
/auras/  + 6 个光环页      六光环条件与解锁率（wiki 只列 4 个）
/meals/  + 12 个类别页     餐类→属性表 + 三档价格 + 4 个特质
/characters/ + 24 个角色   村民 + 祸龙（含 4 条只存在于成就数据的）
/achievements/             66 条成就 + 全球解锁率 + 本地追踪
/endings/                  5 个具名结局 + 25 futures 的诚实说明
/skills/                   6 树 + 3/6/9 协同阶梯
/tools/                    工具索引
  aura-planner/            两问定光环（含 Whimsical 附加条件）
  meal-compare/            金币买得起哪档餐
/guide/                    指南索引 + 首年 walkthrough + 人格 + 金钱 + FAQ
/updates/                  补丁历史（1.0.0 → 1.0.2）
/about/ /privacy/          数据来源与隐私
```

## 数据来源纪律

所有数字来自：Steam appdetails API、Steam 全局成就端点 + 社区成就页、Steam 新闻流、
游戏内文本（Fandom 转写，仅用于交叉验证）。**不确定的一律不写**：
25 个 TRUE 结局的条件、4 条无文档祸龙的属性/日程、食物属性的非首档数值都不编。

已知分歧写进站点（首页「Where the other DRAPLINE sites are out of date」）：
光环 4 vs 6、成就 62 vs 66、结局 5 vs 25、当前补丁 0.9.3 vs 1.0.2。

## 素材使用

`public/images/*.jpg` 为 Steam 商店页官方宣传截图（开发商上传，商店页明确允许转载与变现），
每张图带 `© KANAWO / Vaka, Inc.` 署名；页脚与 /about 声明非官方、无关联。

## 本地校验

```bash
pnpm lint && pnpm build      # eslint 全绿、64 页
node scripts/tokens.mjs      # 调色板对比度（全部 ≥4.5:1）
```
