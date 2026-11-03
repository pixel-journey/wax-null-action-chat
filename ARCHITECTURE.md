# Architecture

```
input string
    │
    ▼
  note() → text + bytes
    │
    ├── parseRoomNote (#room body)
    ├── remainingBytes
    └── actionSketch (account/name only — no data invented)
```

Honesty boundary: no network, no sign, no broadcast.
