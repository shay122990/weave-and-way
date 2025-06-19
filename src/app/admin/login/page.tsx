"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("admin-token", data.token);
      router.push("/admin");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white text-black p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}
