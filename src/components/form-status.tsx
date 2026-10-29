"use client";

import { useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormStatusProps = {
  successTitle: string;
  successMessage: string;
};

export function FormStatus({ successTitle, successMessage }: FormStatusProps) {
  const searchParams = useSearchParams();
  const state = searchParams.get("form") ?? undefined;

  if (state !== "submitted" && state !== "error") return null;

  const success = state === "submitted";

  return (
    <div
      className={`form-status form-status--${success ? "success" : "error"}`}
      role="status"
    >
      {success ? (
        <CheckCircle2 size={22} aria-hidden="true" />
      ) : (
        <AlertCircle size={22} aria-hidden="true" />
      )}
      <div>
        <strong>{success ? successTitle : "That did not go through."}</strong>
        <p>
          {success
            ? successMessage
            : "Please check the required fields and try again. If the problem continues, contact us by email."}
        </p>
      </div>
    </div>
  );
}
