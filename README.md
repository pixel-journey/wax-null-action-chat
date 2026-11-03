# wax-null-action-chat

> **Trust label:** `educational-reference`  
> **Status:** Full-thrust education pass (2026-11-03)

Validate a **one-line note** that could ride on `eosio.null::nonce`. No invented ABI fields. No broadcast. Prefer **WharfKit** in hosts that sign.

```bash
npm test && npm run dev
```

| Helper | Role |
|--------|------|
| `note` | trim, one line, ≤120 bytes |
| `parseRoomNote` | optional `#room` client convention |
| `actionSketch` | account/name only |
| `NULL_ACTION` | eosio.null / nonce |

[EDUCATION.md](./EDUCATION.md) · [POLICY.md](./POLICY.md) · [SECURITY.md](./SECURITY.md)

MIT — Pixel Journey
