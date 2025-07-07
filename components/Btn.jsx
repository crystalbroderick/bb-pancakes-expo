import { COLORS, FONTS, SPACING } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
const Btn = ({ title, onPress, style, textStyle, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
        ,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...rest}>
      <Text style={[{ color: COLORS.onPrimary }, FONTS.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.lg,
    alignItems: "center",
  },
  buttonEnabled: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // gray or faded look
  },
  buttonText: {
    color: COLORS.onPrimary,
  },
});
