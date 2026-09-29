# 部署说明 — drapline

站点：`drapline`（Cloudflare Worker，静态资源）
仓库：https://github.com/ken-fs/drapline
域名：`drapline.xyz`（Spaceship 注册，2026-09-29 建站当日接线）
Zone ID：`94b251e4a1964144a6c192a8c7c8a857`

---

## 当前状态

| 项 | 状态 |
|---|---|
| 代码 | ✅ 已推到 `main`（3 个提交） |
| 本地构建 | ✅ `pnpm build` 通过，64 页静态产出 |
| Worker | ✅ 已部署 `https://drapline.493129720ljw.workers.dev` |
| 部署标记 | ✅ `prebuild` 写 `.well-known/anvilwiki-deploy.txt` = git HEAD |
| Zone | ⏳ `pending` — NS 已通过 Spaceship API 改为 `daisy/lochlan.ns.cloudflare.com` |
| 域名绑定 | ⏳ 后台轮询脚本已挂（见下），zone 激活后自动绑 apex + www |
| GA 属性 | ❌ 服务账号在 GA「Ship」账户无创建权限 → 需人工或授权 |
| GSC 属性 | ❌ 需人工添加 + 把服务账号加为 Owner |
| IndexNow | 🔜 key 文件已随构建上线，绑定后跑 `scripts/submit-indexnow.mjs` |
| Git 集成 | ❌ 需 dashboard 手动连（见下） |

### 后台轮询（自动绑域名）

`scripts/wait-and-bind.mjs` 每 2 分钟查一次 zone 状态，激活后绑定
`drapline.xyz` 与 `www.drapline.xyz`，日志在 `/tmp/drapline-bind.log`。

```bash
# 还在跑吗
ps aux | grep wait-and-bind | grep -v grep
# 手动跑一次
node scripts/wait-and-bind.mjs --once
```

> ⚠️ 教训复用（2026-09-22 animedice）：**zone 还是 pending 时绑自定义域名会让证书签发卡死且不重试**。
> 所以这个脚本只在 `status === "active"` 之后才绑。

---

## 需要人工做的三件事

### ① Cloudflare Git 集成（必须 dashboard）

**为什么不能用 API**：2026-09-28 kaijualpha 踩坑记录 —— `PUT /accounts/{id}/builds/repos/connections` +
`POST /accounts/{id}/builds/workers` 那套 API 接的是**另一套 builds 系统**，接完构建全部卡在
`Build initialization failed: unable to verify Worker`。真正能跑的 Git 集成在 dashboard。

1. https://dash.cloudflare.com → Workers & Pages → `drapline` → **Settings → Builds**
2. **Connect Git** → 选 `ken-fs/drapline`，分支 `main`
3. 构建命令：`pnpm run build`　部署命令：`npx wrangler deploy`
4. 环境变量（Settings → Variables）：`NEXT_PUBLIC_SITE_URL=https://drapline.xyz`（GA 属性建好后补 `NEXT_PUBLIC_GA_ID`）

验证老系统接管：`GET /accounts/{id}/builds/workers/drapline` 返回 `12040`（正常，老系统不在这个 API 可见）。

### ② GSC 属性

服务账号：`gsc-bot@ken-seo-tools.iam.gserviceaccount.com`

1. https://search.google.com/search-console → 添加资源 → **网域** `drapline.xyz`
2. DNS TXT 验证（Cloudflare 里加一条 TXT 即可；也可用 MCP 直接写）
3. 验证通过后把服务账号加为**所有者（Owner）**

> 备选：若在 GCP 项目 `ken-seo-tools` 里启用 **Site Verification API**，则 `gsc-bot` 可自行完成
> DNS 验证（服务账号已能读该 API 的 scope，目前只差「API 未启用」这一步）。
> 启用地址：https://console.developers.google.com/apis/api/siteverification.googleapis.com/overview?project=163174629679

加好后跑：`node ~/Desktop/david/Ship/scripts/gsc.mjs sitemaps`

### ③ GA4 属性

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
