import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
const BackBtn = ({ style, iconSize = 30 }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[styles.button, style]}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
      <Ionicons
        name="chevron-back"
        size={iconSize}
        color={COLORS.white}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
});
