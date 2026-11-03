# Education — a one-line note, not a chat contract

> **Rung:** `npm test` passes. The lab validates text and names `eosio.null` / `nonce`. It does not invent ABI fields, sign, or broadcast.  
> **The test is the rule.**

On 2026-10-21, `get_abi` for `eosio.null` on wax.greymass.com and wax.eosusa.io returned no structs. Hosts must re-check the live ABI before building a real transaction. This course does not guess the JSON field name.

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Accept `"  gm  "` as `{ text: "gm", bytes: 2 }` and reject empty or multiline |
| Intermediate | Parse an optional `#room` tag and filter a feed without claiming an on-chain standard |
| Masterclass | Say why a missing ABI struct is a hard stop, and why this is not a chat protocol |

---

## Beginner — one scene

```ts
note("  gm  ")
// { ok: true, text: "gm", bytes: 2 }
```

| Input | Result |
| --- | --- |
| `""` or whitespace | `{ ok: false, reason: "note is empty" }` |
| `"a\nb"` | one-line refusal |
| `"x".repeat(200)` | over 120 bytes |
| non-string | `"note must be a string"` |

`remainingBytes("gm")` is 118. The cap is UTF-8 bytes, not characters. A short emoji can spend more than one byte.

`NULL_ACTION` is `{ account: "eosio.null", name: "nonce" }`. `actionSketch()` repeats those names and a data hint that says not to invent field names.

### Words

| Word | Meaning here |
| --- | --- |
| Note | Trimmed one-line string, ≤120 UTF-8 bytes |
| `#room` | Client convention in `parseRoomNote`. Not an ABI field |
| `nonce` | The action name this lab documents. Not a proven chat channel |
| Sketch | Account and name only. `dataHint` refuses invented keys |

### Predict, then run

```bash
npm test
```

1. `parseRoomNote("#general hello")` has room `"general"` and body `"hello"`.
2. `filterByRoom(SAMPLE_FEED, "general")` returns two items. The first body is `"hello"`.
3. `actionSketch().dataHint` mentions the ABI. It does not list a field.

---

## Intermediate — the room tag is a feed filter

`parseRoomNote` runs `note` first. If that fails, the error is returned as-is. A match is `#` plus 1–24 of `a-z0-9_-`, then whitespace, then a body. The room is lowercased. No match means `room: null` and the whole note is the body.

`filterByRoom` skips invalid notes. `room === null` keeps every valid note. A named room keeps only that room.

This is how a teaching UI can group messages. It is not how the chain stores rooms. There is no table, no scope, and no index in this repo.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Multi-line memo | Newlines in a field you do not know | refused | `rejects multiline and oversized` |
| 200-byte note | Silent truncation or a failed tx | refused at 120 bytes | same |
| Invent ABI keys | Broken transaction | `dataHint` warns; no keys emitted | `actionSketch does not invent data fields` |
| Treat `#room` as a contract feature | Wrong expectations | client convention only | `parses optional room tag` |

---

## Masterclass — an action name is not a protocol

Communities have used short public messages near `eosio.null` so indexers can surface them without a dedicated chat contract. That is history, not a standard this lab defines.

What is still not here:

- A live ABI read. The 2026-10-21 check is a dated note, not a subscription.
- A signed transaction. Prefer WharfKit if a host later signs on purpose. Do not teach eosjs or Anchor Link as the default.
- Persistence, ordering guarantees, moderation, or spam control. A null action is still a transaction the user pays for.
- Proof that `nonce` accepts a string. If the ABI has no structs, you stop.

Related teaching feed: `wax-p2p-null-action-chat-feed`. It is a different repo. Do not merge its claims into this one.

### Exercise

1. What does `note("  gm  ")` return? (`{ ok: true, text: "gm", bytes: 2 }`. Tested.)
2. Why does the sketch omit data fields? (The dated ABI check returned no structs. Inventing a name would be a lie.)
3. Is `#general` stored on chain by this lab? (No. It is a client regex.)

---

## What this course will not teach

- A working chat dApp
- The JSON shape of `eosio.null::nonce`
- A broadcast
