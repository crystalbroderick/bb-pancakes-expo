import { COLORS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
const ThemeToggler = () => {
  const { isLightTheme, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        { backgroundColor: isLightTheme ? theme.primary : COLORS.secondary },
      ]}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.icon,
          { color: isLightTheme ? theme.onPrimary : COLORS.onSecondary },
        ]}>
        {isLightTheme ? "☀︎" : "☾⋆"}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggler;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    fontSize: 15,
  },
});
