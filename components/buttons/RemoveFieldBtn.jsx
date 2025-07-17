import { useTheme } from "@/context/ThemeContext";
import { Text, TouchableOpacity } from "react-native";
export default function RemoveFieldBtn({
  labelPadding,
  removeFn,
  index,
  style = {},
  children,
}) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[{ alignSelf: "center" }, style]}
      onPress={() => removeFn(index)}>
      <Text
        style={{
          paddingTop: labelPadding && 25,
          color: theme.danger,
          fontWeight: "bold",
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
