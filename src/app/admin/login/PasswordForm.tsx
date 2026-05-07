"use client";

import { useActionState } from "react";
import { loginWithPassword } from "@/app/admin/login/actions";

export default function PasswordForm() {
  const [state, formAction, isPending] = useActionState(loginWithPassword, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email administrateur
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gray-900 text-white py-2.5 font-medium hover:bg-black transition disabled:opacity-60"
      >
        {isPending ? "Connexion..." : "Continuer vers le 2FA"}
      </button>
    </form>
  );
}
