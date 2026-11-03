"use client";

const CASES = [
  {
    title: "Short line",
    body: "\"gm\" → ok, 2 bytes.",
  },
  {
    title: "Room tag",
    body: "#general hello → room general, body hello (client convention).",
  },
  {
    title: "Size gate",
    body: "Notes over 120 UTF-8 bytes are rejected.",
  },
  {
    title: "No broadcast",
    body: "This lab never signs or pushes a transaction.",
  },
  {
    title: "ABI honesty",
    body: "Do not invent eosio.null data field names without a live ABI check.",
  },
] as const;

export function Cases() {
  return (
    <section aria-label="Teaching cases" style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1rem" }}>Cases</h2>
      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.9rem" }}>
        {CASES.map((c) => (
          <li key={c.title} style={{ marginBottom: "0.5rem" }}>
            <strong>{c.title}.</strong> {c.body}
          </li>
        ))}
      </ul>
    </section>
  );
}
