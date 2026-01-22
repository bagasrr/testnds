import React, { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setServerResponse(null); // Reset response sebelumnya

    const endpoint = isLogin ? "/login" : "/register";
    const host = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${host}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setServerResponse(data.message);
        if (endpoint === "/register") {
          setTimeout(() => {
            toggleMode();
          }, 2000);
        }
      } else {
        setError(data.message || "Terjadi kesalahan pada server.");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
    setError("");
    setServerResponse(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 font-sans text-slate-800">
      {/* --- Main Card --- */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{isLogin ? "Welcome back" : "Create account"}</h1>
          <p className="mt-2 text-sm text-slate-500">{isLogin ? "Enter your credentials to access your account" : "Sign up to get started with our platform"}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 placeholder-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message (kecil di atas tombol) */}
          {error && <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-md border border-red-100">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-black text-white font-semibold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Register/Login */}
        <div className="mt-8 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleMode} className="font-semibold text-slate-900 hover:underline focus:outline-none">
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>

      {serverResponse && (
        <div className="mt-6 w-full max-w-md animate-fade-in-up">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              {/* Icon Check Checklist */}
              <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-emerald-800">{isLogin ? "Login Successful!" : "Registration Successful!"}</h3>
                <div className="mt-2 text-xs font-mono text-emerald-700 bg-emerald-100/50 p-2 rounded border border-emerald-100 overflow-x-auto">
                  {/* Menampilkan raw JSON response */}
                  <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
                </div>
              </div>

              {/* Tombol Close kecil */}
              <button onClick={() => setServerResponse(null)} className="text-emerald-400 hover:text-emerald-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
