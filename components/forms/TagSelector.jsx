import { TAGS } from "@/constants/tags";
import { COLORS } from "@/constants/theme";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
const TagSelector = ({ control, style }) => (
  <Controller
    control={control}
    name="tags"
    render={({ field: { value, onChange } }) => (
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {TAGS.map((tag) => {
          const isSelected = value?.includes(tag);
          return (
            <TouchableOpacity
              key={tag}
              onPress={() =>
                isSelected
                  ? onChange(value.filter((t) => t !== tag))
                  : onChange([...(value || []), tag])
              }
              style={[
                {
                  backgroundColor: isSelected ? COLORS.secondary : "#eee",
                  padding: 8,
                  borderRadius: 16,
                },
                style,
              ]}>
              <Text style={{ color: isSelected ? "#fff" : "#000" }}>{tag}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    )}
  />
);
export default TagSelector;
