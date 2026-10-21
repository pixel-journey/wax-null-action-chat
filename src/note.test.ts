import { describe, expect, it } from "vitest";
import { NULL_ACTION, note } from "./note";

describe("null-action note", () => {
  it("accepts one short line and names the action without a field", () => {
    expect(note("  gm  ")).toEqual({ ok: true, text: "gm", bytes: 2 });
    expect(note("").ok).toBe(false);
    expect(NULL_ACTION).toEqual({ account: "eosio.null", name: "nonce" });
  });
});
