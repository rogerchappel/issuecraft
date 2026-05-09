import assert from "node:assert/strict";
import test from "node:test";
import { redactSecrets } from "./redact.js";

test("redacts GitHub tokens, key-value secrets, and emails", () => {
  const redacted = redactSecrets("token=ghp_1234567890abcdefghijklmnop password=hunter2 user@example.com");
  assert.equal(redacted.includes("hunter2"), false);
  assert.equal(redacted.includes("user@example.com"), false);
  assert.match(redacted, /REDACTED/);
});
