"use client";

import { useActionState } from "react";
import { cancelTwoFactor, verifyTwoFactor } from "@/app/admin/login/actions";

export default function TwoFactorForm() {
  const [state, formAction, isPending] = useActionState(verifyTwoFactor, {
    error: null,
  });

  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <div className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
            {state.error}
          </div>
        )}

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Code 2FA (application Authenticator)
          </label>
          <input
            id="code"
            name="code"
            type="text"
            required
            pattern="[0-9]{6}"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            placeholder="123456"
            className="w-full rounded-md border border-gray-300 px-3 py-2 tracking-[0.3em] text-center"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-gray-900 text-white py-2.5 font-medium hover:bg-black transition disabled:opacity-60"
        >
          {isPending ? "Vérification..." : "Valider la connexion"}
        </button>
      </form>

      <form action={cancelTwoFactor}>
        <button
          type="submit"
          className="w-full rounded-md border border-gray-300 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Revenir à la connexion
        </button>
      </form>
    </div>
  );
}
