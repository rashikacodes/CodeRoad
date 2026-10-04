"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  goal: "placement" | "mastery";
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cr_user");
    const token = localStorage.getItem("cr_token");
    if (!stored || !token) {
      router.push("/login");
      return;
    }
    setTimeout(() => setUser(JSON.parse(stored)), 0);
  }, [router]);

  if (!user) return (
    <div style={{ minHeight: "100vh", background: "#0e0b1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#6a5888", fontSize: "14px" }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0e0b1a", display: "flex" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width: "200px", background: "#08060f", borderRight: "1px solid #1e1438", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "18px 16px", borderBottom: "1px solid #1e1438" }}>
          <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.4px" }}>
            <span style={{ color: "#c4b0f0" }}>Code</span>
            <span style={{ color: "#e8a020" }}>Road</span>
          </div>
        </div>

        <nav style={{ padding: "12px 0", flex: 1 }}>
          {[
            { label: "Dashboard", href: "/dashboard", active: true },
            { label: "Problems", href: "/problems", active: false },
            { label: "Progress", href: "/progress", active: false },
            { label: "Roadmap", href: "/roadmap", active: false },
            { label: "Contests", href: "/contests", active: false },
            { label: "Companies", href: "/companies", active: false },
            { label: "Interview", href: "/interview", active: false },
          ].map((item) => (
            <a key={item.href} href={item.href} style={{
              display: "block",
              padding: "8px 16px",
              margin: "1px 8px",
              borderRadius: "7px",
              fontSize: "13px",
              fontWeight: item.active ? 600 : 400,
              color: item.active ? "#c4b0f0" : "#6a5888",
              background: item.active ? "#1e1438" : "transparent",
              borderLeft: item.active ? "2px solid #7c5fe0" : "2px solid transparent",
              textDecoration: "none",
            }}>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ padding: "12px", borderTop: "1px solid #1e1438" }}>
          <div style={{ background: "#1a0e00", border: "1px solid #e8a020", borderRadius: "10px", padding: "12px" }}>
            <div style={{ fontSize: "10px", color: "#7a5010", fontWeight: 600, marginBottom: "4px" }}>DAILY CHALLENGE</div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffd060", marginBottom: "2px" }}>Climbing Stairs</div>
            <div style={{ fontSize: "10px", color: "#7a5010", marginBottom: "8px" }}>DP · Easy</div>
            <button style={{ width: "100%", background: "#e8a020", border: "none", borderRadius: "6px", padding: "6px", fontSize: "11px", fontWeight: 800, color: "#0e0b1a", cursor: "pointer" }}>
              Solve now →
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, padding: "24px", overflow: "auto" }}>

        {/* Greeting */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "22px", fontWeight: 800, color: "#e0daf0", letterSpacing: "-0.3px", marginBottom: "4px" }}>
            Good morning, {user.name.split(" ")[0]} 👋
          </div>
          <div style={{ fontSize: "13px", color: "#6a5888" }}>
            {user.goal === "placement" ? "Placement prep mode — companies are watching 👀" : "DSA mastery mode — build real understanding"}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "18px" }}>
          {[
            { label: "Streak", value: "🔥 0", bg: "#1a0e00", border: "#e8a020", color: "#ffd060" },
            { label: "Solved", value: "0", bg: "#0e0b1a", border: "#1e1438", color: "#c4b0f0" },
            { label: "Hints avg", value: "—", bg: "#0e0b1a", border: "#1e1438", color: "#c4b0f0" },
            { label: "Rank", value: "—", bg: "#0e0b1a", border: "#1e1438", color: "#c4b0f0" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: "10px", padding: "14px" }}>
              <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#6a5888", marginBottom: "6px", fontWeight: 600 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: stat.color, letterSpacing: "-0.5px" }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Hint chart + Topic mastery */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div style={{ background: "#0a0810", border: "1px solid #1e1438", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c4b0f0", marginBottom: "3px" }}>Hint dependency trend</div>
            <div style={{ fontSize: "11px", color: "#6a5888", marginBottom: "14px" }}>This goes down as you get more independent</div>
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #1e1438", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", color: "#3a2e58", textAlign: "center" }}>Solve problems to see your trend 📈</div>
            </div>
          </div>

          <div style={{ background: "#0a0810", border: "1px solid #1e1438", borderRadius: "12px", padding: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c4b0f0", marginBottom: "14px" }}>Topic mastery</div>
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #1e1438", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", color: "#3a2e58", textAlign: "center" }}>Start solving to track mastery 🧠</div>
            </div>
          </div>
        </div>

        {/* Ready to start */}
        <div style={{ background: "#0a0810", border: "1px solid #7c5fe0", borderLeft: "3px solid #7c5fe0", borderRadius: "12px", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#c4b0f0", marginBottom: "4px" }}>Ready to start? 🚀</div>
            <div style={{ fontSize: "12px", color: "#6a5888" }}>Pick your first problem and begin the journey</div>
          </div>
          <a href="/problems" style={{ background: "#7c5fe0", borderRadius: "8px", padding: "9px 18px", fontSize: "13px", fontWeight: 800, color: "#fff", textDecoration: "none", whiteSpace: "nowrap" }}>
            Browse problems →
          </a>
        </div>

        {/* Recent activity */}
        <div style={{ background: "#0a0810", border: "1px solid #1e1438", borderRadius: "12px", padding: "16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#c4b0f0", marginBottom: "14px" }}>Recent activity</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80px", border: "1px dashed #1e1438", borderRadius: "8px" }}>
            <div style={{ fontSize: "12px", color: "#6a5888", textAlign: "center" }}>No activity yet — solve your first problem to see it here</div>
          </div>
        </div>

      </div>
    </div>
  );
}