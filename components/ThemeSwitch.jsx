import ThemedText from "@/components/ThemedText.js";
import { COLORS, FONTS, SPACING } from "@/constants/theme.js";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Switch, View } from "react-native";

const ThemeSwitch = () => {
  const { theme, toggleTheme, isLightTheme } = useTheme();
  return (
    <View style={styles.row}>
      <ThemedText style={[FONTS.body, { color: theme.textColor }]}>
        Dark Mode
      </ThemedText>
      <Switch
        trackColor={{
          false: COLORS.gray,
          true: COLORS.secondary,
        }}
        thumbColor={isLightTheme ? COLORS.primary : COLORS.secondary} // Adjust colors based on theme
        onValueChange={toggleTheme} // Toggle theme based on switch state
        value={!isLightTheme} // Invert the value because Switch is "on" when the value is false (dark theme)
      />
    </View>
  );
};

export default ThemeSwitch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  heading: {
    borderBottomWidth: 1,
    marginBottom: SPACING.m,
  },
  headingText: {
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SPACING.s,
  },
});
