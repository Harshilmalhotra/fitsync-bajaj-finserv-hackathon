import React from "react";
import { useNavigate } from "react-router-dom";

const FitnessLanding = () => {
  const colors = {
    primary: "#0F172A",      // Deep Dark Background (Sidebar, Navbar)
    secondary: "#1E293B",    // Card & Section Background
    accent: "#3B82F6",       // Primary Accent (Buttons, Highlights, Charts)
    accentSecondary: "#8B5CF6", // Secondary Accent (Interactive Elements)
    textPrimary: "#E2E8F0",  // Light Text for Readability
    textSecondary: "#94A3B8", // Muted Text (Less Important Info)
    border: "#334155",       // Border Color for Separation
  };

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      color: colors.textPrimary
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "black"
      }}>
        <img
          src="/api/placeholder/1920/1080"
          alt="Fitness background"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, black, transparent, black)",
          opacity: 0.7
        }}></div>
      </div>

      <header style={{
        position: "relative",
        zIndex: 10,
        padding: "1.5rem"
      }}>
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1280px",
          margin: "0 auto"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              FitnessPro
            </h1>
          </div>

          <div style={{ flex: "1" }}></div>

          <div>
            <button
              onClick={handleSignup}
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                color: "white",
                padding: "0.5rem 1.25rem",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                cursor: "pointer"
              }}
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main style={{
        position: "relative",
        zIndex: 10,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem"
      }}>
        <div style={{
          maxWidth: "72rem",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          <h2 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "1.5rem"
          }}>
            Transform Your <span style={{
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Fitness Journey</span>
          </h2>
          <p style={{
            fontSize: "1.25rem",
            color: "#d1d5db",
            maxWidth: "48rem",
            margin: "0 auto"
          }}>
            Track workouts, set goals, and connect with fitness enthusiasts.
            Your personalized path to a healthier lifestyle starts here.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSignup}
          style={{
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            padding: "1rem 2rem",
            borderRadius: "0.75rem",
            fontWeight: "bold",
            fontSize: "1.125rem",
            color: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            marginBottom: "3rem"
          }}
        >
          GET STARTED NOW →
        </button>
      </main>

      {/* Features section */}
      <div id="features" style={{
        position: "relative",
        zIndex: 10,
        padding: "3rem 1rem",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)"
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <h3 style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            Powerful <span style={{
              background: "linear-gradient(to right, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Features</span>
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem"
          }}>
            {/* Feature 1 */}
            <div style={{
              background: "linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5))",
              padding: "1.5rem",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 85, 99, 0.5)"
            }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", color: "white", marginBottom: "0.5rem" }}>Progress Tracking</h4>
              <p style={{ color: "#d1d5db" }}>Monitor your fitness journey with detailed analytics and visualizations.</p>
            </div>

            {/* Feature 2 */}
            <div style={{
              background: "linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5))",
              padding: "1.5rem",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 85, 99, 0.5)"
            }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", color: "white", marginBottom: "0.5rem" }}>Workout Plans</h4>
              <p style={{ color: "#d1d5db" }}>Access personalized workout routines tailored to your fitness goals.</p>
            </div>

            {/* Feature 3 */}
            <div style={{
              background: "linear-gradient(to bottom right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5))",
              padding: "1.5rem",
              borderRadius: "1rem",
              border: "1px solid rgba(75, 85, 99, 0.5)"
            }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "9999px",
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem"
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "1.5rem", width: "1.5rem", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 style={{ fontSize: "1.25rem", fontWeight: "600", color: "white", marginBottom: "0.5rem" }}>Community</h4>
              <p style={{ color: "#d1d5db" }}>Connect with like-minded fitness enthusiasts and share your achievements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        position: "relative",
        zIndex: 10,
        padding: "1.5rem",
        backgroundColor: "rgba(0, 0, 0, 0.7)"
      }}>
        <div style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1rem",
          textAlign: "center",
          color: "#9ca3af",
          fontSize: "0.875rem"
        }}>
          <p>&copy; 2025 FitnessPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FitnessLanding;