import { useTheme } from "@/context/ThemeContext";
import { View , Text} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  console.log("this screen is safe!!")
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: theme.background,
      }}>
      {children}
    </View>
  );
};

export default SafeScreen;
