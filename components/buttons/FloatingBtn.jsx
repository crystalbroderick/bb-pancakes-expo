import { COLORS, spacingX } from "@/constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function FloatingBtn({ style = {}, onPress }) {
  const mergedStyle = { ...styles.fab, ...style };

  return (
    <Pressable
      style={[mergedStyle]}
      onPress={onPress}
      styles={{ border: "#0000" }}>
      <AntDesign name="plus" size={24} color={COLORS.accent_blue} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: COLORS.yellow,
    position: "absolute",
    bottom: 150,
    right: spacingX._20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
