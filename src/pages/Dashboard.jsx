import { useState, useCallback } from "react";
import { fetchTimezone } from "../services/api";
import TimeCard from "../components/TimeCard";
import LoadingSpinner from "../components/LoadingSpinner";

const CITIES = [
  { timezone: "Asia/Kolkata",     label: "India",     flag: "🇮🇳" },
  { timezone: "America/New_York", label: "USA",       flag: "🇺🇸" },
  { timezone: "Europe/London",    label: "UK",        flag: "🇬🇧" },
  { timezone: "Asia/Tokyo",       label: "Japan",     flag: "🇯🇵" },
  { timezone: "Australia/Sydney", label: "Australia", flag: "🇦🇺" },
];

export default function Dashboard() {
  const [cities, setCities]       = useState([]);   // starts EMPTY
  const [loadingTz, setLoadingTz] = useState(null);
  const [error, setError]         = useState("");

  const handleAdd = useCallback(async (timezone) => {
    if (cities.find(c => c.timezone === timezone)) {
      setError("This city is already added!");
      setTimeout(() => setError(""), 2500);
      return;
    }
    setLoadingTz(timezone);
    setError("");
    try {
      const data = await fetchTimezone(timezone);
      setCities(prev => [...prev, data]);
    } catch {
      setError("Could not load city. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoadingTz(null);
    }
  }, [cities]);

  const handleRemove = useCallback((timezone) => {
    setCities(prev => prev.filter(c => c.timezone !== timezone));
  }, []);

  const isAdded = (tz) => !!cities.find(c => c.timezone === tz);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">

      {/* Hero */}
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
          World Time Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--text2)" }}>
          Click a country below to add it to your dashboard
        </p>
      </div>

      {/* City buttons */}
      <div className="rounded-2xl border p-5 mb-6"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "var(--text2)" }}>
          Select a Country to Add
        </p>
        <div className="flex flex-wrap gap-3">
          {CITIES.map(c => {
            const added = isAdded(c.timezone);
            const isLoading = loadingTz === c.timezone;
            return (
              <button
                key={c.timezone}
                onClick={() => handleAdd(c.timezone)}
                disabled={added || !!loadingTz}
                className="flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200"
                style={{
                  background: added ? "var(--accent)" : "var(--surface2)",
                  borderColor: added ? "var(--accent)" : "var(--border)",
                  color: added ? "var(--btn-text)" : "var(--text)",
                  opacity: (!!loadingTz && !isLoading) ? 0.5 : 1,
                  cursor: added ? "default" : loadingTz ? "not-allowed" : "pointer",
                  transform: "translateY(0)",
                }}
                onMouseEnter={e => { if (!added && !loadingTz) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span className="text-base">{c.flag}</span>
                <span>{isLoading ? "Adding…" : c.label}</span>
                {added && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="animate-shake rounded-xl border px-4 py-2.5 mb-4 text-sm"
          style={{ background: "rgba(229,62,62,0.08)", borderColor: "var(--error)", color: "var(--error)" }}>
          ⚠ {error}
        </div>
      )}

      {/* Loading spinner for the city being added */}
      {loadingTz && <LoadingSpinner label={`Adding ${CITIES.find(c => c.timezone === loadingTz)?.label}…`} />}

      {/* Empty state */}
      {cities.length === 0 && !loadingTz && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🌍</p>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            No cities added yet — click a country above to get started!
          </p>
        </div>
      )}

      {/* Cards */}
      {cities.length > 0 && (
        <div className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {cities.map(city => (
            <TimeCard key={city.timezone} city={city} onRemove={handleRemove} />
          ))}
        </div>
      )}

    </div>
  );
}
