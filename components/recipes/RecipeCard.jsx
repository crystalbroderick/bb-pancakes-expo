import ThemedText from "@/components/theme/ThemedText";
import { TAG_STYLES } from "@/constants/tags";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import {
  createFavorite,
  deleteFavorite,
  deleteRecipe,
} from "../../services/recipeService";
const RecipeCard = ({ recipe, index, showTags, searchTerm }) => {
  const { isLightTheme, theme } = useTheme();
  const tags = recipe.tags || ["other"];
  const { user } = useAuth();
  const baseColor = TAG_STYLES[tags[0]]?.color || TAG_STYLES.default.color;
  const gradientColors =
    tags.length > 1
      ? tags
          .map((tag) => TAG_STYLES[tag]?.color || TAG_STYLES.default.color)
          .filter(Boolean)
      : null;
  const queryClient = useQueryClient();

  const renderTagChips = () =>
    tagsToShow.map((tag) => {
      const tagStyle = TAG_STYLES[tag] || TAG_STYLES.default;
      return (
        <View
          key={tag}
          style={[styles.tagChip, { backgroundColor: tagStyle.color }]}>
          {/* {tagStyle.icon} */}
          <Text style={FONTS.label}>{tag}</Text>
        </View>
      );
    });

  const renderIcons = () => (
    <View style={styles.topIcons}>
      <Pressable onPress={() => toggleFavoriteMutation.mutate()}>
        {recipe.isFavorite ? (
          <AntDesign name="heart" size={18} color={COLORS.black} />
        ) : (
          <AntDesign name="hearto" size={18} color={COLORS.black} />
        )}
      </Pressable>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "edit-recipe",
            params: { id: recipe.recipe_id },
          })
        }>
        <FontAwesome6 name="edit" size={18} color={COLORS.black} />
      </Pressable>
      <Pressable onPress={showDeleteAlert}>
        <FontAwesome6 name="trash" size={18} color={COLORS.black} />
      </Pressable>
    </View>
  );

  const utils = useQueryClient(); // for cache updates

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      const data = {
        profile_id: recipe.user_id,
        recipe_id: recipe.recipe_id,
      };
      if (recipe.isFavorite) {
        await deleteFavorite(data);
      } else {
        await createFavorite(data);
      }
    },
    onSuccess: () => {
      // React Query re-fetch the updated data
      utils.invalidateQueries(["recipes", user.id]);
    },
    onError: () => {
      Alert.alert("Error", "Could not update favorite.");
    },
  });

  const showDeleteAlert = () => {
    Alert.alert("Confirm", `Are you sure you want to delete ${recipe.name}?`, [
      {
        text: "cancel",
        onPress: console.log("cancel logout"),
        style: "cancel",
      },
      { text: "Delete", onPress: handleDelete, style: "destructive" },
    ]);
  };

  const MAX_TAGS = 2;
  const tagsToShow = recipe.tags.slice(0, MAX_TAGS);
  const extraCount = recipe.tags.length - MAX_TAGS;

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipe.recipe_id);
      Alert.alert("Deleted!", "Recipe deleted successfully.");
      // Invalidate or refetch recipes list so UI updates
      queryClient.invalidateQueries(["recipes", user.id]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const openRecipeDetails = () => {
    router.push({
      pathname: "recipe-details",
      params: { id: recipe.recipe_id, isFavorite: recipe.isFavorite },
    });
  };
  return (
    <Pressable onPress={openRecipeDetails}>
      <View style={styles.cardWrapper}>
        {gradientColors ? (
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={gradientColors}
            style={styles.leftGradient}></LinearGradient>
        ) : (
          <View
            style={[
              styles.leftGradient,
              { backgroundColor: baseColor },
            ]}></View>
        )}

        {/* Main Card Content */}
        <View style={[styles.card, { backgroundColor: theme.input_bg }]}>
          {/* Left Image */}
          <Image
            source={
              recipe.image_url
                ? { uri: recipe.image_url }
                : require("@/assets/images/neptune-placeholder-48.jpg")
            }
            style={[styles.image]}
          />

          {/* Right Side */}
          <View style={styles.content}>
            {/* Top Row: Title & Heart */}
            <View style={styles.header}>
              <ThemedText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.title}>
                {recipe.name}
              </ThemedText>
              <Pressable onPress={() => toggleFavoriteMutation.mutate()}>
                <AntDesign
                  name={recipe.isFavorite ? "heart" : "hearto"}
                  size={18}
                  color={theme.danger}
                />
              </Pressable>
            </View>

            {/* Middle Info Row */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={14} color={theme.text} />
                <ThemedText style={FONTS.label}>
                  {recipe.total_time} min
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <ThemedText style={FONTS.label}>
                  {recipe.ingredients.length} ingredients
                </ThemedText>
              </View>
              {/* TO DO: add easy and repeatition data first */}
              {/* <View style={styles.infoItem}>
                <Ionicons name="flame" size={14} color={theme.text} />
                <ThemedText style={FONTS.label}>
                  {recipe.difficulty || "Easy"}
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="repeat-outline" size={16} />
                <Text style={styles.infoText}>5 x</Text>
              </View> */}
            </View>
            <View>
              <ThemedText style={[FONTS.label_semim, { marginTop: 0 }]}>
                {searchTerm && recipe.matchCount > 0 && (
                  <>
                    {recipe.matchCount} ingredient
                    {recipe.matchCount > 1 ? "s" : ""} matched
                  </>
                )}
              </ThemedText>

              <View style={styles.tagRow}>
                {!showTags && (
                  <>
                    {renderTagChips()}
                    {extraCount > 0 && (
                      <View
                        style={[
                          styles.tagChip,
                          { backgroundColor: theme.gray },
                        ]}>
                        <Text style={[FONTS.label, { color: "white" }]}>
                          +{extraCount} more
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>
              {/* Bottom Right Arrow */}
              {/* <View style={styles.bottomArrow}>
                <AntDesign name="doubleright" size={18} color={theme.text} />
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
export default RecipeCard;
const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 1,
    elevation: 1,
  },
  card: {
    flexDirection: "row",
    borderTopEndRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 1,
    flex: 1,
  },
  leftGradient: {
    width: 6,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  image: {
    width: "33%",
    maxHeight: 130,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    flexShrink: 1,
    paddingRight: 8,
  },
  infoRow: {
    flexDirection: "row",
    // gap: 5, when there is more data
    justifyContent: "space-between",
    marginTop: 6,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 13,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: "#FFE8B0", // use dynamic pastel color
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)", // subtle border
  },
  tagText: {
    marginLeft: 1,
    fontSize: 10,
    color: "#333", // or "#444" depending on bg
    fontWeight: "500",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 1,
    bottom: 0,
  },
  bottomArrow: {
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    bottom: 1,
  },
});
