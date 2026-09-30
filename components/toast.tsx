"use client";

import { useEffect, useState } from "react";

type Toast = { id: number; message: string; ok: boolean };

/** Call from any client component: toast("Vigil joined"), toast("Try again", false). */
export function toast(message: string, ok = true) {
  window.dispatchEvent(new CustomEvent("nina-toast", { detail: { message, ok } }));
}

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    let next = 0;
    const onToast = (event: Event) => {
      const { message, ok } = (event as CustomEvent<{ message: string; ok: boolean }>).detail;
      const id = ++next;
      setItems((list) => [...list, { id, message, ok }]);
      window.setTimeout(() => setItems((list) => list.filter((item) => item.id !== id)), 3500);
    };
    window.addEventListener("nina-toast", onToast);
    return () => window.removeEventListener("nina-toast", onToast);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2 px-4"
    >
      {items.map((item) => (
        <p
          key={item.id}
          style={{ animation: "toast-in 200ms ease-out" }}
          className={`rounded-sm border bg-surface-lowest px-5 py-3 text-sm font-semibold shadow-xl ${
            item.ok ? "border-primary text-primary" : "border-secondary text-secondary"
          }`}
        >
          {item.message}
        </p>
      ))}
    </div>
  );
}
