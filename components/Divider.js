import { StyleSheet, Text, View } from "react-native";

const HorizontalDividerWithLabel = ({
  containerStyles = {},
  accent = "gray",
  textColor = "#000",
  children,
}) => {

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={[styles.divider, { borderBottomColor: accent }]} />
      <Text style={[styles.label, {color: textColor}]}>{children}</Text>

      <View style={[styles.divider, { borderBottomColor: accent }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
    height: 1,
  },
  label: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default HorizontalDividerWithLabel;
