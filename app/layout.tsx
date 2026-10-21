import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'A note, not a guessed nonce',
  description: 'eosio.null::nonce is real. The published ABI had no structs, so no action JSON is built.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
