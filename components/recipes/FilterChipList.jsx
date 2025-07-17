import { FONTS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
const FilterChipList = ({ tags = [], selectedTags = [], onToggle, theme }) => {
  return (
    <View style={{ position: "relative", paddingVertical: 10 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: 36, // space for arrow
        }}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            onPress={() => onToggle(tag)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: selectedTags.includes(tag) ? "#444" : "#ccc",
              borderRadius: 20,
              marginRight: 8,
            }}>
            <Text
              style={[
                {
                  color: selectedTags.includes(tag) ? "#fff" : "#000",
                },
                FONTS.label,
              ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scroll hint overlay */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 36,
          justifyContent: "center",
          alignItems: "flex-end",
        }}>
        <View
          style={{
            backgroundColor: theme.background,
            width: 36,
            height: "100%",
            position: "absolute",
            right: 0,
            opacity: 0.9,
          }}
        />
        <Ionicons
          name="chevron-forward"
          size={18}
          color="#888"
          style={{ marginRight: 10, zIndex: 2 }}
        />
      </View>
    </View>
  );
};

export default FilterChipList;
