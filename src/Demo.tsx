"use client";

import { useEffect, useMemo, useState } from "react";
import { Cases } from "./Cases";
import { downloadText, exportNoteMarkdown } from "./exportReport";
import {
  actionSketch,
  filterByRoom,
  note,
  parseRoomNote,
  remainingBytes,
  SAMPLE_FEED,
  SAMPLE_NOTES,
} from "./note";
import { GLOSSARY, NOTE_MYTHS } from "./myths";
import { decodeShareState, encodeShareState } from "./shareState";

const LS_KEY = "pxj-null-note-v1";

export function Demo() {
  const [text, setText] = useState("gm");
  const [roomFilter, setRoomFilter] = useState("general");
  const [shareMsg, setShareMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fromUrl = decodeShareState(window.location.search);
    if (fromUrl.text) {
      setText(fromUrl.text);
      return;
    }
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as { text?: string };
      if (p.text) setText(p.text);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ text }));
    } catch {
      /* ignore */
    }
  }, [text]);

  const result = useMemo(() => note(text), [text]);
  const room = useMemo(() => parseRoomNote(text), [text]);
  const left = remainingBytes(text);
  const sketch = actionSketch();
  const feed = useMemo(
    () => filterByRoom([...SAMPLE_FEED], roomFilter.trim() || null),
    [roomFilter]
  );

  const copyShare = async () => {
    const qs = encodeShareState({ text });
    const path =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}?${qs}`
        : `?${qs}`;
    try {
      await navigator.clipboard.writeText(path);
      setShareMsg("Share URL copied");
    } catch {
      setShareMsg(path);
    }
  };

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
        <>
          <p>
            ok · <strong>{result.bytes}</strong> bytes · remaining capacity{" "}
            <strong>{left}</strong>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={() =>
                downloadText(
                  "null-note.md",
                  exportNoteMarkdown({
                    text: result.text,
                    ok: "true",
                    bytes: String(result.bytes),
                    room: room.ok && room.room ? room.room : undefined,
                    body: room.ok ? room.body : undefined,
                  })
                )
              }
            >
              Download MD
            </button>
            <button type="button" onClick={() => void copyShare()}>
              Copy share URL
            </button>
          </div>
          {shareMsg && (
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>{shareMsg}</p>
          )}
        </>
      ) : (
        <p>{result.reason}</p>
      )}

      {room.ok && room.room && (
        <p style={{ fontSize: "0.9rem" }}>
          room tag: <strong>#{room.room}</strong> · body: {room.body}
        </p>
      )}

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Sample feed filter (client convention)</h2>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Room filter
          <input
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <ul style={{ fontSize: "0.9rem" }}>
          {feed.map((f) => (
            <li key={f.text}>
              {f.room ? `#${f.room} ` : ""}
              {f.body}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Action sketch (not signed)</h2>
        <pre style={{ fontSize: "0.85rem", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(sketch, null, 2)}
        </pre>
      </section>

      <Cases />

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
        URL overrides localStorage when present. See EDUCATION.md · SECURITY.md
      </p>
    </main>
  );
}
