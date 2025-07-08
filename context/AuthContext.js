import * as userService from "@/services/userService";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const initUser = async () => {
      setLoading(true);
      try {
        const { data: sessionData, error } = await supabase.auth.getSession();
        const session = sessionData?.session;

        if (!session?.user) {
          setUser(null);
          setSession(null);
          return;
        }

        const profile = await userService.getUserProfile(session.user);

        setSession(session);
        setUser(profile); // merged meta_data and profile
      } catch (err) {
        console.error("Error loading user profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          initUser(); // Re-fetch profile
        } else {
          setUser(null);
          setSession(null);
        }
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const updateProfile = async (updates) => {
    console.log("updating profile");
    try {
      setLoading(true);
      await userService.updateUserProfile({ id: user.id, ...updates });
      setUser((prev) => ({ ...prev, ...updates }));
      return { success: true };
    } catch (error) {
      Alert.alert("Profile Update Error", error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert("Signout Error", error.message);
    setSession(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        updateUser,
        loading,
        message,
        signout,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
