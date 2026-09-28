"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a contact submission and acknowledges it. No email provider is
 * configured yet — this only logs server-side. Wire it to a provider (e.g.
 * Resend) before relying on it to actually reach anyone.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const firm = String(formData.get("firm") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactFormState["errors"] = {};
  if (!name) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email.";
  if (!message) errors.message = "Add a short message.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Check the fields below.", errors };
  }

  console.log("[contact] submission received", { name, email, firm, message });

  return {
    status: "success",
    message: "Thanks — we'll get back to you within one business day.",
    errors: {},
  };
}
