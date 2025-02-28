import React, { useState } from "react";
import { supabase } from "./supabase"; // Import your Supabase client
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Universal color scheme
  const colors = {
    primary: "#0F172A",      // Deep Dark Background (Sidebar, Navbar)
    secondary: "#1E293B",    // Card & Section Background
    accent: "#3B82F6",       // Primary Accent (Buttons, Highlights, Charts)
    accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
    textPrimary: "#E2E8F0",  // Light Text for Readability
    textSecondary: "#94A3B8", // Muted Text (Less Important Info)
    border: "#334155",       // Border Color for Separation
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      const user = signUpData?.user;
      if (!user) {
        setError("User signup failed. Please try again.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("registered_trackies")
        .insert({
          user_id: user.id,
          name: name,
          password: password,
          email: email,
          height: parseInt(height),
          gender: gender,
        });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup failed:", err);
      setError("An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-sm" 
           style={{ backgroundColor: `${colors.secondary}95`, borderColor: colors.border, borderWidth: "1px" }}>
        
        {/* Gradient background overlay */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600 via-purple-500 to-blue-800"></div>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-500 blur-3xl opacity-20 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl opacity-20 -ml-32 -mb-32"></div>
        </div>
        
        {/* Register Header */}
        <div className="flex flex-col items-center mb-6 relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Create Account</h1>
          <p className="mt-2" style={{ color: colors.textSecondary }}>Join our fitness community</p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded mb-4 border border-red-800">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-900/30 text-green-300 p-3 rounded mb-4 border border-green-800">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
              style={{ 
                backgroundColor: `${colors.primary}90`, 
                color: colors.textPrimary,
                borderColor: colors.border,
                borderWidth: "1px"
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
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
                borderWidth: "1px"
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
                Password
              </label>
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
            
            <div>
              <label htmlFor="confirmPassword" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: `${colors.primary}90`, 
                  color: colors.textPrimary,
                  borderColor: colors.border,
                  borderWidth: "1px"
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: `${colors.primary}90`, 
                  color: colors.textPrimary,
                  borderColor: colors.border,
                  borderWidth: "1px"
                }}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label htmlFor="gender" className="block font-medium mb-2" style={{ color: colors.textPrimary }}>
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ 
                  backgroundColor: `${colors.primary}90`, 
                  color: colors.textPrimary,
                  borderColor: colors.border,
                  borderWidth: "1px"
                }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center font-medium text-lg relative overflow-hidden group mt-6"
            style={{ 
              background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary}, ${colors.accent})`,
              backgroundSize: "200% 100%",
              color: colors.textPrimary
            }}
            disabled={loading}
          >
            <span className="absolute w-full h-full top-0 left-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p style={{ color: colors.textSecondary }}>
            Already have an account?{" "}
            <a 
              href="/login" 
              className="font-medium hover:underline transition-colors duration-300"
              style={{ color: colors.accentSecondary }}
            >
              Sign In
            </a>
          </p>
        </div>
        
        {/* Glass effect cards in corners for visual interest */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-md rotate-12 border border-white/10"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-500/10 backdrop-blur-md -rotate-12 border border-white/10"></div>
      </div>
    </div>
  );
};

export default Register;