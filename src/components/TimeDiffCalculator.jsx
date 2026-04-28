import { useState, useEffect } from "react";

const getOffsetMinutes = (utc_offset) => {
  if (!utc_offset) return 0;
  const sign = utc_offset[0] === "-" ? -1 : 1;
  const [h, m] = utc_offset.slice(1).split(":").map(Number);
  return sign * (h * 60 + (m || 0));
};

export default function TimeDiffCalculator({ cities }) {
  const [cityA, setCityA] = useState("");
  const [cityB, setCityB] = useState("");
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    if (cities.length >= 2) { setCityA(cities[0].timezone); setCityB(cities[1].timezone); }
  }, []);

  useEffect(() => {
    if (!cityA || !cityB) { setDiff(null); return; }
    const a = cities.find(c => c.timezone === cityA);
    const b = cities.find(c => c.timezone === cityB);
    if (!a || !b) { setDiff(null); return; }
    const diffMin = getOffsetMinutes(b.utc_offset) - getOffsetMinutes(a.utc_offset);
    const abs = Math.abs(diffMin);
    setDiff({ h: Math.floor(abs / 60), m: abs % 60, sign: diffMin >= 0 ? "ahead" : "behind", cityA, cityB });
  }, [cityA, cityB, cities]);

  const fmt = (tz) => tz?.split("/").slice(1).join("/").replace(/_/g, " ") || tz;
  if (cities.length < 2) return null;

  const selectStyle = {
    background: "var(--surface2)", borderColor: "var(--border)",
    color: "var(--text)", minWidth: "180px",
  };

  return (
    <div className="rounded-2xl border p-6 max-w-xl mx-auto" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <h3 className="font-semibold text-base mb-4" style={{ color: "var(--text)" }}>⏱ Time Difference Calculator</h3>
      <div className="flex items-center gap-3 flex-wrap justify-center mb-4">
        <select value={cityA} onChange={e => setCityA(e.target.value)}
          className="rounded-xl border px-3 py-2 text-sm outline-none cursor-pointer" style={selectStyle}>
          <option value="">Select city A</option>
          {cities.map(c => <option key={c.timezone} value={c.timezone}>{fmt(c.timezone)}</option>)}
        </select>
        <span className="text-sm font-semibold" style={{ color: "var(--text2)" }}>vs</span>
        <select value={cityB} onChange={e => setCityB(e.target.value)}
          className="rounded-xl border px-3 py-2 text-sm outline-none cursor-pointer" style={selectStyle}>
          <option value="">Select city B</option>
          {cities.map(c => <option key={c.timezone} value={c.timezone}>{fmt(c.timezone)}</option>)}
        </select>
      </div>

      {diff && cityA !== cityB && (
        <div className="rounded-xl p-4 text-sm leading-relaxed text-center" style={{ background: "var(--surface2)", color: "var(--text2)" }}>
          <span className="font-bold" style={{ color: "var(--text)" }}>{fmt(diff.cityB)}</span>{" is "}
          <span className="font-mono font-bold text-base" style={{ color: "var(--accent)" }}>
            {diff.h > 0 ? `${diff.h}h ` : ""}{diff.m > 0 ? `${diff.m}m` : diff.h === 0 ? "0m" : ""}
          </span>{" "}
          <span className="font-bold" style={{ color: diff.sign === "ahead" ? "var(--success)" : "var(--error)" }}>
            {diff.sign}
          </span>{" "}
          <span className="font-bold" style={{ color: "var(--text)" }}>{fmt(diff.cityA)}</span>
        </div>
      )}
      {diff && cityA === cityB && (
        <div className="rounded-xl p-4 text-sm text-center" style={{ background: "var(--surface2)", color: "var(--text2)" }}>
          Same timezone — no difference!
        </div>
      )}
    </div>
  );
}
