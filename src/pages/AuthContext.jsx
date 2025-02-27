import { createContext, useContext, useState } from "react";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user) {
        // Fetch additional user data from registered_trackies
        const { data, error } = await supabase
          .from("registered_trackies")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (!error) {
          setUserData(data);
        }
      }

      setLoading(false);
    };

    // Listen to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);

      if (session?.user) {
        const { data, error } = await supabase
          .from("registered_trackies")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

        if (!error) {
          setUserData(data);
        }
      }
    });

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth
export const useAuth = () => useContext(AuthContext);
