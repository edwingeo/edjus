 "use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function validate() {
        if (!email) return "Email is required";
        // simple email check
        if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("https://edjus-backend-1.onrender.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                // On success redirect (adjust path as needed)
                router.push("/");
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data?.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: 360,
                    padding: 24,
                    border: "1px solid #e6e6e6",
                    borderRadius: 8,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                    background: "#fff",
                }}
                aria-labelledby="login-heading"
            >
                <h1 id="login-heading" style={{ margin: "0 0 12px 0", fontSize: 20 }}>
                    Sign in
                </h1>

                {error && (
                    <div style={{ marginBottom: 12, color: "#b00020" }} role="alert">
                        {error}
                    </div>
                )}

                <label style={{ display: "block", marginBottom: 8 }}>
                    <span style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Email</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
                        placeholder="you@example.com"
                        aria-label="Email"
                    />
                </label>

                <label style={{ display: "block", marginBottom: 8 }}>
                    <span style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" }}
                        placeholder="••••••••"
                        aria-label="Password"
                    />
                </label>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 0 18px 0" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            aria-label="Remember me"
                        />
                        <span style={{ fontSize: 13 }}>Remember me</span>
                    </label>

                    <a href="/forgot-password" style={{ fontSize: 13, color: "#0066cc" }}>
                        Forgot?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 6,
                        border: "none",
                        background: "#2563eb",
                        color: "white",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>

                <p style={{ marginTop: 14, fontSize: 13, textAlign: "center" }}>
                    Don't have an account?{" "}
                    <a href="/signup" style={{ color: "#2563eb" }}>
                        Sign up
                    </a>
                </p>
            </form>
        </main>
    );
}