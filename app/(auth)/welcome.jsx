import { Btn } from "@/components/buttons";
import SafeScreen from "@/components/SafeScreen";
import { FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
const WelcomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  // useEffect(() => {
  //   if (session) {
  //     router.replace("/(tabs)/");
  //   }
  // }, [session]);
  return (
    <SafeScreen bg={theme.accent_blue}>
      <View style={[styles.container]}>
        <Image
          source={require("@/assets/images/little-chef-yellow-sd.png")}
          style={styles.chefImage}
        />

        <View style={styles.titleRow}>
          <Animated.Image
            entering={FadeIn}
            source={require("@/assets/images/pancakes-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <View style={styles.textContainer}>
            <Text style={FONTS.title}>BB Pancakes</Text>
            <Text style={[FONTS.caption, { color: "#fff" }]}>
              Stack up your favorites
            </Text>
          </View>
        </View>

        <Btn
          style={styles.button}
          title="Get Started"
          onPress={() => router.push("/(auth)/signup")}></Btn>
      </View>
    </SafeScreen>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  chefImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
  },
  textContainer: {
    justifyContent: "center",
  },
  slogan: {
    fontSize: 16,
  },
  button: {
    marginTop: 100,
    padding: 20,
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Mont_bold",
  },
});
