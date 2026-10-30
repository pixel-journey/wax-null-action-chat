"use client";

import { useMemo, useState } from "react";
import { NULL_ACTION, note } from "./note";
import { NULL_NOTE_MYTHS } from "./myths";

export function Demo() {
  const [input, setInput] = useState("gm");
  const ready = useMemo(() => note(input), [input]);

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>A note, not a signed nonce</h1>
      <p className="lede">
        {NULL_ACTION.account}::{NULL_ACTION.name} is a real action. On 2026-10-21 the
        published ABI had no structs, so this page does not invent a JSON field. Nothing is
        broadcast.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {NULL_NOTE_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <label style={{ display: "block", marginBottom: "1rem" }}>
        Note (one line)
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.35rem" }}
          maxLength={200}
        />
      </label>

      {ready.ok ? (
        <p>
          "{ready.text}" is <strong>{ready.bytes}</strong> UTF-8 bytes — ready as text, not as
          a signed action.
        </p>
      ) : (
        <p style={{ color: "#f87171" }}>{ready.reason}</p>
      )}

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md. Re-check live ABI before any host app builds nonce data.
      </p>
    </main>
  );
}
