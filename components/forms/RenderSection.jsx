import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingY } from "@/constants/theme";
import { Text, View } from "react-native";

const RenderSection = ({ title, children, error, textStyle = {} }) => (
  <View style={{ paddingVertical: spacingY._05 }}>
    <ThemedText style={[FONTS.h2]}>{title}</ThemedText>
    {error && <Text style={[FONTS.labelSemi, textStyle]}>{error}</Text>}
    {children}
  </View>
);

export default RenderSection;
