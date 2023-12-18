"use client";

import { GLobalContextProvider } from "./Context/contextStore";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return <GLobalContextProvider>{children}</GLobalContextProvider>;
}
