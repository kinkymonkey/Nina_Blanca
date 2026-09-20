export function Glyph({
  name,
  filled = false,
  size = 20,
}: {
  name: string;
  filled?: boolean;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className={filled ? "material-symbols-outlined material-symbols-filled" : "material-symbols-outlined"}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      {name}
    </span>
  );
}

export function IconWell({
  name,
  size = "sm",
  tone = "gold",
}: {
  name: string;
  size?: "sm" | "md";
  tone?: "gold" | "muted";
}) {
  const box = size === "md" ? "h-10 w-10" : "h-8 w-8";
  const bg = tone === "muted" ? "bg-surface-high" : "bg-primary-container/20";
  return (
    <span className={`flex ${box} shrink-0 items-center justify-center rounded-full ${bg} text-primary`}>
      <Glyph name={name} size={size === "md" ? 20 : 18} />
    </span>
  );
}
