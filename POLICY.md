# Policy — null-action note lab

**Trust label:** `educational-reference`  
**Updated:** 2026-11-03

## In scope

- Pure note validation and educational sketches
- Offline demo and unit tests

## Out of scope

- Broadcast / push_transaction
- Invented ABI data fields
- Claiming a standardized on-chain chat protocol

## Rules

1. Prefer WharfKit for any future intentional signing in hosts.
2. Re-verify eosio.null ABI before production use.
3. `npm test` never requires network.
