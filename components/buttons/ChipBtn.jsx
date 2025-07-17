import { COLORS, FONTS } from "@/constants/theme";
import { Pressable, Text } from "react-native";
const ChipBtn = ({ onPress, title, selected, style }) => {
  return (
    <Pressable
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: 6,
          backgroundColor: selected ? COLORS.secondary : "#ddd",
          borderRadius: 20,
          marginRight: 8,
        },
        style,
      ]}
      onPress={onPress}>
      <Text style={FONTS.label}>{title}</Text>
    </Pressable>
  );
};

export default ChipBtn;
