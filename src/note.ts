/**
 * A one-line note that could ride on eosio.null::nonce.
 * On 2026-10-21, get_abi for eosio.null on wax.greymass.com and wax.eosusa.io
 * returned no structs. This file does not guess the JSON field name.
 * No broadcast. Prefer WharfKit if a host later signs intentionally.
 */

export type NoteOk = { ok: true; text: string; bytes: number };
export type NoteErr = { ok: false; reason: string };
export type Note = NoteOk | NoteErr;

export const MAX_NOTE_BYTES = 120;

export function note(input: string): Note {
  if (typeof input !== "string") return { ok: false, reason: "note must be a string" };
  const text = input.trim();
  if (!text) return { ok: false, reason: "note is empty" };
  if (text.includes("\n")) return { ok: false, reason: "note must be one line" };
  const bytes = new TextEncoder().encode(text).length;
  if (bytes > MAX_NOTE_BYTES) {
    return { ok: false, reason: `note is over ${MAX_NOTE_BYTES} bytes` };
  }
  return { ok: true, text, bytes };
}

export function parseRoomNote(
  input: string
): { ok: false; reason: string } | { ok: true; room: string | null; body: string; note: NoteOk } {
  const n = note(input);
  if (!n.ok) return n;
  const m = n.text.match(/^#([a-z0-9_-]{1,24})\s+(.+)$/i);
  if (!m) return { ok: true, room: null, body: n.text, note: n };
  return { ok: true, room: m[1].toLowerCase(), body: m[2], note: n };
}

export function remainingBytes(input: string): number {
  const bytes = new TextEncoder().encode(input.trim()).length;
  return Math.max(0, MAX_NOTE_BYTES - bytes);
}

/** Filter educational feed items by optional room (client convention). */
export function filterByRoom(
  items: readonly string[],
  room: string | null
): { ok: true; text: string; room: string | null; body: string }[] {
  const out: { ok: true; text: string; room: string | null; body: string }[] = [];
  for (const item of items) {
    const p = parseRoomNote(item);
    if (!p.ok) continue;
    if (room === null || p.room === room) {
      out.push({ ok: true, text: p.note.text, room: p.room, body: p.body });
    }
  }
  return out;
}

export const NULL_ACTION = { account: "eosio.null", name: "nonce" } as const;

export function actionSketch(): {
  account: string;
  name: string;
  authorizationHint: string;
  dataHint: string;
} {
  return {
    account: NULL_ACTION.account,
    name: NULL_ACTION.name,
    authorizationHint: "signer@active (host decides)",
    dataHint:
      "ABI for eosio.null may expose no structs — do not invent field names in this lab",
  };
}

export const SAMPLE_NOTES = [
  { id: "gm", text: "gm" },
  { id: "room", text: "#general hello pixel journey" },
  { id: "longish", text: "a".repeat(40) },
] as const;

export const SAMPLE_FEED = [
  "gm",
  "#general hello",
  "#dev ship it",
  "#general second",
] as const;
