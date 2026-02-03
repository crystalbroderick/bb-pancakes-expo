import Header from "@/components/common/Header";
import RecipeCard from "@/components/recipes/RecipeCard";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/theme/ThemedText";
import { COLORS, FONTS, spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { AntDesign } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FloatingBtn } from "../../components/buttons";
import FilterChipList from "../../components/recipes/FilterChipList";
import { useAuth } from "../../context/AuthContext";
import { getAllRecipes } from "../../services/recipeService";

const allTags = [
  "breakfast",
  "dessert",
  "lunch",
  "dinner",
  "vegetarian",
  "vegan",
];
export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user } = useAuth();

  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    let res = await getAllRecipes(user.id);
    if (res.success) setRecipes(res.message);
    console.log("got all recipes: ", res);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const mock_recipes = [
    {
      id: "1",
      name: "Lemon Chicken Stir Fry",
      ingredients: ["chicken breast", "broccoli", "lemon", "garlic"],
      tags: ["dinner"],
      favorite: true,
      createdAt: "2025-06-18T10:00:00Z",
      madeCount: 3,
      time: "30",
    },
    {
      id: "2",
      name: "French Toast",
      ingredients: ["bread", "egg", "milk", "cinnamon"],
      tags: ["breakfast", "dessert"],
      favorite: false,
      createdAt: "2025-06-15T09:00:00Z",
      madeCount: 2,
      time: "30",
    },
    {
      id: "3",
      name: "Tofu Stir Fry",
      ingredients: ["tofu", "carrot", "soy sauce"],
      tags: ["vegetarian", "dinner", "lunch"],
      favorite: true,
      createdAt: "2025-06-10T12:00:00Z",
      madeCount: 5,
      time: "30",
    },
    {
      id: "4",
      name: "Pancakes",
      ingredients: ["pancake mix", "water"],
      tags: ["breakfast"],
      favorite: true,
      createdAt: "2025-06-10T12:00:00Z",
      madeCount: 5,
      time: "5",
    },
    {
      id: "5",
      name: "Fish Taco",
      ingredients: ["Cod", "Cole Slaw", "Spices"],
      tags: ["lunch", "dinner"],
      favorite: true,
      createdAt: "2025-06-10T12:00:00Z",
      madeCount: 5,
      time: "5",
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
      <Header
        showLogo
        title=""
        avatar={user?.avatar_url}
        showAvatar
        size="24"
      />

      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={FONTS.h1}>Recipes</ThemedText>
        <TouchableOpacity style={styles.searchIcon}>
          <AntDesign name="search1" size={24} color={COLORS.white}></AntDesign>
        </TouchableOpacity>
      </View>
      {/* Horizontal Filter with Chips and arrow */}
      <FilterChipList
        tags={allTags}
        selectedTags={selectedTags}
        onToggle={toggleTag}
        theme={theme}
      />
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

      {/* <View style={styles.container}> */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Button title="Newest" onPress={() => setSortBy('newest')} />
        <Button title="Favorites" onPress={() => setSortBy('favorites')} />
        <Button title="Most Made" onPress={() => setSortBy('mostMade')} />
      </View> */}

      {recipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          style={styles.flatListViewStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 100, // prevent bottom items from being cut off behind tab bar
          }}
          ListEmptyComponent={<Text>No matching recipes found.</Text>}
          renderItem={({ item: recipe, index }) => (
            <RecipeCard recipe={recipe} index={index} />
          )}
        />
      ) : (
        <ThemedText style={FONTS.h3}>
          No recipes added! Click the add button or{" "}
          <Link
            href="/create-recipe"
            style={{ color: theme.primary, textDecorationLine: "underline" }}>
            here
          </Link>
        </ThemedText>
      )}
      <FloatingBtn
        style={{ bottom: insets.bottom + tabBarHeight + spacingY._50 }}
        onPress={() => router.push("/create-recipe")}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingHorizontal: spacingX._20,
  //   paddingTop: spacingX._10,
  //   borderTopLeftRadius: 20,
  //   borderTopRightRadius: 20,
  // },
  filterChipContainer: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: COLORS.darkGray,
    padding: spacingX._10,
    borderRadius: 50,
  },
  flatListViewStyle: {
    flex: 1,
    marginTop: spacingY._10,
    gap: spacingY._25,
    marginBottom: spacingY._30,
  },
});
