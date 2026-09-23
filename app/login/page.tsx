import { signIn, signUp } from "@/app/actions";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; notice?: string }>
}) {
  const { error, notice } = await searchParams;

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <section className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-[var(--accent)]">PROFIT</p>
        <h1 className="mt-2 text-3xl font-semibold">Field Profitability</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Sign in to calculate and save field-level operating profitability.
        </p>

        {error ? (
          <p className="mt-4 rounded-lg bg-orange-50 p-3 text-sm text-orange-800">
            Authentication failed. Check your details and try again.
          </p>
        ) : null}

        {notice === "check_email" ? (
          <p className="mt-4 rounded-lg bg-[var(--accent-soft)] p-3 text-sm">
            Check your email to confirm the account, then sign in.
          </p>
        ) : null}

        <form className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" minLength={8} required className="mt-1 w-full rounded-lg border p-3" />
          </label>
          <div className="flex gap-3">
            <button formAction={signIn} className="flex-1 rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white">
              Sign in
            </button>
            <button formAction={signUp} className="flex-1 rounded-lg border px-4 py-3 font-semibold">
              Create account
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
