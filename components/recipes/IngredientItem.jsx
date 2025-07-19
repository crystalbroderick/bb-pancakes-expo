import ThemedText from "@/components/theme/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
const IngredientItem = ({ ingredient, theme }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      style={[
        styles.container,
        {
          backgroundColor: theme && theme.background,
        },
      ]}>
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={24}
        color={checked ? theme.secondary : theme.gray}
        style={{ marginRight: 10 }}
      />
      <View style={[styles.textWrap, { flexDirection: "row" }]}>
        {ingredient.quantity && (
          <View style={{ marginEnd: 3 }}>
            <ThemedText style={{ fontFamily: "Mont_semi" }}>
              {ingredient.quantity}
            </ThemedText>
          </View>
        )}
        <View style={{ flexShrink: 1 }}>
          <ThemedText style={styles.name}>{ingredient.name}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

export default IngredientItem;
const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    elevation: 0,
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)", // subtle border
  },
  textWrap: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    alignItems: "flex-start",
  },
  name: {
    flexShrink: 1, // prevent overflow
  },
});
