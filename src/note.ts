/**
 * A one-line note that could ride on eosio.null::nonce.
 * On 2026-10-21, get_abi for eosio.null on wax.greymass.com and wax.eosusa.io
 * returned no structs. This file does not guess the JSON field name.
 */

export type Note = { ok: false; reason: string } | { ok: true; text: string; bytes: number };

export function note(input: string): Note {
  if (typeof input !== "string") return { ok: false, reason: "note must be a string" };
  const text = input.trim();
  if (!text) return { ok: false, reason: "note is empty" };
  if (text.includes("\n")) return { ok: false, reason: "note must be one line" };
  const bytes = new TextEncoder().encode(text).length;
  if (bytes > 120) return { ok: false, reason: "note is over 120 bytes" };
  return { ok: true, text, bytes };
}

export const NULL_ACTION = { account: "eosio.null", name: "nonce" } as const;
