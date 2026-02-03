import {
  IngredientRow,
  InputField,
  RenderSection,
  StepRow,
  TagSelector,
} from "@/components/forms";
import { useLocalSearchParams } from "expo-router";

import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingY } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import useUnsavedChangesWarning from "@/hooks/useUnsavedChangesWarning";
import { verticalScale } from "@/utils/styling";
import { RecipeSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Btn } from "../../components/buttons";
import Header from "../../components/common/Header";
import SubHeader from "../../components/common/SubHeader";

import { useAuth } from "../../context/AuthContext";
import { createAndGetRecipe } from "../../services/recipeService";
const CreateRecipeScreen = () => {
  const queryClient = useQueryClient();
  const { importKey } = useLocalSearchParams();

  const { data: importedRecipe } = useQuery({
    queryKey: ["importedRecipe", importKey],
    queryFn: () => {
      // This reads cached data synchronously from React Query's internal cache
      return queryClient.getQueryData(["importedRecipe", importKey]);
    },
    enabled: !!importKey,
    staleTime: Infinity,
  });
  console.log(importedRecipe);
  // const { importedRecipe } = useLocalSearchParams();
  // const parsedRecipe = importedRecipe ? JSON.parse(importedRecipe) : null;
  const router = useRouter();
  const { theme, isLightTheme } = useTheme();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    resetField,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(RecipeSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",

    defaultValues: {
      name: "",
      description: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      ingredients: [{ name: "", quantity: "" }],
      steps: [{ step_number: 1, instruction: "" }],
      tags: [],
      sourceName: "",
      sourceUrl: "",
      imageUrl: "",
    },
  });

  // warning message if form hasn't been saved
  useUnsavedChangesWarning(isDirty);

  const mapTags = (apiTags, isVegan, isVegetarian) => {
    const tagMap = {
      "main dish": "main",
      "side dish": "sides",
      dessert: "dessert",
    };

    const mapped = apiTags
      .map((tag) => tagMap[tag.toLowerCase()])
      .filter(Boolean);

    if (isVegan) mapped.push("vegan");
    if (isVegetarian) mapped.push("vegetarian");

    return mapped;
  };

  const handleImport = () => {
    const stripHtml = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");
    const plainDescription = stripHtml(importedRecipe?.summary || "");

    // Usage
    const importedTags = mapTags(
      importedRecipe.dishTypes || [],
      importedRecipe.vegan,
      importedRecipe.vegetarian
    );

    reset({
      name: importedRecipe.title || "",
      description: plainDescription || "",
      prepTime:
        importedRecipe.preparationMinutes !== null
          ? String(importedRecipe.preparationMinutes)
          : "",
      cookTime:
        importedRecipe.cookingMinutes !== null
          ? String(importedRecipe.cookingMinutes)
          : "",
      totalTime: importedRecipe.readyInMinutes || "",
      ingredients: importedRecipe.extendedIngredients?.map((ing) => ({
        name: ing.name,
        quantity: `${ing.amount} ${ing.unit}`.trim(),
      })) || [{ name: "", quantity: "" }],
      steps: importedRecipe.analyzedInstructions?.[0]?.steps?.map(
        (step, index) => ({
          step_number: index - 1,
          instruction: step.step,
        })
      ) || [{ step_number: 0, instruction: "" }],
      tags: importedTags || [],
      sourceUrl:
        importedRecipe.sourceUrl || importedRecipe.spoonacularSourceUrl || "",
      sourceName: importedRecipe.sourceName || "",
      imageUrl: importedRecipe.image || "",
    });
  };

  useEffect(() => {
    if (importedRecipe) {
      handleImport();
    }
  }, [importedRecipe, reset]);

  /* Times */
  const prepTime = watch("prepTime");
  const cookTime = watch("cookTime");

  const totalTime = useMemo(() => {
    const prep = parseFloat(prepTime) || 0;
    const cook = parseFloat(cookTime) || 0;
    return prep + cook;
  }, [prepTime, cookTime]);

  useEffect(() => {
    setValue("totalTime", String(totalTime));
  }, [totalTime]);

  /* Ingredients */
  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const firstIngredientError = errors.ingredients?.find(
    (item) => item?.name?.message || item?.quantity?.message
  );
  console.log("imported recipe", importedRecipe);
  /* Steps */
  const {
    fields: stepFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const firstStepError = errors.steps?.find(
    (item) => item?.instruction?.message
  );

  const { mutate: submitRecipe, isPending } = useMutation({
    mutationFn: async (data) => {
      try {
        console.log("👣 Calling createAndGetRecipe...");
        const result = await createAndGetRecipe(data, user.id);
        console.log("✅ Done with createAndGetRecipe");
        return result;
      } catch (err) {
        console.error("❌ Mutation failed before reaching createRecipe:", err);
        throw err;
      }
    },
    onSuccess: (newRecipe) => {
      console.log("Recipe created!", newRecipe);
      queryClient.invalidateQueries({ queryKey: ["recipes", user.id] }); // refetch all recipes
      router.push("/");
    },
    onError: (err) => {
      console.error("Recipe creation failed:", err);
    },
  });

  const onSubmit = (data) => {
    try {
      // Validate with Zod
      RecipeSchema.parse(data);
      // Mutate
      submitRecipe(data);
    } catch (e) {
      if (e instanceof z.ZodError) {
        Alert.alert("Create recipe form error: ", e);
      }
    }
  };

  return (
    <SafeScreen paddingHorizontal>
      <Header
        title="Create Recipe"
        showBackButton
        isDirty={isDirty}
        showImport={true}></Header>
      {/* <Btn
        title="IMPORT RECIPE"
        onPress={() => router.push("import-recipe")}></Btn> */}
      <ScrollView
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}>
        {/*Basic Info Section */}
        <View>
          {importedRecipe && (
            <>
              <ThemedText>
                Imported successfully! Feel free to make changing before
                submitting.
              </ThemedText>
              <Image
                style={styles.tinyImage}
                source={importedRecipe.image}></Image>
            </>
          )}
          <SubHeader>Basic Info</SubHeader>

          <InputField
            name="name"
            control={control}
            label="Recipe Name"
            placeholder="e.g. Banana Bread"
            error={errors?.name}
          />
          <InputField
            name="description"
            control={control}
            label="Description"
            placeholder="Optional description"
            style={{ textAlignVertical: "top", minHeight: verticalScale(100) }}
            multiline={true}
            numberOfLines={5}
            maxLength={255}
          />
          {/* Tags */}
          <View style={{ paddingBottom: spacingY._10 }}>
            <ThemedText style={FONTS.label}>Select tag(s)</ThemedText>
            <TagSelector control={control} />
          </View>

          {/* Times */}

          {errors.totalTime && (
            <Text style={[FONTS.labelSemi, { color: theme.danger }]}>
              {errors.totalTime.message}
            </Text>
          )}
          <View style={styles.timesContainer}>
            <InputField
              name="prepTime"
              control={control}
              label="Prep Time (min)"
              keyboardType="numeric"
              placeholder=""></InputField>
            <InputField
              name="cookTime"
              control={control}
              label="Cook Time (min)"
              keyboardType="numeric"
              placeholder=""></InputField>
            <InputField
              name="totalTime"
              control={control}
              label="Total Time (min)"
              placeholder=""
              readOnly
              hideError></InputField>
          </View>
        </View>
        {/* Ingredients */}
        <RenderSection
          title="Ingredients"
          error={
            firstIngredientError?.name?.message ||
            firstIngredientError?.quantity?.message
          }
          textStyle={{ color: theme.danger }}>
          <View>
            {ingredientFields.map((field, index) => (
              <View key={field.id}>
                <IngredientRow
                  field={field}
                  index={index}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  removeFn={removeIngredient}
                  fieldsLength={ingredientFields.length}
                />
              </View>
            ))}
            <Btn
              title="+ Add Ingredient"
              onPress={() => addIngredient({ name: "", quantity: "" })}
              style={{
                backgroundColor: theme.secondary,
                marginVertical: spacingY._10,
              }}
              textStyle={{ color: theme.onSecondary }}></Btn>
          </View>
        </RenderSection>
        {/* Steps */}

        <RenderSection
          title="Steps"
          error={firstStepError?.instruction?.message}
          textStyle={{ color: theme.danger }}>
          <View>
            {stepFields.map((field, index) => (
              <View key={field.id}>
                <StepRow
                  field={field}
                  index={index}
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  removeFn={removeStep}
                  fieldsLength={stepFields.length}
                />
              </View>
            ))}

            <Btn
              title="+ Add Step"
              onPress={() => addStep({ instruction: "" })}
              style={{
                backgroundColor: theme.secondary,
                marginVertical: spacingY._10,
              }}
              textStyle={{ color: theme.onSecondary }}></Btn>
          </View>
        </RenderSection>

        <Btn title={"Save Recipe"} onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeScreen>
  );
};

export default CreateRecipeScreen;

const styles = StyleSheet.create({
  timesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
