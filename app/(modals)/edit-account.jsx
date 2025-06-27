import { spacingY } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import ModalWrapper from "../../components/ModalWrapper";
export default function EditAccountScreen() {
  const { session, signout } = useAuth();
  const { toggleTheme, isLightTheme, theme } = useTheme();
  const router = useRouter();

  return (
    <ModalWrapper bg={theme.background}>
      <Header title="Update Account"></Header>

      <View style={styles.container}>
        <Text>grdfg</Text>
      </View>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
  },
});
