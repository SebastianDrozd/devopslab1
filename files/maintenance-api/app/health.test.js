const test = require("node:test");
const assert = require("node:assert/strict");

const getHealth = require("./health");

test("Health check returns the correct response", () => {
  const result = getHealth();

  assert.deepStrictEqual(result, {
    status: "ok",
    version: "1.1.0",
    deployedBy: "ansible"
  });
});
