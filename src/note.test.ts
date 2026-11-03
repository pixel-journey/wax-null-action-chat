import { describe, expect, it } from "vitest";
import {
  actionSketch,
  NULL_ACTION,
  note,
  parseRoomNote,
  remainingBytes,
} from "./note";

describe("null-action note", () => {
  it("accepts one short line and names the action without a field", () => {
    expect(note("  gm  ")).toEqual({ ok: true, text: "gm", bytes: 2 });
    expect(note("").ok).toBe(false);
    expect(NULL_ACTION).toEqual({ account: "eosio.null", name: "nonce" });
  });

  it("rejects multiline and oversized", () => {
    expect(note("a\nb").ok).toBe(false);
    expect(note("x".repeat(200)).ok).toBe(false);
  });

  it("parses optional room tag", () => {
    const p = parseRoomNote("#general hello");
    expect(p.ok && p.room).toBe("general");
    expect(p.ok && p.body).toBe("hello");
  });

  it("remainingBytes", () => {
    expect(remainingBytes("gm")).toBe(118);
  });

  it("actionSketch does not invent data fields", () => {
    const s = actionSketch();
    expect(s.account).toBe("eosio.null");
    expect(s.dataHint.toLowerCase()).toContain("abi");
  });
});
