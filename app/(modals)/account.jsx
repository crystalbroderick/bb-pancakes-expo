import Btn from "@/components/Btn";
import ThemedText from "@/components/ThemedText";
import { COLORS, FONTS, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import SafeScreen from "../../components/SafeScreen";
export default function AccountScreen() {
  const { toggleTheme, isLightTheme, theme } = useTheme();
  const router = useRouter();
  const { user, signout } = useAuth();

  const showSignoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to sign out?", [
      {
        text: "cancel",
        onPress: console.log("cancel logout"),
        style: "cancel",
      },
      { text: "Sign out", onPress: signout, style: "destructive" },
    ]);
  };
  return (
    <SafeScreen paddingHorizontal>
      <Header title="Account"></Header>

      <View style={styles.container}>
        {/* Profile Section */}
        <ThemedText style={FONTS.h2}>Profile</ThemedText>
        <View style={[styles.profileCard, { backgroundColor: theme.input_bg }]}>
          <Avatar style={styles.avatar} uri={user?.avatar_url} />
          <View style={styles.userInfo}>
            <ThemedText style={styles.name}>
              {user?.display_name || "User"}
            </ThemedText>
            <ThemedText style={styles.email}>
              {user?.email || "user@email.com"}
            </ThemedText>
          </View>
          <TouchableOpacity>
            <MaterialIcons
              name="edit"
              size={18}
              color="#666"
              onPress={() => router.navigate("/edit-account")}
            />
          </TouchableOpacity>
        </View>
        {/*Settings Section */}
        <ThemedText style={FONTS.h3}>Settings</ThemedText>
        <View style={[styles.optionList, { backgroundColor: theme.input_bg }]}>
          <TouchableOpacity style={[styles.settingRow]} onPress={toggleTheme}>
            <MaterialIcons
              name="contrast"
              size={20}
              color={COLORS.secondary}
              style={styles.icon}
            />
            <ThemedText style={styles.optionText}>
              Switch to {isLightTheme ? "Dark" : "Light"} Mode
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <ThemedText style={FONTS.h3}>Support</ThemedText>
        <View style={[styles.optionList, { backgroundColor: theme.input_bg }]}>
          <SettingItem icon="lock" label="Privacy Settings" />
          <SettingItem icon="info" label="About Us" />
        </View>
        {/* Logout */}
        <Btn
          title="Sign out"
          style={{ width: "50%", alignSelf: "center" }}
          onPress={showSignoutAlert}></Btn>
      </View>
    </SafeScreen>
  );
}

// Individual setting/support row
function SettingItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={20}
        color={COLORS.secondary}
        style={styles.icon}
      />
      <ThemedText style={styles.optionText}>{label}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  profileCard: {
    borderRadius: radius._12,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 28,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 0,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  optionList: {
    marginBottom: 30,
    paddingVertical: spacingY._05,
    paddingHorizontal: spacingX._10,
    borderRadius: radius._12,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacingY._12,
  },
  icon: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});
