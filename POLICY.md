# Policy — null action note

**Trust label:** `educational-reference`  
**Updated:** 2026-10-31

## In scope

- Pure `note(text)` validation (one line, ≤120 bytes)
- Document `eosio.null::nonce` as the candidate action
- Honest ABI gap: no invented field names

## Out of scope

- Live chat feed / product
- Auto-broadcast
- Guessing nonce ABI JSON when structs are empty

## Rules

- Demo does not call hosts
- Prefer WharfKit when a host app adds intentional signing after ABI is verified
