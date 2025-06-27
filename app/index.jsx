import { COLORS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const index = () => {
  const router = useRouter();
  const { session } = useAuth();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    // Run animation
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Wait 2s total (800ms animation + slight delay), then route based on session
    const timeout = setTimeout(() => {
      if (session) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/welcome");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [session]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("@/assets/images/pancakes-logo.png")}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.accent_blue,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 180,
  },
});
