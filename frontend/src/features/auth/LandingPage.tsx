// src/features/auth/LandingPage.tsx
import LoginButton from "@/features/auth/LoginButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white">
      {/* ── header ──────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Polyglot AI</h1>
        {/* nav-size login button */}
        <LoginButton size="sm" />
      </header>

      {/* ── hero ───────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
          Learn languages naturally with AI
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-10">
          Chat in your target language, get silent correction behind the scenes,
          and review personalized grammar mistakes — powered by GPT-4 and designed for fluency.
        </p>
      </main>

      <footer className="text-sm text-zinc-500 text-center py-10">
        Dylan Dodds
      </footer>
    </div>
  );
}
