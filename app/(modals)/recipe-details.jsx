import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingX, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
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
import RecipeImage from "../../components/common/RecipeImage";
import SubHeader from "../../components/common/SubHeader";
import IngredientItem from "../../components/recipes/IngredientItem";
import StepItem from "../../components/recipes/StepItem";
import SafeScreen from "../../components/SafeScreen";
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

  if (isLoading)
    return (
      <Loading loading={isLoading} loadingText="Loading recipe.."></Loading>
    );
  if (error)
    return (
      <SafeScreen>
        <ThemedText>Sorry! {error.message}</ThemedText>
      </SafeScreen>
    );
  // const firstTag = recipe.tags?.[0];
  // const tagStyle = TAG_STYLES[firstTag] || TAG_STYLES.default;

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
            <Text
              style={[FONTS.labelSemi, { fontWeight: "bold", marginStart: 4 }]}>
              {label}:
            </Text>
          </View>
          <Text style={[FONTS.label, { marginTop: 4 }]}>{time} mins</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeScreen
      style={{ flex: 1, backgroundColor: theme.input_bg, paddingVertical: 0 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Top Area
          TO DO: add options (delete, edit) */}
        <View
          style={{
            backgroundColor: theme.input_bg,
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
            alginItems: "stretch",
          }}>
          {/* Circular image */}
          <View style={styles.imageWrapper}>
            <View style={styles.imagePlaceholder}>
              <RecipeImage uri={recipe.image_url} style={[styles.image]} />
            </View>
          </View>
          {/* Basic Info */}
          <SubHeader
            fontStyle={FONTS.h1}
            color={theme.yellow}
            viewStyle={{
              paddingTop: "50",
              marginBottom: 0,
            }}>
            <ThemedText style={FONTS.h1}>{recipe.name}</ThemedText>
          </SubHeader>
          {recipe.source_name && recipe.source_url && (
            <ThemedText style={[FONTS.labelSemi, { marginTop: -2 }]}>
              By <Link href={recipe.source_url}>"{recipe.source_name}"</Link>
            </ThemedText>
          )}
          {recipe.description && (
            <TouchableOpacity
              onPress={() => setShowDescription(!showDescription)}>
              <ThemedText style={[FONTS.label, { paddingTop: 10 }]}>
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
                tab === "ingredients" && styles.activeTab, // apply activeTab style
                tab === "ingredients" && { borderBottomColor: theme.yellow }, // override border color                ,
              ]}
              onPress={() => setTab("ingredients")}>
              <Text
                style={[
                  FONTS.h4,
                  { color: theme.gray },
                  tab === "ingredients" && { color: theme.primary },
                ]}>
                Ingredients
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                tab === "instructions" && styles.activeTab, // apply activeTab style
                tab === "instructions" && { borderBottomColor: theme.yellow }, // override border color
              ]}
              onPress={() => setTab("instructions")}>
              <Text
                style={[
                  FONTS.h4,
                  { color: theme.gray },
                  tab === "instructions" && { color: theme.primary },
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
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: spacingY._50,
    borderTopRadius: 10,
  },
  imageWrapper: {
    position: "absolute",
    alignSelf: "center",
    marginTop: -50,
  },
  imagePlaceholder: {
    backgroundColor: "#ccc",
    borderRadius: 75,
    width: 100,
    height: 100,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)", // subtle border
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
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
