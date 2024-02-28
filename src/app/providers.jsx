"use client";
import { NextUIProvider } from "@nextui-org/react";
import axios from "axios";
import { Provider as JotaiProvider } from "jotai";

axios.defaults.baseURL = "http://localhost:8080";

export function Providers({ children }) {

  return (
    <NextUIProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </NextUIProvider>
  );
}
