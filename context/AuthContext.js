import { supabase } from "@/utils/supabase.js";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // clean up to avoid memory leaks
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signout = async () => {
    setLoading(true);
    console.log("signing out...")
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error signing out", error.message);
    } else {
      setSession(null);
      setUser(null);
    }
    setLoading(false);
  };

  const contextData = { session, signout };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading..</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };

