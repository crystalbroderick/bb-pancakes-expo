import { FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Text } from "react-native";
const ThemedText = (props) => {
  const { theme } = useTheme();

  return (
    <Text {...props} style={[FONTS.body, props.style, { color: theme.text }]}>
      {props.children}
    </Text>
  );
};

export default ThemedText;
