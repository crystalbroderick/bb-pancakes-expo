import { COLORS } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
const index = () => {
  const router = useRouter();
  const { session, user, loading } = useAuth();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (loading || hasRedirected.current) return;

    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    const timeout = setTimeout(() => {
      if (session) {
        router.replace("/(tabs)");
      } else {
        console.log("need to log in!!");
        router.replace("/(auth)/welcome");
      }

      hasRedirected.current = true;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loading, session]);

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
