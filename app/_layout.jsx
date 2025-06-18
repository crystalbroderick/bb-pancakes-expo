
import { ThemeProvider } from "@/context/ThemeContext";
import { CherryCreamSoda_400Regular } from "@expo-google-fonts/cherry-cream-soda";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Molle_400Regular_Italic } from "@expo-google-fonts/molle";
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "../context/AuthContext";
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: Inter_400Regular,
    Inter_bold: Inter_700Bold,
    Molle: Molle_400Regular_Italic,
    Mont: Montserrat_400Regular,
    Mont_semi: Montserrat_600SemiBold,
    Mont_bold: Montserrat_700Bold,
    Cherry: CherryCreamSoda_400Regular,
  });
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
         <Slot></Slot></AuthProvider>
    </ThemeProvider>
  );
}
