import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
const BackBtn = ({ style, iconSize = 20, isDirty }) => {
  const router = useRouter();
  console.log("dirty bcak button?", isDirty); // this always returns false, even if form says true

  const onBackPress = () => {
    if (isDirty) {
      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure you want to leave and lose them?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => onBackPress()}
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
    width: 35,
    height: 35,
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
  },
});
