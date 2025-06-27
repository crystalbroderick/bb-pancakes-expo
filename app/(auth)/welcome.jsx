import Btn from "@/components/Btn.jsx";
import SafeScreen from "@/components/SafeScreen";
import { FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAuth } from "../../context/AuthContext";
const WelcomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const session = useAuth();
  useEffect(() => {
    if (session) {
      router.replace("/(tabs)/");
    }
  }, [session]);
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
        {/* <HorizontalDividerWithLabel accent={theme.accent} textColor="white">
          <Link href="/signin"> Already have an account?</Link>
        </HorizontalDividerWithLabel> */}
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

// const getStyles = (theme) =>
//   StyleSheet.create({
// container: {
//     flex: 1,
//     backgroundColor: theme.background,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//   },
//   chefImage: {
//     width: "100%",
//     height: 300,
//     resizeMode: "contain",
//   },
//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     width: 70,
//     height: 70,
//     resizeMode: "contain",
//   },
//   textContainer: {
//     justifyContent: "center",
//   },
//   slogan: {
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 100,
//     padding: 20,
//     borderRadius: 10,
//     width: "70%",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 15,
//     fontFamily: "Mont_bold",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
//   });

// const styles = {...useGlobalStyles(),
//   container: {
//     flex: 1,
//     backgroundColor: theme.background,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//   },
//   chefImage: {
//     width: "100%",
//     height: 300,
//     resizeMode: "contain",
//   },
//   titleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     width: 70,
//     height: 70,
//     resizeMode: "contain",
//   },
//   textContainer: {
//     justifyContent: "center",
//   },
//   slogan: {
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 100,
//     padding: 20,
//     borderRadius: 10,
//     width: "70%",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 15,
//     fontFamily: "Mont_bold",
//     fontWeight: "600",
//     textTransform: "uppercase",
//   },
// }
