# A one-line note that could ride on eosio.null — without inventing the ABI

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach a 120-byte one-line note validator and name the action `eosio.null::nonce`, without claiming a chat standard or a known data field.

**Real code:** `npm test`. **Does not** sign, broadcast, or invent ABI keys.

The course is [EDUCATION.md](EDUCATION.md) (beginner, intermediate, masterclass).

## What is true (executed)

| Rule | Result |
| --- | --- |
| `note("  gm  ")` | `{ ok: true, text: "gm", bytes: 2 }` |
| empty / whitespace | `note is empty` |
| multiline or 200 bytes | refused |
| `#general hello` | room `general`, body `hello` |
| `filterByRoom(SAMPLE_FEED, "general")` | two items, first body `hello` |
| `remainingBytes("gm")` | 118 |
| `NULL_ACTION` | `{ account: "eosio.null", name: "nonce" }` |
| `actionSketch()` | names the action; data hint says not to invent fields |

On 2026-10-21, `get_abi` for `eosio.null` on wax.greymass.com and wax.eosusa.io returned no structs. Re-check the live ABI before any real transaction.

## What is in the repo

| Piece | Role |
| --- | --- |
| `src/note.ts` | validator, room parse, feed filter, action sketch |
| `src/note.test.ts` | the executed rule |
| `src/Demo.tsx` | interactive lab |
| `src/api.ts` / `src/usecases.ts` | request builders; nothing is sent |
| Docs | EDUCATION · POLICY · SECURITY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** keep the note pure so tests do not need a node.  
**Do** re-read the ABI immediately before signing.  
**Do** prefer WharfKit if a host later signs on purpose.

**Do not** invent JSON field names for `nonce`.  
**Do not** call a client `#room` tag an on-chain standard.  
**Do not** treat a null action as free, moderated, or ordered chat.

## Related

- `wax-p2p-null-action-chat-feed`

MIT — Pixel Journey
