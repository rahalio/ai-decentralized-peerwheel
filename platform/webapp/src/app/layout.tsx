import type { Metadata } from "next";
import { AppProviders } from "@/components/providers";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peerwheel",
  description: "Peer-to-peer AV sharing desk — settle when integrity proves out",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
