"use client";

import { NULL_ACTION, note } from "./note";

export function Demo() {
  const ready = note("gm");
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>A note, not a signed nonce</h1>
      <p className="lede">
        {NULL_ACTION.account}::{NULL_ACTION.name} is a real action. On 2026-10-21 the published ABI had no structs, so this page does not invent a JSON field. Nothing is broadcast.
      </p>
      {ready.ok ? <p>"{ready.text}" is {ready.bytes} bytes.</p> : <p>{ready.reason}</p>}
    </main>
  );
}
