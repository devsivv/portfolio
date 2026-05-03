export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-slate-900/70 px-6 py-4">
        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
        <p className="text-sm font-medium text-cyan-200">Booting portfolio...</p>
      </div>
    </div>
  );
}
