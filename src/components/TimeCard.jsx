import { useState, useEffect, memo } from "react";
import { useTheme } from "../context/ThemeContext";

const formatTime = (timezone) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
    }).format(new Date());
  } catch { return "--:--:-- --"; }
};

const formatDate = (timezone) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone, weekday: "long", year: "numeric", month: "long", day: "numeric",
    }).format(new Date());
  } catch { return ""; }
};

const COUNTRY_MAP = {
  "Asia/Kolkata": "India",
  "America/New_York": "United States",
  "Europe/London": "United Kingdom",
  "Asia/Tokyo": "Japan",
  "Australia/Sydney": "Australia",
};

const FLAG_MAP = {
  "Asia/Kolkata": "🇮🇳",
  "America/New_York": "🇺🇸",
  "Europe/London": "🇬🇧",
  "Asia/Tokyo": "🇯🇵",
  "Australia/Sydney": "🇦🇺",
};

const TimeCard = memo(function TimeCard({ city, onRemove }) {
  const { isDark } = useTheme();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = city.timezone?.split("/") || [];
  const location = parts.slice(1).join("/").replace(/_/g, " ") || city.timezone;
  const country = COUNTRY_MAP[city.timezone] || parts[0];
  const flag = FLAG_MAP[city.timezone] || "🌐";
  const offsetLabel = `UTC${city.utc_offset || "+00:00"}`;

  return (
    <div
      className="animate-card-in rounded-2xl p-5 border transition-all duration-250 hover:-translate-y-1"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 4px 20px var(--card-glow)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flag}</span>
          <div>
            <h3 className="font-semibold text-base" style={{ color: "var(--text)" }}>{location}</h3>
            <span className="text-xs" style={{ color: "var(--text2)" }}>{country}</span>
          </div>
        </div>
        <button
          onClick={() => onRemove(city.timezone)}
          className="w-7 h-7 rounded-full border flex items-center justify-center text-base transition-all duration-200 hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer"
          style={{ borderColor: "var(--border)", color: "var(--text2)" }}
          title="Remove"
        >×</button>
      </div>

      <div className="mb-3">
        <span className="font-mono font-bold text-3xl tracking-tight block leading-none" style={{ color: "var(--accent)" }}>
          {formatTime(city.timezone)}
        </span>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-1">
        <span className="text-xs" style={{ color: "var(--text2)" }}>{formatDate(city.timezone)}</span>
        <span className="font-mono text-xs px-2 py-0.5 rounded-lg border"
          style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text2)" }}>
          {offsetLabel}
        </span>
      </div>
    </div>
  );
});

export default TimeCard;
