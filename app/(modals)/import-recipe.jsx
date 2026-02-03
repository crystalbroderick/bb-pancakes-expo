import InputField from "@/components/forms/InputField";
import SafeScreen from "@/components/SafeScreen";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, StyleSheet } from "react-native";
import { Btn } from "../../components/buttons";
import Header from "../../components/common/Header";
import Loading from "../../components/common/Loading";

const ImportRecipeScreen = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { url: "" },
  });

  const onSubmit = async ({ url }) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(
          url
        )}&apiKey=${process.env.EXPO_PUBLIC_X_KEY}`
      );

      if (!res.ok) throw new Error("Failed to fetch recipe from Spoonacular");
      const recipe = await res.json();
      console.log("attempting to import recipe: ", recipe);

      // Validate important fields
      if (
        !recipe.extendedIngredients?.length ||
        !recipe.analyzedInstructions?.[0]?.steps?.length
      ) {
        Alert.alert(
          "Import Error",
          "The recipe data is missing essential information like ingredients or steps and cannot be imported."
        );
        setLoading(false);
        return;
      }

      // Navigate to new recipe form for editing

      const cacheKey = ["importedRecipe", Date.now().toString()];
      queryClient.setQueryData(cacheKey, recipe);
      setLoading(false);
      // Navigate to create-recipe page and pass the cache key as param
      router.push({
        pathname: "/create-recipe",
        params: { importKey: cacheKey[1] }, // pass the timestamp key string
      });
      Alert.alert("Success", "Recipe imported successfully!");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeScreen paddingHorizontal>
      <Header title="Import Recipe" showBackButton />
      <InputField
        name="url"
        control={control}
        label="Paste URL"
        placeholder="https://example.com"
        error={errors?.url}
      />
      <Btn
        title="Add Recipe"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      {loading && <Loading />}
    </SafeScreen>
  );
};

export default ImportRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
