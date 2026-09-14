"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type OperatorRole = "owner" | "ops" | "dispute" | "strategy" | "city";

type RoleContextValue = {
  role: OperatorRole;
  setRole: (role: OperatorRole) => void;
  corridorId: string;
  setCorridorId: (id: string) => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<OperatorRole>("owner");
  const [corridorId, setCorridorId] = useState("cor_dxb_marina");
  const value = useMemo(
    () => ({ role, setRole, corridorId, setCorridorId }),
    [role, corridorId]
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
