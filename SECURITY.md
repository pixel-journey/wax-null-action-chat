# Security — eosio.null note sketch

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty / multiline / > **120** UTF-8 bytes | refused |
| Action sketch | account `eosio.null`, name `nonce` only — **no invented data fields** |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live ABI | Re-check before building a real tx; dated note found no structs on 2026-10-21 |
| Broadcast | Public notes are permanent and attributable |
| Spam | Null actions still cost resources |
| Keys | Never paste private keys into a note |

## Attack angles

1. Inventing ABI field names for `nonce` without a live struct.  
2. Treating `#room` as an on-chain standard.  
3. Teaching broadcast without warning about permanence.  
4. Embedding secrets or seeds in the note body.  
5. Claiming the sketch proves a message was posted on-chain.

## Honesty limits

No signing. No broadcast. Prefer WharfKit if a host later signs. [docs.wax.io](https://docs.wax.io/) · [WharfKit](https://wharfkit.com/).
