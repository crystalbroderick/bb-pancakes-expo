import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Btn = ({ title, onPress, style, textStyle, disabled, ...rest }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: COLORS.yellow },
        styles.button,
        disabled && styles.buttonDisabled,
        ,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      <Text style={[{ color: COLORS.black }, FONTS.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.lg,
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: COLORS.onPrimary,
  },
});
