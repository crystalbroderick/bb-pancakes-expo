import { Btn } from "@/components/buttons";
import Header from "@/components/common/Header";
import {
  IngredientRow,
  InputField,
  RenderSection,
  StepRow,
  TagSelector,
} from "@/components/forms";
import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/theme/ThemedText";
import { FONTS, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { getRecipe, updateRecipe } from "@/services/recipeService";
import { verticalScale } from "@/utils/styling";
import { RecipeSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Loading from "../../components/common/Loading";
import SubHeader from "../../components/common/SubHeader";

const EditRecipeScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const fallbackData = queryClient.getQueryData(["recipe", id]);
  const { data: existingRecipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
    initialData: fallbackData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RecipeSchema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (existingRecipe) {
      reset(existingRecipe);
    }
  }, [existingRecipe, reset]);

  // Time calc
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

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });
  const firstIngredientError = errors.ingredients?.find(
    (item) => item?.name?.message || item?.quantity?.message
  );
  const firstStepError = errors.steps?.find(
    (item) => item?.instruction?.message
  );

  const { mutateAsync: updateRecipeMutation, isPending } = useMutation({
    mutationFn: (data) => updateRecipe(data, id, user.user_id),
    onSuccess: () => {
      console.log("✅ Recipe updated!");
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
      queryClient.invalidateQueries({ queryKey: ["recipes", user.id] });
      router.back();
    },
    onError: (err) => {
      console.error("❌ Recipe update failed:", err);
    },
  });

  const onSubmit = async (data) => {
    /* TODO: update only on change */
    // if (infoChanged) await updateRecipeInfo(recipeId, updatedInfo);
    // if (ingredientsChanged) await updateIngredients(recipeId, newIngredients);
    // if (stepsChanged) await updateSteps(recipeId, newSteps);
    try {
      RecipeSchema.parse(data); // validation
      await updateRecipeMutation(data); // async mutation
      console.log("✅ Done");
    } catch (err) {
      console.error("❌ Failed to update:", err);
    }
  };

  if (isLoading || !existingRecipe)
    return (
      <Loading loading={isLoading} loadingText="Loading recipe.."></Loading>
    );

  return (
    <SafeScreen paddingHorizontal>
      <Header title="Edit Recipe" showBackButton />
      <ScrollView
        contentContainerStyle={{ gap: 10 }}
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: spacingY._05 }}>
          <SubHeader>Basic Info</SubHeader>

          {/* Basic Info */}
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
            multiline
            numberOfLines={5}
            maxLength={255}
            style={{
              textAlignVertical: "top",
              minHeight: verticalScale(100),
            }}
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
              label="Prep Time"
              keyboardType="numeric"
              placeholder=""
              style={{ flex: 1 }}
            />
            <InputField
              name="cookTime"
              control={control}
              label="Cook Time"
              keyboardType="numeric"
              placeholder=""
              style={{ flex: 1 }}
            />
            <InputField
              name="totalTime"
              control={control}
              label="Total Time"
              readOnly
              hideError
              style={{ flex: 1 }}
            />
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
          {ingredientFields.map((field, index) => (
            <IngredientRow
              key={field.id}
              field={field}
              index={index}
              control={control}
              errors={errors}
              setValue={setValue}
              removeFn={removeIngredient}
              fieldsLength={ingredientFields.length}
            />
          ))}
          <Btn
            title="+ Add Ingredient"
            onPress={() => addIngredient({ name: "", quantity: "" })}
            style={{
              backgroundColor: theme.secondary,
              marginVertical: spacingY._10,
            }}
            textStyle={{ color: theme.onSecondary }}
          />
        </RenderSection>

        {/* Steps */}
        <RenderSection
          title="Steps"
          error={firstStepError?.instruction?.message}
          textStyle={{ color: theme.danger }}>
          {stepFields.map((field, index) => (
            <StepRow
              key={field.id}
              field={field}
              index={index}
              control={control}
              errors={errors}
              setValue={setValue}
              removeFn={removeStep}
              fieldsLength={stepFields.length}
            />
          ))}
          <Btn
            title="+ Add Step"
            onPress={() => addStep({ instruction: "" })}
            style={{
              backgroundColor: theme.secondary,
              marginVertical: spacingY._10,
            }}
            textStyle={{ color: theme.onSecondary }}
          />
        </RenderSection>

        <Btn
          title="Save Changes"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        />
      </ScrollView>
    </SafeScreen>
  );
};

export default EditRecipeScreen;

const styles = StyleSheet.create({
  timesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
});
