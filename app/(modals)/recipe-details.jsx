import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackBtn from "../../components/buttons/BackBtn";
import Loading from "../../components/common/Loading";
import SubHeader from "../../components/common/SubHeader";
import IngredientItem from "../../components/recipes/IngredientItem";
import StepItem from "../../components/recipes/StepItem";
import SafeScreen from "../../components/SafeScreen";
import { TAG_STYLES } from "../../constants/tags";
import { getRecipe } from "../../services/recipeService";
const RecipeDetailsScreen = () => {
  const { id, isFavorite: isFavoriteParam } = useLocalSearchParams();
  const [tab, setTab] = useState("ingredients");
  const [isFavorite, setIsFavorite] = useState(isFavoriteParam === "true");
  const [showDescription, setShowDescription] = useState(true);

  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const fallbackData = queryClient.getQueryData(["recipe", id]);
  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
    staleTime: Infinity, // never auto-refetch
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    initialData: fallbackData,
  });

  useEffect(() => {
    setIsFavorite(isFavoriteParam === "true");
  }, [isFavoriteParam]);

  if (isLoading || !recipe)
    return (
      <Loading loading={isLoading} loadingText="Loading recipe.."></Loading>
    );
  if (error)
    return (
      <SafeScreen>
        <ThemedText>Sorry! {error.message}</ThemedText>
      </SafeScreen>
    );
  const firstTag = recipe.tags?.[0];
  const tagStyle = TAG_STYLES[firstTag] || TAG_STYLES.default;

  const renderTimeCards = () => (
    <View style={styles.timesContainer}>
      {[
        { label: "Prep", time: recipe.prep_time, color: theme.yellow },
        { label: "Cook", time: recipe.cook_time, color: theme.accent },
        { label: "Total", time: recipe.total_time, color: theme.secondary },
      ].map(({ label, time, color }, i) => (
        <View
          key={label}
          style={{
            alignItems: "center",
            backgroundColor: color,
            padding: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <MaterialCommunityIcons
              name={
                i === 0
                  ? "clock-time-three-outline"
                  : i === 1
                  ? "toaster-oven"
                  : "timer-sand-complete"
              }
              size={16}
              color="black"
            />
            <Text style={[FONTS.label, { fontWeight: "bold", marginStart: 4 }]}>
              {label}:
            </Text>
          </View>
          <Text style={{ marginTop: 4 }}>{time} mins</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeScreen
      style={{ flex: 1, backgroundColor: tagStyle.color, paddingVertical: 0 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Top Area
          TO DO: add options (delete, edit) */}
        <View
          style={{
            backgroundColor: tagStyle.color,
            paddingBottom: 40,
            paddingHorizontal: spacingX._20,
          }}>
          <BackBtn />
          <View key={id} style={{ position: "absolute", right: 20, top: 10 }}>
            {isFavorite ? (
              <AntDesign name="heart" size={18} color={"black"} />
            ) : (
              <AntDesign name="hearto" size={18} color={"black"} />
            )}
          </View>
        </View>

        {/* MAIN CONTENT */}
        <View
          style={{
            backgroundColor: theme.background,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 20,
            flexGrow: 1,
          }}>
          {/* Basic Info */}
          <SubHeader fontStyle={FONTS.h1} color={tagStyle.color}>
            {recipe.name}
          </SubHeader>

          {recipe.description && (
            <TouchableOpacity
              onPress={() => setShowDescription(!showDescription)}>
              <ThemedText style={FONTS.label}>
                {showDescription ? "> Hide ↑" : "> Read Description ↓"}
              </ThemedText>
            </TouchableOpacity>
          )}

          {showDescription && (
            <ThemedText style={{}}>{recipe.description}</ThemedText>
          )}

          {renderTimeCards()}

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                tab === "ingredients" && styles.activeTab,
              ]}
              onPress={() => setTab("ingredients")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "ingredients" && styles.activeTabText,
                ]}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                tab === "instructions" && styles.activeTab,
              ]}
              onPress={() => setTab("instructions")}>
              <Text
                style={[
                  styles.tabText,
                  tab === "instructions" && styles.activeTabText,
                ]}>
                Instructions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}

          <View style={styles.content}>
            {tab === "ingredients"
              ? recipe.ingredients.map((ingredient, index) => (
                  <IngredientItem
                    key={index}
                    ingredient={ingredient}
                    theme={theme}
                  />
                ))
              : recipe.steps.map((step, index) => (
                  <StepItem key={index} step={step} theme={theme} />
                ))}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

export default RecipeDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: spacingY._50,
    borderTopRadius: 10,
  },
  timesContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // or "space-between"
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  tabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#eee",
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#4f46e5",
  },
  tabText: {
    color: "#555",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});
