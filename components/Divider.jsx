import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";
const HorizontalDividerWithLabel = ({
  containerStyles = {},
  accent = "gray",
  textColor = "",
  labelStyles,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, containerStyles]}>
      <View style={[styles.divider, { borderBottomColor: accent }]} />
      <Text
        style={[
          styles.label,
          labelStyles,
          { color: textColor ? textColor : theme.text },
        ]}>
        {children}
      </Text>

      <View style={[styles.divider, { borderBottomColor: accent }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    height: 1,
  },
  label: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default HorizontalDividerWithLabel;
