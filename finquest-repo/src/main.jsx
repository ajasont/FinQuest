import React from "react";
import ReactDOM from "react-dom/client";
import FinQuest from "./FinQuest.jsx";

/*
 * Storage shim: FinQuest was born as a Claude.ai artifact, where a
 * window.storage API persists progress. When the game runs standalone
 * (this repo), that API doesn't exist — so we recreate it on top of
 * localStorage with the same shape and behavior (get throws on a
 * missing key, just like the original).
 */
if (typeof window !== "undefined" && !window.storage) {
  const safe = (fn, fallback = null) => {
    try { return fn(); } catch { return fallback; }
  };
  window.storage = {
    async get(key) {
      const value = safe(() => localStorage.getItem(key));
      if (value === null || value === undefined) throw new Error("Key not found: " + key);
      return { key, value, shared: false };
    },
    async set(key, value) {
      safe(() => localStorage.setItem(key, value));
      return { key, value, shared: false };
    },
    async delete(key) {
      safe(() => localStorage.removeItem(key));
      return { key, deleted: true, shared: false };
    },
    async list(prefix = "") {
      const keys = safe(() => Object.keys(localStorage).filter((k) => k.startsWith(prefix)), []) || [];
      return { keys, prefix, shared: false };
    },
  };
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FinQuest />
  </React.StrictMode>
);
