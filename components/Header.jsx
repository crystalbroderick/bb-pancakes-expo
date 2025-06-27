import ThemedText from "@/components/ThemedText";
import { FONTS, spacingY } from "@/constants/theme.js";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import BackBtn from "./BackBtn";
const Header = ({ leftIcon, title = " ", icon, iconColor = "#808080" }) => {
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
      {title && <ThemedText style={[FONTS.h2]}>{title}</ThemedText>}
      <AntDesign
        name={icon}
        size={35}
        color={iconColor}
        onPress={() => router.navigate("/account")}
      />
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
