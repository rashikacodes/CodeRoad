"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
  // 1. ADD YOUR STATE HERE
  const [name, setName] = useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [goal, setGoal]=useState<"placement"|"mastery">("placement");
  const [loading,setLoading]=useState(false);
const [error,setError]=useState("");

  // ... rest of state

  // 2. WRITE handleSubmit HERE
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name ,email, password ,goal  }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      localStorage.setItem("cr_token", data.token);
      localStorage.setItem("cr_user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch {
      setError("Cannot reach server. Is backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0e0b1a", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", maxWidth: "400px" }}>
        
       <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "#1e1438",
              border: "1px solid #7c5fe0",
              margin: "0 auto 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}
          >
            🛣️
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 800,
              letterSpacing: "-0.4px",
              marginBottom: "6px",
            }}
          >
            <span style={{ color: "#c4b0f0" }}>Code</span>
            <span style={{ color: "#e8a020" }}>Road</span>
          </div>
          <div style={{ fontSize: "14px", color: "#3a2e58" }}>
           Free forever. No credit card.
          </div>
        </div>

        <div style={{ background: "#0a0810", border: "1px solid #1e1438", borderRadius: "16px", padding: "28px" }}>
          <form onSubmit={handleSubmit}>
            
            {/* 4. NAME INPUT */}
            <div style={{ marginBottom: "16px" }}>
  <label
    style={{
      display: "block",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "#3a2e58",
      fontWeight: 600,
      marginBottom: "6px",
    }}
  >
    Name
  </label>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    placeholder="Rashika Shah"
    style={{
      width: "100%",
      background: "#0e0b1a",
      border: "1px solid #2e2248",
      borderRadius: "9px",
      padding: "10px 14px",
      fontSize: "14px",
      color: "#e0daf0",
      outline: "none",
      transition: "border-color 0.15s",
    }}
    onFocus={(e) => (e.target.style.borderColor = "#7c5fe0")}
    onBlur={(e) => (e.target.style.borderColor = "#2e2248")}
  />
</div>

           <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#3a2e58",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{
                  width: "100%",
                  background: "#0e0b1a",
                  border: "1px solid #2e2248",
                  borderRadius: "9px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#e0daf0",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#7c5fe0")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#2e2248")
                }
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#3a2e58",
                    fontWeight: 600,
                  }}
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••"
                style={{
                  width: "100%",
                  background: "#0e0b1a",
                  border: "1px solid #2e2248",
                  borderRadius: "9px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "#e0daf0",
                  outline: "none",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "#7c5fe0")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "#2e2248")
                }
              />
            </div>

            {/* 7. GOAL SELECTOR — two cards, clicking sets goal state */}
           {/* 7. GOAL SELECTOR */}
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
  <div
    onClick={() => setGoal("placement")}
    style={{
      border: goal === "placement" ? "2px solid #7c5fe0" : "1px solid #2e2248",
      borderRadius: "10px",
      padding: "12px",
      background: goal === "placement" ? "#1e1438" : "#0e0b1a",
      cursor: "pointer",
      transition: "all 0.15s",
    }}
  >
    <div style={{ fontSize: "18px", marginBottom: "4px" }}>🎯</div>
    <div style={{ fontSize: "12px", fontWeight: 700, color: goal === "placement" ? "#c4b0f0" : "#3a2e58" }}>Placement prep</div>
    <div style={{ fontSize: "10px", color: "#2e2248", marginTop: "2px" }}>Company-wise focus</div>
  </div>

  <div
    onClick={() => setGoal("mastery")}
    style={{
      border: goal === "mastery" ? "2px solid #7c5fe0" : "1px solid #2e2248",
      borderRadius: "10px",
      padding: "12px",
      background: goal === "mastery" ? "#1e1438" : "#0e0b1a",
      cursor: "pointer",
      transition: "all 0.15s",
    }}
  >
    <div style={{ fontSize: "18px", marginBottom: "4px" }}>🧠</div>
    <div style={{ fontSize: "12px", fontWeight: 700, color: goal === "mastery" ? "#c4b0f0" : "#3a2e58" }}>DSA mastery</div>
    <div style={{ fontSize: "10px", color: "#2e2248", marginTop: "2px" }}>Topic by topic</div>
  </div>
</div>

           {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "#1a0818",
                  border: "1px solid #e060a0",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "12px",
                  color: "#e060a0",
                  marginBottom: "16px",
                }}
              >
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: loading ? "#3a2e58" : "#7c5fe0",
                color: "#fff",
                fontWeight: 800,
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.15s",
                marginBottom: "16px",
              }}
            >
             {loading ? "Creating account..." : "Create account 🚀"}
            </motion.button>

          </form>

          {/* 10. LINK TO LOGIN */}
          <div style={{ textAlign: "center", fontSize: "13px", color: "#3a2e58" }}>
            Already have one?{" "}
            <Link href="/login" style={{ color: "#7c5fe0", fontWeight: 700, textDecoration: "none" }}>
              Log in
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}