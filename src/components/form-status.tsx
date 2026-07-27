import { AlertCircle, CheckCircle2 } from "lucide-react";

type FormStatusProps = {
  state?: string;
  successTitle: string;
  successMessage: string;
};

export function FormStatus({ state, successTitle, successMessage }: FormStatusProps) {
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
