"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PrimaryButton } from "@/components/ops-ui";

export default function LoginPage() {
  const router = useRouter();

  function enterConsole() {
    if (typeof window !== "undefined") {
      localStorage.setItem("peerwheel_api_key", "peerwheel_demo_local_dev_key");
      localStorage.setItem("peerwheel_tenant_id", "tnt_demo");
    }
    router.push("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        backgroundImage:
          "radial-gradient(circle at 50% 35%, rgba(168, 212, 90, 0.12), transparent 50%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "min(520px, 100%)",
          textAlign: "center",
          display: "grid",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 48,
            fontWeight: 700,
            color: "var(--color-brand)",
            letterSpacing: "0.02em",
          }}
        >
          Peerwheel
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 600,
            lineHeight: 1.25,
            color: "var(--color-ink)",
          }}
        >
          Settle the ride when the vehicle proves out
        </h1>
        <p style={{ margin: 0, color: "var(--color-steel)", fontSize: 15 }}>
          Night-asphalt corridor desk for idle AVs — yield, integrity holds, peer payout.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
          <PrimaryButton onClick={enterConsole}>Enter console</PrimaryButton>
        </div>
      </motion.div>
    </div>
  );
}
