import GSTCalculator from "@/components/GSTCalculator";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10">
        <GSTCalculator />
      </div>
    </main>
  );
}
