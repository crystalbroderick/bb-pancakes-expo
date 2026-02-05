import Avatar from "@/components/common/Avatar";
import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingY } from "@/constants/theme.js";
import { useTheme } from "@/context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import BackBtn from "../buttons/BackBtn";
const Header = ({
  showBackButton = false,
  title = " ",
  icon,
  iconColor = "#808080",
  avatar,
  showAvatar = false,
  style = {},
  isDirty = false,
  showImport = false,
}) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={[styles.leftSide, style]}>
        {showBackButton ? (
          <BackBtn isDirty={isDirty} />
        ) : (
          <Image
            source={require("../../assets/images/pancakes-logo-sm.png")}
            style={styles.logo}
            tintColor={theme.primary}
          />
        )}
      </View>
      <ThemedText style={[styles.title, FONTS.h1]}>{title || ""}</ThemedText>
      {showAvatar && (
        <Pressable
          onPress={() => router.navigate("/account")}
          style={styles.rightSide}>
          <Avatar size={45} uri={avatar} />
        </Pressable>
      )}
      {showImport && (
        <Pressable
          onPress={() => router.navigate("/import-recipe")}
          style={styles.rightSide}>
          <MaterialCommunityIcons
            name="file-import-outline"
            size={25}
            color={theme.text}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacingY._10,
    marginBottom: spacingY._20,
    // gap: 10,
    height: 40,
  },

  leftSide: {
    position: "absolute",
    left: 0,
  },

  rightSide: {
    position: "absolute",
    right: 0,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
