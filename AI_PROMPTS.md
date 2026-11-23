# AI handoff — null-action note shape

## Non-negotiables

1. Note is one trimmed line, ≤ **120** UTF-8 bytes.
2. `note("  gm  ")` → `{ text: "gm", bytes: 2 }`.
3. `#room` is a **client** convention only.
4. `NULL_ACTION` = `{ account: "eosio.null", name: "nonce" }` and the data hint refuses invented keys.
5. Not a chat protocol and not a broadcast path.
6. Live `get_abi` on `eosio.null` (note dated 2026-10-21) showed no structs — re-check before any production use. This lab does not call it.

## Prompt seeds

- "Trim and byte-count `  gm  `."
- "Is #room an on-chain room id?"
- "Refuse a data object with an invented key on eosio.null::nonce."

## Do not

- Broadcast nonce actions from unit tests.
- Treat this as a messaging protocol.
