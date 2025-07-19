import ThemedText from "@/components/theme/ThemedText";
import { COLORS, FONTS } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

const SubHeader = ({ viewStyle, fontStyle, color, children }) => {
  return (
    <View style={[styles.container, viewStyle]}>
      <ThemedText style={[FONTS.h2, fontStyle]}>{children}</ThemedText>
      <View
        style={[
          styles.underline,
          { backgroundColor: color ? color : COLORS.yellow },
        ]}></View>
    </View>
  );
};

export default SubHeader;
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  underline: {
    height: 3,
    height: 3,
    backgroundColor: COLORS.yellow,
    marginTop: -4,
    width: 40,
    borderRadius: 2,
  },
});
