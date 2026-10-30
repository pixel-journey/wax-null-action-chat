export const NULL_NOTE_MYTHS = [
  {
    myth: "This is a full on-chain chat product",
    reality:
      "It only validates a one-line note that *could* ride on eosio.null::nonce. No broadcast.",
  },
  {
    myth: "We invent the ABI field name for nonce",
    reality:
      "Published ABI had no structs (observed 2026-10-21). Action JSON is not guessed here.",
  },
  {
    myth: "Long multi-line messages are fine",
    reality:
      "Rules: one line, ≤120 UTF-8 bytes, non-empty after trim.",
  },
] as const;
