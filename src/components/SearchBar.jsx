import { useState, useRef, useEffect } from "react";

const CITIES = [
  { timezone: "Asia/Kolkata",        label: "India",       flag: "🇮🇳" },
  { timezone: "America/New_York",    label: "USA (NY)",    flag: "🇺🇸" },
  { timezone: "Europe/London",       label: "UK",          flag: "🇬🇧" },
  { timezone: "Asia/Tokyo",          label: "Japan",       flag: "🇯🇵" },
  { timezone: "Australia/Sydney",    label: "Australia",   flag: "🇦🇺" },
  { timezone: "Europe/Paris",        label: "France",      flag: "🇫🇷" },

];

export default function SearchBar({ onAdd, existingCities }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const dropRef = useRef();

  const suggestions = CITIES
    .filter(c => !existingCities.includes(c.timezone))
    .filter(c =>
      !query ||
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.timezone.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (city) => {
    setQuery("");
    setShowDropdown(false);
    setError("");
    onAdd(city.timezone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (suggestions.length === 1) { handleSelect(suggestions[0]); return; }
    if (suggestions.length === 0) setError(`"${query}" not found. Try a country name.`);
    else setError("Please select a city from the list.");
  };

  return (
    <div className="relative flex-1 min-w-[260px]" ref={dropRef}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3 text-sm opacity-40">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setError(""); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
            placeholder="Search country or city…"
            autoComplete="off"
            className="w-full rounded-2xl pl-9 pr-8 py-2.5 text-sm border outline-none transition-all duration-200"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setError(""); }}
              className="absolute right-3 text-lg leading-none cursor-pointer" style={{ color: "var(--text2)" }}>
              ×
            </button>
          )}
        </div>
        <button type="submit"
          className="rounded-2xl px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 hover:opacity-90 cursor-pointer"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          Add
        </button>
      </form>

      {error && <p className="text-xs mt-1.5 pl-1" style={{ color: "var(--error)" }}>⚠ {error}</p>}

      {showDropdown && suggestions.length > 0 && (
        <ul className="animate-fade-down absolute top-full mt-1.5 left-0 right-0 rounded-2xl border overflow-hidden shadow-lg z-50"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          {!query && (
            <li className="px-4 py-2 text-xs uppercase tracking-wider" style={{ background: "var(--surface2)", color: "var(--text2)" }}>
              Available cities
            </li>
          )}
          {suggestions.map(city => (
            <li key={city.timezone} onMouseDown={() => handleSelect(city)}
              className="px-4 py-2.5 cursor-pointer flex items-center gap-3 border-b transition-colors last:border-0 hover:bg-[var(--surface2)]"
              style={{ borderColor: "var(--border)" }}>
              <span className="text-lg">{city.flag}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{city.label}</p>
                <p className="text-xs" style={{ color: "var(--text2)" }}>{city.timezone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
