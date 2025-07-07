import ThemedText from "@/components/ThemedText";
import { FONTS, spacingY } from "@/constants/theme.js";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Avatar from "./Avatar";
import BackBtn from "./BackBtn";
const Header = ({
  leftIcon,
  title = " ",
  icon,
  iconColor = "#808080",
  avatar,
  showAvatar,
}) => {
  return (
    <View style={styles.container}>
      {leftIcon === "logo" ? (
        <Image
          source={require("../assets/images/pancakes-logo-sm.png")}
          style={styles.logo}
        />
      ) : (
        <BackBtn />
      )}
      <ThemedText style={[FONTS.h2]}>{title || ""}</ThemedText>
      {showAvatar ? (
        <Pressable onPress={() => router.navigate("/account")}>
          <Avatar size="40" uri={avatar} />
        </Pressable>
      ) : (
        <AntDesign
          name={icon}
          size={35}
          color={iconColor}
          onPress={() => router.navigate("/account")}
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacingY._20,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
