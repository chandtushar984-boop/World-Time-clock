import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function AppInner() {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "dark" : ""}`}
      style={{ background: "var(--bg)", color: "var(--text)", transition: "background 0.25s, color 0.25s" }}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="border-t py-4 flex justify-center gap-2 text-xs"
        style={{ borderColor: "var(--border)", color: "var(--text2)" }}>
        <span>Powered by <a href="https://worldtimeapi.org" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>WorldTimeAPI</a></span>
        <span>· WorldTime Dashboard</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}
