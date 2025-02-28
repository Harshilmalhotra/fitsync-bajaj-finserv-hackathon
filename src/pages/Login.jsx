import React, { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const colors = {
    primary: "#0F172A",      // Deep Dark Background (Sidebar, Navbar)
    secondary: "#1E293B",    // Card & Section Background
    accent: "#3B82F6",       // Primary Accent (Buttons, Highlights, Charts)
    accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
    textPrimary: "#E2E8F0",  // Light Text for Readability
    textSecondary: "#94A3B8", // Muted Text (Less Important Info)
    border: "#334155",       // Border Color for Separation
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Supabase sign-in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Navigate to dashboard on successful login
        navigate("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-sm" 
           style={{ backgroundColor: `${colors.secondary}95`, borderColor: colors.border, borderWidth: "1px" }}>
        
        {/* Gradient background overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 via-purple-500 to-blue-800"></div>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500 blur-3xl opacity-20 -mr-32 -mt-32 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-20 -ml-32 -mb-32 animate-pulse delay-700"></div>
        </div>

        {/* Welcome Back Header */}
        <div className="flex flex-col items-center mb-10 relative">
          <div className="w-full text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Welcome Back</h1>
            <p className="mt-2 text-gray-400">Sign in to your account</p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 right-0 w-4 h-4 rounded-full bg-blue-500 opacity-75 animate-float"></div>
          <div className="absolute -top-2 left-12 w-3 h-3 rounded-full bg-purple-500 opacity-75 animate-float-delayed"></div>
          <div className="absolute top-6 right-12 w-2 h-2 rounded-full bg-indigo-400 opacity-75 animate-float-slow"></div>
        </div>

        {/* Removed this heading as it's now part of the welcome section */}
        
        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded mb-4 border border-red-800">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ 
                backgroundColor: `${colors.primary}90`, 
                color: colors.textPrimary,
                borderColor: colors.border,
                borderWidth: "1px",
                focusRing: colors.accent
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="block font-medium" style={{ color: colors.textPrimary }}>
                Password
              </label>
              <a href="/forgot-password" className="text-sm hover:underline" style={{ color: colors.accent }}>
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ 
                backgroundColor: `${colors.primary}90`, 
                color: colors.textPrimary,
                borderColor: colors.border,
                borderWidth: "1px"
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center font-medium text-lg relative overflow-hidden group"
            style={{ 
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary}, ${colors.accent})`,
              backgroundSize: "200% 100%",
              color: colors.textPrimary,
            }}
            disabled={isLoading}
          >
            <span className="absolute w-full h-full top-0 left-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Sign In"}
            <style jsx>{`
              button {
                animation: gradientMove 3s ease infinite;
              }
              @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
            `}</style>
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p style={{ color: colors.textSecondary }}>
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="font-medium hover:underline transition-colors duration-300"
              style={{ color: colors.accentSecondary }}
            >
              Create account
            </a>
          </p>
        </div>
        
        {/* Glass effect cards in corners for visual interest */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-md rotate-12 border border-white/10"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-500/10 backdrop-blur-md -rotate-12 border border-white/10"></div>
        
        {/* Animated floating shapes */}
        <div className="absolute bottom-12 right-8 w-2 h-8 rounded-full bg-blue-400/30 animate-float"></div>
        <div className="absolute top-12 left-8 w-4 h-4 rounded-full bg-purple-400/30 animate-float-delayed"></div>
        <div className="absolute top-24 right-24 w-3 h-3 rounded bg-indigo-400/30 animate-float-slow"></div>
      </div>
    </div>
  );
};

export default Login;