import Header from "@/components/common/Header";
// import RecipeCard from "@/components/recipes/RecipeCard";
import RecipeCard from "@/components/recipes/RecipeCard";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/theme/ThemedText";
import { TAGS } from "@/constants/tags";
import { FONTS, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExpandableFAB } from "../../components/buttons";
import Loading from "../../components/common/Loading";
import FilterChipList from "../../components/recipes/FilterChipList";
import { useAuth } from "../../context/AuthContext";
import { useFilteredRecipes } from "../../hooks/useFilteredRecipes";
import { getAllRecipes } from "../../services/recipeService";
export default function Index() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showTags, setShowTags] = useState(false);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const sheetRef = useRef(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const initalRecipes = queryClient.getQueryData(["recipes", user?.id]);
  const {
    isLoading,
    isError,
    data = [],
    error,
  } = useQuery({
    queryKey: ["recipes", user?.id],
    queryFn: () => getAllRecipes(user.id),
    //cached after unmount
    staleTime: Infinity, // never auto-refetch
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
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
    <>
      <SafeScreen paddingHorizontal>
        {isLoading ? (
          <Loading></Loading>
        ) : isError ? (
          <Text>
            Sorry! {error.message}
            <Link href="(auth)/signin">Try signing in again.</Link>
          </Text>
        ) : (
          <>
            <Header
              showLogo
              title="Recipes"
              avatar={user?.avatar_url}
              showAvatar
              size="24"
            />

            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search by title or ingredient..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={[
                  styles.searchInput,
                  { color: theme.text, backgroundColor: theme.input_bg },
                ]}
                placeholderTextColor="#888"
              />
              <Ionicons
                name="search"
                size={20}
                color={theme.primary}
                style={styles.searchIcon}
              />
            </View>
            {/* Horizontal Filter with Chips and arrow */}
            <FilterChipList
              tags={TAGS}
              selectedTags={selectedTags}
              onToggle={toggleTag}
              theme={theme}
            />
            <View>
              <Picker
                style={{
                  color: theme.text,
                  backgroundColor: theme.input_bg,
                  height: 50,
                  margin: 0,
                }}
                dropdownIconColor={theme.primary}
                prompt="Sort by"
                selectedValue={sortBy}
                onValueChange={(itemValue) => setSortBy(itemValue)}>
                <Picker.Item label="Recent" value="newest" />
                <Picker.Item label="Favorites" value="favorites" />
                <Picker.Item label="Most Made" value="mostMade" />
                <Picker.Item label="Quickest" value="quickest" />
                <Picker.Item label="Longest" value="longest" />
                <Picker.Item label="A–Z" value="alphabetical" />
              </Picker>
            </View>
            {/* <View
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
            {/* <Button title="Most Made" onPress={() => setSortBy('mostMade')} /> </View*/}
            {filteredRecipes.length === 0 ? (
              <ThemedText style={FONTS.h4}>
                No matching recipes found with that criteria! Click the add
                button or{" "}
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
                  <RecipeCard
                    recipe={recipe}
                    index={index}
                    showTags={showTags}
                    searchTerm={searchTerm}
                  />
                )}
              />
            )}
          </>
        )}
        <ExpandableFAB
          onImport={() => router.push("/import-recipe")}
          onCreate={() => router.push("/create-recipe")}
          bottom={{ bottom: insets.bottom + 80 + spacingY._10 }}
          theme={theme}
        />
      </SafeScreen>
    </>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
  filterChipContainer: {
    flexDirection: "row",
  },
  pickerContainer: {
    backgroundColor: "pink",
  },
  header: {
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 40, // Leave room for the icon
    backgroundColor: "#fff",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
  },

  flatListViewStyle: {
    flex: 1,
    marginTop: spacingY._10,
    gap: spacingY._25,
    marginBottom: spacingY._30,
  },
  container2: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer2: {
    flex: 1,
    alignItems: "center",
  },
  input2: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
