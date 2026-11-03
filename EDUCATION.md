# Education — null-action notes

## Pattern

Some communities put short public messages near **eosio.null** actions (often discussed as `nonce`) so indexes can surface them without a dedicated chat contract.

This lab only validates a **one-line ≤120-byte** UTF-8 note and documents the action name. It does **not**:

- invent ABI data field names
- sign or broadcast
- claim a stable on-chain chat standard

## ABI honesty

On **2026-10-21**, `get_abi` for `eosio.null` on wax.greymass.com and wax.eosusa.io returned **no structs**. Hosts must re-check ABI before building real transactions.

## WharfKit

If a product intentionally signs Antelope actions, prefer **WharfKit** (session kit / session keys as appropriate). Avoid teaching deprecated eosjs / Anchor Link paths as the default.

## Optional `#room` tag

`parseRoomNote` is a **client convention** for teaching feeds, not an on-chain standard.

## Related

- `wax-p2p-null-action-chat-feed`
