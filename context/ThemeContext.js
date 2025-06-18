import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { themes } from "../constants/theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme?.mode === "light" ? themes.dark : themes.light;
    saveThemePreference(newTheme);
    setTheme(newTheme);
  };

  const saveThemePreference = async (value) => {
    try {
      await AsyncStorage.setItem("themePreference", JSON.stringify(value));
    } catch (e) {
      console.error("Error saving theme:", e);
    }
  };

  useEffect(() => {
    const getTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem("themePreference");
        setTheme(saved ? JSON.parse(saved) : themes.light);
      } catch (e) {
        console.error("Error loading theme:", e);
        setTheme(themes.light);
      } finally {
        setIsLoading(false);
      }
    };
    getTheme();
  }, []);

  if (isLoading || !theme) return null;

  const isLightTheme = theme.mode === "light";
  const isDark = theme.mode === "dark";
console.log("ThemeProvider initialized with theme:", theme.mode);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLightTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) console.warn("useTheme called outside of ThemeProvider");
  return ctx;
};
