import { FONTS, spacingY } from "@/constants/theme";
import { Text, View } from "react-native";
import SubHeader from "../common/SubHeader";

const RenderSection = ({ title, children, error, textStyle = {} }) => (
  <View style={{ paddingVertical: spacingY._05 }}>
    <SubHeader>{title}</SubHeader>
    {error && <Text style={[FONTS.labelSemi, textStyle]}>{error}</Text>}
    {children}
  </View>
);

export default RenderSection;
