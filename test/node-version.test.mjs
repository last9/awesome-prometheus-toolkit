// Node releases before these patches accept TLS chains through the
// compromised eMudhra intermediates (nodejs/node#66871, issue #22).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import semver from "semver";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const engines = JSON.parse(read("package.json")).engines.node;
const lockEngines = JSON.parse(read("package-lock.json")).packages[""].engines.node;
const nvmrc = read(".nvmrc").trim();

test("engines.node admits only releases with the TLS blocklist", () => {
  for (const version of ["22.23.4", "24.22.1", "26.12.1"]) {
    assert.ok(semver.satisfies(version, engines), `${version} should be allowed`);
  }
  for (const version of ["20.19.5", "22.23.3", "23.11.1", "24.22.0", "25.9.0", "26.12.0"]) {
    assert.ok(!semver.satisfies(version, engines), `${version} should be rejected`);
  }
});

test("package-lock.json mirrors engines.node", () => {
  assert.equal(lockEngines, engines);
});

test(".nvmrc pins an exact version allowed by engines.node", () => {
  assert.ok(semver.valid(nvmrc), `.nvmrc "${nvmrc}" is not an exact version`);
  assert.ok(semver.satisfies(nvmrc, engines), `.nvmrc ${nvmrc} violates ${engines}`);
});

test("README documents the pinned version", () => {
  assert.ok(read("README.md").includes(nvmrc), `README.md should mention ${nvmrc}`);
});
