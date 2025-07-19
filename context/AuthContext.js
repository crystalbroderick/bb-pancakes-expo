import * as userService from "@/services/userService";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    let lastFetchedId = null;

    const initUser = async (session) => {
      const userId = session?.user?.id;
      if (!userId || userId === lastFetchedId) return;

      console.log("Fetching profile for:", userId);
      lastFetchedId = userId;

      try {
        const profile = await userService.getUserProfile(session.user);
        setSession(session);
        setUser(profile);
        console.log("user including profile:", profile);
      } catch (err) {
        console.error("Error loading user profile:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const handleSession = (session) => {
      if (session) {
        setLoading(true); // ✅ Always set loading before fetching
        initUser(session);
      } else {
        lastFetchedId = null;
        setUser(null);
        setSession(null);
        setLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSession(session);
      }
    );

    supabase.auth.getSession().then(({ data }) => {
      handleSession(data.session);
    });

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
      setLoading(false);
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
    if (error) {
      Alert.alert("Signout Error", error.message);
    } else {
      queryClient.invalidateQueries(["recipes", user.id]); // or ['recipes', userId] if using user-specific keys

      setSession(null);
      setUser(null);

      router.replace("/(auth)/welcome");
    }
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
