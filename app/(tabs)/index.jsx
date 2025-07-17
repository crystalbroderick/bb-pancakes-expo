import Header from "@/components/common/Header";
import RecipeCard from "@/components/recipes/RecipeCard";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/theme/ThemedText";
import { TAGS } from "@/constants/tags";
import { COLORS, FONTS, spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChipBtn, FloatingBtn } from "../../components/buttons";
import FilterChipList from "../../components/recipes/FilterChipList";
import { useAuth } from "../../context/AuthContext";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";
import { getAllRecipes } from "../../services/recipeService";
export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const initalRecipes = queryClient.getQueryData(["recipes"]);

  const {
    isLoading,
    isError,
    data = [],
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(user.id),
    //cached after unmount
    cacheTime: 1000 * 60 * 10, // 10 minutes in memory after last use
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: initalRecipes,
  });

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const recipes = data ?? [];

  const filteredRecipes = useFilteredRecipes(recipes ?? [], {
    searchTerm,
    selectedTags,
    sortBy,
  });

  return (
    <SafeScreen paddingHorizontal>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Sorry! {error.message}</Text>
      ) : (
        <>
          <Header
            showLogo
            title="Recipes"
            avatar={user?.avatar_url}
            showAvatar
            size="24"
          />

          {/* TO DO: Search + Header */}
          {/* <View style={styles.header}>
            <ThemedText style={FONTS.h1}>Recipes</ThemedText>
            <TouchableOpacity style={styles.searchIcon}>
              <AntDesign name="search1" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View> */}

          {/* Horizontal Filter with Chips and arrow */}
          <FilterChipList
            tags={TAGS}
            selectedTags={selectedTags}
            onToggle={toggleTag}
            theme={theme}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "justify-center",
              marginBottom: 12,
            }}>
            <ThemedText>Sort by: </ThemedText>
            <ChipBtn
              title="Newest"
              onPress={() => setSortBy("newest")}
              selected={sortBy === "newest"}
            />
            <ChipBtn
              title="Favorites"
              onPress={() => setSortBy("favorites")}
              selected={sortBy === "favorites"}
            />
            {/* <Button title="Most Made" onPress={() => setSortBy('mostMade')} /> */}
          </View>

          {filteredRecipes.length === 0 ? (
            <ThemedText style={FONTS.h4}>
              No matching recipes found with that criteria! Click the add button
              or{" "}
              <Link
                href="/create-recipe"
                style={{
                  color: theme.primary,
                  textDecorationLine: "underline",
                }}>
                here
              </Link>
            </ThemedText>
          ) : (
            <FlatList
              data={filteredRecipes}
              style={styles.flatListViewStyle}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.recipe_id}
              contentContainerStyle={{
                paddingBottom: 100, // prevent bottom items from being cut off behind tab bar
              }}
              ListEmptyComponent={
                <Text>
                  No recipes found. Press the add button or{" "}
                  <Link
                    href="/create-recipe"
                    style={{
                      color: theme.primary,
                      textDecorationLine: "underline",
                    }}>
                    here
                  </Link>
                </Text>
              }
              renderItem={({ item: recipe, index }) => (
                <RecipeCard recipe={recipe} index={index} />
              )}
            />
          )}

          <FloatingBtn
            style={{
              bottom: insets.bottom + tabBarHeight + spacingY._50,
            }}
            onPress={() => router.push("/create-recipe")}
          />
        </>
      )}
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
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
