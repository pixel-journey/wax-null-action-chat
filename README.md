# A note, not a guessed nonce

**Trust label:** `educational-reference`  
**Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

eosio.null::nonce is real. The published ABI had no structs, so no action JSON is built.

The earlier README described a live product. This tree does not ship that.

## What is actually in the repo

| Piece | Role |
| --- | --- |
| `src/note.ts` | The pure rules |
| `src/note.test.ts` | The claims in the verification log |
| `src/usecases.ts` | HTTP requests, built and not sent |
| `src/Demo.tsx` | Offline page |

`npm test` runs the rules. `npm run dev` opens the page.

## Queries

`executed` is false. This repo did not call any host. No transaction is invented.
