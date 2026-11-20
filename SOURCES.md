# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | Antelope actions context |
| Live `get_abi` eosio.null (2026-10-21 note in EDUCATION) | No structs observed — re-check before prod |

## Product facts locked by tests

- Note: trimmed one line, ≤ **120** UTF-8 bytes.
- `note("  gm  ")` → `{ text: "gm", bytes: 2 }`.
- `#room` is a **client** convention only.
- `NULL_ACTION` = `{ account: "eosio.null", name: "nonce" }` with a data hint that refuses invented keys.
- Not a chat protocol and not a broadcast path.
