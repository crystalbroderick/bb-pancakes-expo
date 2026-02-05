// components/ExpandableFAB.jsx
import ThemedText from "@/components/theme/ThemedText";
import { COLORS, FONTS, spacingX } from "@/constants/theme";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
export default function ExpandableFAB({ onImport, onCreate, bottom, theme }) {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setOpen((prev) => {
      Animated.timing(animation, {
        toValue: prev ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return !prev;
    });
  };

  const buttonStyle = (index) => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -(55 * (index + 1))],
        }),
      },
    ],
    opacity: animation,
  });

  return (
    <View style={[styles.container, bottom]}>
      {open && (
        <>
          <Animated.View style={[styles.actionBtn, buttonStyle(1)]}>
            <Pressable
              onPress={() => {
                toggle();
                onImport?.();
              }}
              style={styles.row}>
              <MaterialCommunityIcons name="import" size={22} color="#fff" />
              <ThemedText style={FONTS.label}>Import</ThemedText>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={[
              styles.actionBtn,
              { backgroundColor: theme.secondary },
              buttonStyle(0),
            ]}>
            <Pressable
              onPress={() => {
                toggle();
                onCreate?.();
              }}
              style={styles.row}>
              <Ionicons name="create-outline" size={22} color="#000" />
              <Text style={FONTS.label}>Create</Text>
            </Pressable>
          </Animated.View>
        </>
      )}

      {/* Main FAB */}
      <Pressable onPress={toggle} style={styles.fab}>
        <AntDesign
          name={open ? "close" : "plus"}
          size={24}
          color={COLORS.accent_blue}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 120,
    right: spacingX._20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fab: {
    backgroundColor: COLORS.yellow,
    borderRadius: 30,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  actionBtn: {
    position: "absolute",
    right: 0,
    backgroundColor: COLORS.gray, // or accent color
    borderRadius: 20,
    padding: 12,
    width: 100,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
