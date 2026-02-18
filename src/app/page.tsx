import { AuthForm } from "@/components/auth-form";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded bg-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-4">
            C
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Cancer Research Platform
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Accelerating precision oncology discovery
          </p>
        </div>

        <AuthForm />

        <p className="text-center text-xs text-slate-400 mt-8">
          &copy; 2026 Cancer Platform. All rights reserved.
        </p>
      </div>
    </main>
  );
}
