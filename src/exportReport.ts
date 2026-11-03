export function exportNoteMarkdown(input: {
  text: string;
  ok: string;
  bytes?: string;
  room?: string;
  body?: string;
}): string {
  return [
    "# Null-action note (educational)",
    "",
    "> No broadcast. No invented ABI fields.",
    "",
    `text: ${input.text}`,
    `ok: ${input.ok}`,
    input.bytes ? `bytes: ${input.bytes}` : "",
    input.room ? `room: ${input.room}` : "",
    input.body ? `body: ${input.body}` : "",
    "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

export function downloadText(filename: string, content: string): void {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
