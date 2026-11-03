export const NOTE_MYTHS = [
  {
    myth: "This broadcasts chat to eosio.null",
    reality:
      "Validation only. No signing and no push_transaction in this package.",
  },
  {
    myth: "We know the exact ABI data field name",
    reality:
      "As of the 2026-10-21 check, get_abi returned no structs — do not invent fields here.",
  },
  {
    myth: "eosjs / Anchor Link is the recommended stack",
    reality:
      "Prefer WharfKit for any future intentional Antelope signing in a host app.",
  },
  {
    myth: "#room tags are an on-chain standard",
    reality: "Optional client convention for teaching feeds only.",
  },
] as const;

export const GLOSSARY = [
  {
    term: "note",
    meaning: "Trimmed one-line UTF-8 string ≤120 bytes.",
  },
  {
    term: "NULL_ACTION",
    meaning: "{ account: eosio.null, name: nonce } — no data invented.",
  },
  {
    term: "parseRoomNote",
    meaning: "Optional #room prefix convention for client feeds.",
  },
] as const;
