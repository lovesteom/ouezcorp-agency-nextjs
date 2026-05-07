import { redirect } from "next/navigation";
import PasswordForm from "@/app/admin/login/PasswordForm";
import TwoFactorForm from "@/app/admin/login/TwoFactorForm";
import { getAdminSession, hasPending2FA } from "@/lib/auth/admin";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const pending2FA = await hasPending2FA();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Accès Administrateur
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {pending2FA
            ? "Saisissez le code de votre application 2FA."
            : "Connectez-vous avec votre compte admin pour continuer."}
        </p>

        {pending2FA ? <TwoFactorForm /> : <PasswordForm />}
      </div>
    </div>
  );
}
