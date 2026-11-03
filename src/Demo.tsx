"use client";

import { useMemo, useState } from "react";
import {
  actionSketch,
  note,
  parseRoomNote,
  remainingBytes,
  SAMPLE_NOTES,
} from "./note";
import { GLOSSARY, NOTE_MYTHS } from "./myths";

export function Demo() {
  const [text, setText] = useState("gm");

  const result = useMemo(() => note(text), [text]);
  const room = useMemo(() => parseRoomNote(text), [text]);
  const left = remainingBytes(text);
  const sketch = actionSketch();

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Null-action note lab</h1>
      <p className="lede">
        Validate a one-line note that <em>could</em> ride on eosio.null::nonce. No invented
        ABI fields. No broadcast. Prefer WharfKit in hosts that sign.
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
        {NOTE_MYTHS.map((m) => (
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {SAMPLE_NOTES.map((s) => (
          <button key={s.id} type="button" onClick={() => setText(s.text)}>
            {s.id}
          </button>
        ))}
      </div>

      <label style={{ display: "block", marginBottom: "0.75rem" }}>
        Note (one line)
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
        />
      </label>

      {result.ok ? (
        <p>
          ok · <strong>{result.bytes}</strong> bytes · remaining capacity{" "}
          <strong>{left}</strong>
        </p>
      ) : (
        <p>{result.reason}</p>
      )}

      {room.ok && room.room && (
        <p style={{ fontSize: "0.9rem" }}>
          room tag: <strong>#{room.room}</strong> · body: {room.body}
        </p>
      )}

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Action sketch (not signed)</h2>
        <pre style={{ fontSize: "0.85rem", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(sketch, null, 2)}
        </pre>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Runbook</h2>
        <ol style={{ fontSize: "0.9rem" }}>
          <li>Validate note() offline.</li>
          <li>Confirm live eosio.null ABI before any real transaction.</li>
          <li>If signing, use WharfKit — not deprecated eosjs / Anchor Link stacks.</li>
          <li>Never invent data field names in this educational lab.</li>
        </ol>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Glossary</h2>
        <dl>
          {GLOSSARY.map((g) => (
            <div key={g.term} style={{ marginBottom: "0.5rem" }}>
              <dt>
                <strong>{g.term}</strong>
              </dt>
              <dd style={{ margin: 0 }}>{g.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See EDUCATION.md · POLICY.md · SECURITY.md · companion: wax-p2p-null-action-chat-feed
      </p>
    </main>
  );
}
