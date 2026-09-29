#!/usr/bin/env node
/**
 * wait-and-bind.mjs — bind drapline.xyz to the Worker once the zone is active.
 *
 * The 2026-09-22 lesson from this fleet: binding a custom hostname while the
 * zone is still pending gets the certificate issuance stuck, and Cloudflare
 * never retries it. So the domain is bound only after the zone reports
 * "active", which this script waits for.
 *
 * Zone activation is only checked on demand, so each poll also fires an
 * activation check. The Cloudflare OAuth token wrangler uses expires in about
 * a day, so it is refreshed by running `wrangler whoami` before each API call.
 *
 * Usage: node scripts/wait-and-bind.mjs [--once]
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ZONE_ID = "94b251e4a1964144a6c192a8c7c8a857";
const ACCOUNT_ID = "70716e073f0925c564bafd0eaf0be307";
const WORKER = "drapline";
const HOSTS = ["drapline.xyz", "www.drapline.xyz"];
const ONCE = process.argv.includes("--once");
const API = "https://api.cloudflare.com/client/v4";

function token() {
  // Running any wrangler command refreshes the OAuth token before we read it.
  try {
    execFileSync("npx", ["wrangler", "whoami"], { stdio: "ignore", timeout: 60_000 });
  } catch {
    /* offline or not logged in; the read below will fail loudly */
  }
  const p = join(homedir(), "Library/Preferences/.wrangler/config/default.toml");
  const toml = readFileSync(p, "utf8");
  const m = toml.match(/^oauth_token\s*=\s*"([^"]+)"/m);
  if (!m) throw new Error("no oauth_token in wrangler config");
  return m[1];
}

async function cf(path, init = {}) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });
  const data = await res.json();
  return { ok: res.ok && data.success, status: res.status, data };
}

async function zoneStatus() {
  const r = await cf(`/zones/${ZONE_ID}`);
  return r.data.result?.status;
}

async function existingHostnames() {
  const r = await cf(`/accounts/${ACCOUNT_ID}/workers/domains`);
  return (r.data.result ?? []).filter((d) => d.service === WORKER).map((d) => d.hostname);
}

async function bind(hostname) {
  // A domain only binds inside its own zone, so look the zone up by name.
  const z = await cf(`/zones?name=${hostname.split(".").slice(-2).join(".")}`);
  const zone = z.data.result?.[0];
  if (!zone) throw new Error(`no zone found for ${hostname}`);
  const r = await cf(`/accounts/${ACCOUNT_ID}/workers/domains`, {
    method: "PUT",
    body: JSON.stringify({
      zone_id: zone.id,
      hostname,
      service: WORKER,
      environment: "production",
    }),
  });
  return r;
}

const tick = async () => {
  const status = await zoneStatus();
  if (status !== "active") {
    // Nudge Cloudflare to re-check the registrar's NS records.
    await cf(`/zones/${ZONE_ID}/activation_check`, { method: "PUT" });
    return false;
  }
  const have = await existingHostnames();
  for (const host of HOSTS) {
    if (have.includes(host)) {
      console.log(`已绑定: ${host}`);
      continue;
    }
    const r = await bind(host);
    console.log(`绑定 ${host}: ${r.ok ? "成功" : `失败 ${r.status} ${JSON.stringify(r.data.errors)}`}`);
  }
  return true;
};

if (ONCE) {
  await tick();
  process.exit(0);
}

// Poll for up to ~6 hours: registrar NS propagation is usually minutes, but
// Cloudflare only re-checks on demand and the certificate follows the binding.
for (let i = 0; i < 180; i++) {
  try {
    const done = await tick();
    if (done) {
      console.log("zone active — 绑定流程结束");
      process.exit(0);
    }
    if (i % 10 === 0) console.log(`[${new Date().toISOString()}] zone 仍为 pending，继续等待…`);
  } catch (e) {
    console.error("轮询出错:", e.message);
  }
  await new Promise((r) => setTimeout(r, 120_000));
}
console.log("超时退出：zone 在 6 小时内未激活，需要手动检查名称服务器");
