import ThemedText from "@/components/theme/ThemedText";
import { TAG_STYLES } from "@/constants/tags";
import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../context/AuthContext";
import {
  createFavorite,
  deleteFavorite,
  deleteRecipe,
} from "../../services/recipeService";

const RecipeCard = ({ recipe, index }) => {
  const { isLightTheme, theme } = useTheme();
  const tags = recipe.tags || ["other"];
  const { user } = useAuth();
  const baseColor = TAG_STYLES[tags[0]]?.color || TAG_STYLES.default.color;
  const gradientColors =
    tags.length > 1
      ? tags.map((tag) => TAG_STYLES[tag]?.color).filter(Boolean)
      : null;
  const queryClient = useQueryClient();

  const renderTagChips = () =>
    tags.map((tag) => {
      const tagStyle = TAG_STYLES[tag] || TAG_STYLES.default;
      return (
        <View
          key={tag}
          style={[styles.tagChip, { backgroundColor: tagStyle.color }]}>
          {tagStyle.icon}
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
        <FontAwesome5 name="edit" size={18} color={COLORS.black} />
      </Pressable>
      <Pressable onPress={showDeleteAlert}>
        <FontAwesome5 name="trash" size={18} color={COLORS.black} />
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
      <Animated.View
        entering={FadeInDown.delay(index * 50)
          .springify()
          .damping(20)}>
        <View style={[styles.card, { backgroundColor: theme.input_bg }]}>
          {/* Gradient Top Background (if multiple tags) */}
          {gradientColors ? (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={gradientColors}
              style={styles.topSection}>
              {renderIcons()}
            </LinearGradient>
          ) : (
            <View style={[styles.topSection, { backgroundColor: baseColor }]}>
              {renderIcons()}
            </View>
          )}

          {/* Title + Tag Chips */}
          <View
            style={[
              styles.innerBox,
              {
                backgroundColor: theme.input_bg,
              },
            ]}>
            <ThemedText style={FONTS.h3} numberOfLines={2}>
              {recipe.name}
            </ThemedText>

            <View style={styles.tagRow}>{renderTagChips()}</View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 3,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "rgba(0, 0, 0, 0.1)", // subtle border
  },

  topSection: {
    height: 40,
    justifyContent: "center",
    paddingRight: 12,
  },

  topIcons: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 12,
  },

  innerBox: {
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    flexShrink: 1,
    flex: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#FFE8B0", // use dynamic pastel color
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)", // subtle border
  },
  tagText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#333", // or "#444" depending on bg
    fontWeight: "500",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
});
