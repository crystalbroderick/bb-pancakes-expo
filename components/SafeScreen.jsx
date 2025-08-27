import { spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native-web";
const SafeScreen = ({ paddingHorizontal = false, style, bg, children }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: bg ? bg : theme.background,
          paddingHorizontal: paddingHorizontal ? spacingX._20 : 0,
          paddingVertical: spacingY._20,
        },
        style,
      ]}>
      <StatusBar barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;
