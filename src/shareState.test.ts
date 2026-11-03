import { describe, expect, it } from "vitest";
import { decodeShareState, encodeShareState } from "./shareState";

describe("shareState", () => {
  it("round-trips", () => {
    const raw = encodeShareState({ text: "#general hi" });
    expect(decodeShareState(raw).text).toBe("#general hi");
  });
});
