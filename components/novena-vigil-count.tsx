"use client";

import { useEffect, useState } from "react";

export function NovenaVigilCount({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const onChange = (event: Event) => {
      const delta = (event as CustomEvent<number>).detail || 0;
      setCount((value) => Math.max(0, value + delta));
    };
    window.addEventListener("nina-novena-vigil", onChange);
    return () => window.removeEventListener("nina-novena-vigil", onChange);
  }, []);

  return <>{count.toLocaleString("en-US")}</>;
}
