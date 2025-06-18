import Btn from "@/components/Btn.js";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/ThemedText";
import { FONTS } from "@/constants/theme";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
const WelcomeScreen = () => {
  return (
    <SafeScreen>
    <View style={[styles.container]}>
      <Image
        source={require("../assets/images/little-chef-yellow-sd.png")}
        style={styles.chefImage}
      />

      <View style={styles.titleRow}>
        <Image
          source={require("../assets/images/pancakes-logo.png")}
          style={styles.logo}
        />

        <View style={styles.textContainer}>
          <Text style={FONTS.title}>BB Pancakes</Text>
          <ThemedText style={[FONTS.caption]}>
            Stack up your favorites
          </ThemedText>
        </View>
      </View>

      <Btn
        style={styles.button}
        title="Get Started"
        onPress={() => router.navigate("/signin")}>
        Let's get started!
      </Btn>
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
