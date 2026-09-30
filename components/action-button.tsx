"use client";

import { useFormStatus } from "react-dom";
import { toast } from "@/components/toast";

/** Submit button that shows a pending label while its server action runs. */
export function PendingButton({
  children,
  pendingLabel = "Working…",
  className,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className ?? ""} disabled:opacity-60`}>
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Form wrapper: runs a server action that returns true/false, then toasts the result. */
export function ToastForm({
  action,
  success,
  failure = "Please wait a while before trying again.",
  children,
  className,
}: {
  action: (formData: FormData) => Promise<boolean>;
  success: string;
  failure?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      className={className}
      action={async (formData) => {
        const ok = await action(formData);
        toast(ok ? success : failure, ok);
      }}
    >
      {children}
    </form>
  );
}
