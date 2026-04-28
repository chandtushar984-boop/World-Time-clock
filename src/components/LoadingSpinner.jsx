export default function LoadingSpinner({ label = "Fetching time data…" }) {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <div className="w-10 h-10 rounded-full border-[3px] border-t-[var(--accent)] animate-spin-custom"
        style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }} />
      <p className="text-sm" style={{ color: "var(--text2)" }}>{label}</p>
    </div>
  );
}
