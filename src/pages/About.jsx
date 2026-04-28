import { Link } from "react-router-dom";

const features = [
  { icon: "🕐", title: "Live Clocks", desc: "Every city card ticks every second showing accurate local time." },
  { icon: "🌍", title: "5 Countries", desc: "India, USA, UK, Japan and Australia — add or remove any card." },
  { icon: "🌗", title: "Dark / Light Mode", desc: "Toggle between dark and light theme using React Context API." },
  { icon: "🔎", title: "Filter", desc: "Filter displayed cities by name in real-time." },
  { icon: "⚠️", title: "Error Handling", desc: "Clear error messages if a city fails to load." },
  { icon: "📱", title: "Responsive", desc: "Works on mobile, tablet and desktop screens." },
];

const techStack = [
  { name: "React 19 + Vite", role: "Frontend" },
  { name: "React Router v6", role: "Routing" },
  { name: "Tailwind CSS v4", role: "Styling" },
  { name: "Axios", role: "API Calls" },
  { name: "Context API", role: "State Management" },
  { name: "WorldTimeAPI", role: "Time Data" },
];

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-16">
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>About This Project</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text2)" }}>
          A real-time world time zone dashboard built as a React capstone project.
          Track local times across 5 major countries simultaneously.
        </p>
      </div>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text2)" }}>Features</h2>
      <div className="grid gap-3 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
        {features.map(f => (
          <div key={f.title} className="rounded-2xl border p-4" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="text-xl mb-1">{f.icon}</div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text2)" }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text2)" }}>Tech Stack</h2>
      <div className="rounded-2xl border overflow-hidden mb-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        {techStack.map((t, i) => (
          <div key={t.name} className={`flex justify-between items-center px-5 py-3 text-sm ${i < techStack.length - 1 ? "border-b" : ""}`}
            style={{ borderColor: "var(--border)" }}>
            <span className="font-medium" style={{ color: "var(--text)" }}>{t.name}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: "var(--surface2)", color: "var(--text2)" }}>{t.role}</span>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--text2)" }}>API Used</h2>
      <div className="rounded-2xl border p-5 mb-8" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>WorldTimeAPI</p>
        <p className="text-xs font-mono mb-2" style={{ color: "var(--accent)" }}>https://worldtimeapi.org/api/timezone/&#123;timezone&#125;</p>
        <p className="text-xs" style={{ color: "var(--text2)" }}>
          Returns current datetime and UTC offset for any IANA timezone. Called via Axios with a 5-second timeout.
        </p>
      </div>

      <div className="text-center">
        <Link to="/" className="inline-block rounded-2xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--btn-bg)", color: "var(--btn-text)" }}>
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
