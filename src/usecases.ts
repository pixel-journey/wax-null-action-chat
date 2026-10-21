import { CHAIN_ORIGIN, HISTORY_ORIGIN, getAccount, historyActions } from "./api";
import { NULL_ACTION, note } from "./note";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const ready = note("gm");
if (!ready.ok) throw new Error(ready.reason);
const text = ready;

export const USE_CASES: UseCase[] = [
  {
    title: "Nonce history, not a chat log parser",
    detail: `"${text.text}" is ${text.bytes} bytes. Hyperion can list ${NULL_ACTION.account}:${NULL_ACTION.name}. This repo does not decode those rows. The request is not sent.`,
    request: historyActions(HISTORY_ORIGIN, NULL_ACTION.account, `${NULL_ACTION.account}:${NULL_ACTION.name}`, 20),
    transaction: null,
  },
  {
    title: "No action JSON, because the ABI had no structs",
    detail: "get_abi on wax.greymass.com and wax.eosusa.io returned only the account name on 2026-10-21. A waxblock trace shows a single length-prefixed string. Guessing the field name would be a signature people might send. None is built.",
    request: getAccount(CHAIN_ORIGIN, NULL_ACTION.account),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (text.text !== "gm") throw new Error("note");
  if (USE_CASES.some((item) => item.transaction !== null)) throw new Error("no guessed nonce");
}
