import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navLink = (to, label) => {
    const active = location.pathname === to;
    return (
      <Link to={to}
        className={`text-sm px-3 py-1.5 rounded-full border transition-all duration-200 ${
          active
            ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--surface2)]"
            : "border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        }`}
        style={{ borderColor: active ? "var(--accent)" : "var(--border)" }}
      >{label}</Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b backdrop-blur-sm"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl">🌐</span>
          <span className="font-mono font-bold text-lg tracking-tight" style={{ color: "var(--accent)" }}>WorldTime</span>
          <span className="text-xs hidden sm:inline" style={{ color: "var(--text2)" }}>Dashboard</span>
        </Link>
        <div className="flex gap-2">
          {navLink("/", "Dashboard")}
          {navLink("/about", "About")}
        </div>
      </div>
      <button onClick={toggleTheme}
        className="text-sm px-3 py-1.5 rounded-full border transition-all duration-200 hover:border-[var(--accent)] cursor-pointer"
        style={{ background: "var(--surface2)", borderColor: "var(--border)", color: "var(--text)" }}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
