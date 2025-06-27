import Header from "@/components/Header";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/ThemedText";
import { FONTS } from "@/constants/theme";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
const allTags = ["breakfast", "dessert", "dinner", "vegetarian"];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const recipes = [
    {
      id: "1",
      name: "Lemon Chicken Stir Fry",
      ingredients: ["chicken breast", "broccoli", "lemon", "garlic"],
      tags: ["dinner"],
      favorite: true,
      createdAt: "2025-06-18T10:00:00Z",
      madeCount: 3,
    },
    {
      id: "2",
      name: "French Toast",
      ingredients: ["bread", "egg", "milk", "cinnamon"],
      tags: ["breakfast", "dessert"],
      favorite: false,
      createdAt: "2025-06-15T09:00:00Z",
      madeCount: 2,
    },
    {
      id: "3",
      name: "Tofu Stir Fry",
      ingredients: ["tofu", "carrot", "soy sauce"],
      tags: ["vegetarian", "dinner"],
      favorite: true,
      createdAt: "2025-06-10T12:00:00Z",
      madeCount: 5,
    },
  ];

  const filteredRecipes = useFilteredRecipes(recipes, {
    searchTerm,
    selectedTags,
    sortBy,
  });

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <SafeScreen paddingHorizontal>
      <Header leftIcon={"logo"} title="Recipes" icon="setting" />

      <View>
        <ThemedText style={FONTS.h1}>Recipes</ThemedText>

        {/* <TextInput
        placeholder="Search recipes or ingredients"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 6,
          marginBottom: 12,
        }}
      /> */}

        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 12 }}>
          {allTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => toggleTag(tag)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                backgroundColor: selectedTags.includes(tag) ? "#444" : "#ccc",
                borderRadius: 20,
                marginRight: 8,
                marginBottom: 8,
              }}>
              <Text
                style={{ color: selectedTags.includes(tag) ? "#fff" : "#000" }}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Button title="Newest" onPress={() => setSortBy('newest')} />
        <Button title="Favorites" onPress={() => setSortBy('favorites')} />
        <Button title="Most Made" onPress={() => setSortBy('mostMade')} />
      </View> */}

        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No matching recipes found.</Text>}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 8,
                marginBottom: 8,
              }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>Tags: {item.tags.join(", ")}</Text>
              <Text>Ingredients: {item.ingredients.join(", ")}</Text>
              {item.favorite && <Text>⭐ Favorite</Text>}
            </View>
          )}
        />
      </View>
    </SafeScreen>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//   },
//   headline: {
//     paddingVertical: 20,
//   },
//   button: {
//     backgroundColor: "black",
//     padding: 12,
//     borderRadius: 6,
//     alignItems: "center",
//     margin: 20,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//   },
// });
