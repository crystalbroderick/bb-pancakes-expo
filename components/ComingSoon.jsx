import ThemedText from "@/components/ThemedText";
import { FONTS } from "@/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";
import HorizontalDividerWithLabel from "./Divider";
import SafeScreen from "./SafeScreen";
const ComingSoon = ({ name, details }) => {
  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <Image
          source={require("../assets/images/little-chef-smile-sd.png")}
          style={styles.chefImage}
        />
        <HorizontalDividerWithLabel labelStyles={FONTS.h2}>{name}</HorizontalDividerWithLabel>
        <ThemedText style={FONTS.body}>{details}</ThemedText>
                <Text style={FONTS.title}>Coming soon...</Text>

      </View>
    </SafeScreen>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    verticallySpaced:5,
paddingHorizontal:30  },
  chefImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});
