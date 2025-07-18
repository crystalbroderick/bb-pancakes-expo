import { spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native-web";
const SafeScreen = ({ paddingHorizontal = false, style, bg, children }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          flex: 1,
          backgroundColor: bg ? bg : theme.background,
          paddingHorizontal: paddingHorizontal ? spacingX._20 : 0,
          paddingVertical: insets.bottom + spacingY._20,
        },
        style,
      ]}>
      <StatusBar barStyle="dark-content" />
      {children}
    </View>
  );
};

export default SafeScreen;
