export type ShareState = { text: string };

export function encodeShareState(s: ShareState): string {
  const q = new URLSearchParams();
  q.set("t", s.text);
  return q.toString();
}

export function decodeShareState(search: string): Partial<ShareState> {
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const out: Partial<ShareState> = {};
  if (q.has("t")) out.text = q.get("t") ?? undefined;
  return out;
}
