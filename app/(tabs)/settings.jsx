import Btn from "@/components/Btn";
import SafeScreen from "@/components/SafeScreen";
import ThemeSwitch from "@/components/ThemeSwitch";
import ThemedText from "@/components/ThemedText";
import { FONTS, SPACING } from "@/constants/theme";
import { COLORS } from "@/constants/theme.js";
import { useAuth } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
const SettingsScreen = () => {
  const { theme, isLoading } = useContext(ThemeContext);
  const { session, signout } = useAuth();
  return (
    !isLoading && (
      <SafeScreen>
        <View
          style={[
            styles.container,
            { backgroundColor: theme.backgroundColor },
          ]}>
          <ThemedText style={[styles.heading, styles.headingText, FONTS.h2]}>
            Hi, {session?.user?.email}
          </ThemedText>
          <View style={styles.contentContainer}>
            <ThemeSwitch theme={theme} />
          </View>
          <Btn title="Sign out" style="width: '50%'" onPress={signout}></Btn>
        </View>
      </SafeScreen>
    )
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
    paddingBottom: SPACING.s,
  },
  headingText: {
    borderBottomWidth: 5,
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
  },
  contentContainer: {
    paddingVertical: SPACING.m,
    paddingHorizontal: SPACING.m,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SPACING.s,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
