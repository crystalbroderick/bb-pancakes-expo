import ThemedText from "@/components/theme/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const StepItem = ({ step, theme }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => setChecked(!checked)}
      style={[styles.stepContainer]}>
      <View style={styles.checkboxWrap}>
        <Ionicons
          name={checked ? "checkbox" : "square-outline"}
          size={24}
          color={checked ? theme.secondary : theme.gray}
        />

        <View
          style={[
            styles.dashedLine,
            {
              borderColor: checked ? theme.secondary : theme.gray,
              height: "90%",
            },
          ]}
        />
      </View>

      <View style={styles.textWrap}>
        <ThemedText style={styles.stepNumber}>{step.step_number}</ThemedText>
        <ThemedText style={styles.instruction}>{step.instruction}</ThemedText>
      </View>
    </Pressable>
  );
};
export default StepItem;

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    position: "relative",
    paddingBottom: 16,
  },
  checkboxWrap: {
    position: "relative",
    alignItems: "center",
    width: 24,
  },
  dashedLine: {
    position: "absolute",
    top: 26, // just below checkbox
    left: 10,
    borderLeftWidth: 2,
    borderStyle: "dashed",
    width: 0,
  },
  textWrap: {
    flex: 1,
    flexDirection: "column",
  },
  stepNumber: {
    fontFamily: "Mont_semi",
    marginBottom: 2,
  },
  instruction: {
    flexShrink: 1,
  },
});
