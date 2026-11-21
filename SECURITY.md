# Security — eosio.null note sketch

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty / multiline / > **120** UTF-8 bytes | refused |
| Action sketch | account `eosio.null`, name `nonce` only — **no invented data fields** |
| `#room` tag | client convention only; not an ABI field |

Dated note (2026-10-21): `get_abi` for `eosio.null` on public hosts returned **no structs**. Hosts must re-check before building a real tx.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live ABI | Re-check before building a real tx |
| Broadcast | Public notes are permanent and attributable |
| Spam | Null actions still cost resources |
| Keys | Never paste private keys into a note |

## Attack angles

1. Inventing ABI field names for `nonce` without a live struct.  
2. Treating `#room` as an on-chain standard.  
3. Teaching broadcast without warning about permanence.  
4. Embedding secrets or seeds in the note body.  
5. Claiming the sketch proves a message was posted on-chain.  
6. Putting multi-line chat text in `nonce` and citing [p2p feed](https://github.com/pixel-journey/wax-p2p-null-action-chat-feed) (that product uses **transfer memos**).

## Honesty limits

No signing. No broadcast. An action name is not a chat protocol.

| Sibling | Distinction |
| --- | --- |
| [p2p null-action chat feed](https://github.com/pixel-journey/wax-p2p-null-action-chat-feed) | `eosio.token::transfer` memo `pxjchat/v1\|...` |
| [memo router](https://github.com/pixel-journey/px-memo-action-router) | Structured product memos |

Prefer WharfKit if a host later signs. [docs.wax.io](https://docs.wax.io/) · [WharfKit](https://wharfkit.com/).
