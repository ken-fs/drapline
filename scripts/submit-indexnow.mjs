#!/usr/bin/env node
/**
 * submit-indexnow.mjs — submit every URL in the sitemap to IndexNow.
 *
 * IndexNow needs the key file at the site root to match the submitted key; the
 * build ships public/<key>.txt for that reason. Run it after the domain is
 * bound and the deploy marker matches HEAD, otherwise the URLs are submitted
 * before the host can answer for them.
 *
 * Usage: node scripts/submit-indexnow.mjs
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DOMAIN = "drapline.xyz";
const SITEMAP = `https://${DOMAIN}/sitemap.xml`;
const PUBLIC = new URL("../public/", import.meta.url).pathname;

// The key file is named after the key, so finding it is finding both values.
const keyFile = readdirSync(PUBLIC).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("public/<key>.txt 不存在 —— 先跑 pnpm build 确认 key 文件在产物里");
  process.exit(1);
}
const KEY = keyFile.replace(/\.txt$/, "");
console.log("IndexNow key:", KEY);

const res = await fetch(SITEMAP);
if (!res.ok) {
  console.error(`sitemap 拉取失败: HTTP ${res.status}`);
  process.exit(1);
}
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
console.log("sitemap URL 数:", urls.length);

// Verify the key file is actually served before claiming the URLs.
const keyCheck = await fetch(`https://${DOMAIN}/${KEY}.txt`);
const served = (await keyCheck.text()).trim();
if (!keyCheck.ok || served !== KEY) {
  console.error(`key 文件校验失败: HTTP ${keyCheck.status}, 内容 ${JSON.stringify(served.slice(0, 40))}`);
  process.exit(1);
}

const api = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: DOMAIN,
    key: KEY,
    keyLocation: `https://${DOMAIN}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log("IndexNow HTTP", api.status, api.status === 200 || api.status === 202 ? "(已接收)" : "");
if (api.status >= 400) console.log((await api.text()).slice(0, 300));
