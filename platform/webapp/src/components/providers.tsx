"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { RoleProvider } from "@/contexts/role-context";

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <RoleProvider>{children}</RoleProvider>
    </QueryClientProvider>
  );
}
