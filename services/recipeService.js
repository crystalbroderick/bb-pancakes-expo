import { supabase } from "@/utils/supabase";
/* READ RECIPE(S) */
// fetch full recipe, including ingredients and steps
export const getRecipe = async (id) => {
  console.log("getting recipe from supabase..", Date.now());

  const { data, error } = await supabase
    .from("recipes")
    .select(
      `
      *,
      recipe_ingredients (*),
      recipe_steps (*)
    `
    )
    .eq("recipe_id", id)
    .single();
  if (error) throw error;

  // transform supabase keys into ingredients and steps (not recipe_ingredients, etc.)
  return {
    ...data,
    prepTime: String(data.prep_time ?? ""),
    cookTime: String(data.cook_time ?? ""),
    totalTime: Number(data.total_time ?? 0),
    ingredients: data.recipe_ingredients || [],
    steps: data.recipe_steps || [],
  };
};

// fetch basic info for list: name, id, totalTime, favorite, tags + ingredient names for search
export const getAllRecipes = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(
        `
        *,
        recipe_ingredients (name),
        user_favorites (
          profile_id
        )
      `
      )
      .eq("user_id", userId) // only fetch user recipes
      .filter("user_favorites.profile_id", "eq", userId) // only auth favorites
      .order("created_at", { ascending: false });

    if (error) throw error;

    const recipes = data.map((recipe) => ({
      ...recipe,
      ingredients: recipe.recipe_ingredients || [],
      isFavorite:
        Array.isArray(recipe.user_favorites) &&
        recipe.user_favorites.length > 0,
    }));

    return recipes;
  } catch (error) {
    console.error("getAllRecipes error:", error);
    throw error;
  }
};

/* CREATE RECIPES */
// Insert all new recipe details without refetching
export const createRecipe = async (data, userId) => {
  try {
    console.log("➡️ Creating recipe basics...");
    const recipe = await addRecipeBasics(data, userId);

    console.log("✅ Recipe basics added:", recipe);
    console.log("➡️ Adding ingredients...");
    await addIngredients(recipe.recipe_id, data.ingredients);

    console.log("✅ Ingredients added");
    console.log("➡️ Adding steps...");
    await addSteps(recipe.recipe_id, data.steps);

    console.log("✅ Steps added. Returning ID");
    return recipe.recipe_id;
  } catch (error) {
    console.error("❌ Error in createRecipe:", error);
    throw error;
  }
};

export const createAndGetRecipe = async (data, userId) => {
  const recipeId = await createRecipe(data, userId);
  const recipe = await getRecipe(recipeId);
  console.log("createAndGetRecipe -> recipe ID -> ", recipeId);
  console.log("createAndGetRecipe -> full recipe -> ", recipe);
  return recipe; // Return full recipe object
};

// Basic information
export const addRecipeBasics = async (data, userId) => {
  if (!userId) throw new Error("User not authenticated");

  console.log("attempting to post recipe, ", data, " for user: ", userId); //THIS IS ONLY LOG BEFORE onSuccess mutation
  try {
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .insert([
        {
          name: data.name,
          user_id: userId,
          description: data.description,
          prep_time: data.prepTime,
          cook_time: data.cookTime,
          total_time: data.totalTime,
          tags: data.tags || ["other"],
          source_url: data.sourceUrl,
          source_name: data.sourceName,
          image_url: data.imageUrl,
        },
      ])
      .select()
      .single(); // get back the new recipe

    if (recipeError) throw recipeError;

    const recipeId = recipeData?.recipe_id;
    if (!recipeId) {
      throw new Error("Recipe ID not found after insertion.");
    }
    console.log("inserted data into database: ", recipeData);
    return recipeData;
  } catch (err) {
    throw new Error("Unexpected error during creating recipe.");
  }
};

// Ingredients
export const addIngredients = async (recipeId, ingredients) => {
  try {
    const toInsert = ingredients.map((i) => ({
      recipe_id: recipeId,
      name: i.name,
      quantity: i.quantity,
    }));
    const { error } = await supabase
      .from("recipe_ingredients")
      .insert(toInsert);
    if (error) throw error;
    console.log("🟢 Ingredients inserted!");
  } catch (err) {
    console.error("❌ Error inserting ingredients:", err);
    throw err;
  }
};

// Steps
export const addSteps = async (recipeId, steps) => {
  const insertData = steps.map((step, index) => ({
    recipe_id: recipeId,
    step_number: index + 1,
    instruction: step.instruction,
  }));
  const { error } = await supabase.from("recipe_steps").insert(insertData);
  if (error) throw error;
};

export const createFavorite = async (favorite) => {
  console.log("create favorite");
  try {
    const { data, error } = await supabase
      .from("user_favorites")
      .insert(favorite)
      .select()
      .single();

    console.log("create recipe favorite: ", favorite);

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.log("createRecipeFavorite error: ", error);
    throw error; // Allow caller to handle it
  }
};
/* UPDATE RECIPES */
export const updateRecipe = async (data, recipeId, userId) => {
  console.log("inside update recipe");
  try {
    console.log("➡️ Updating recipe basics...");
    await updateBasicInfo(data, recipeId, userId);

    console.log("✅ Basics updated");
    console.log("➡️ Updating ingredients...");
    await updateIngredients(recipeId, data.ingredients);

    console.log("✅ Ingredients updated");
    console.log("➡️ Updating steps...");
    await updateSteps(recipeId, data.steps);

    console.log("✅ All updates complete");
  } catch (error) {
    console.error("❌ Error updating full recipe:", error);
    throw error;
  }
};

// Basic information
export const updateBasicInfo = async (data, recipeId, userId) => {
  const { error } = await supabase
    .from("recipes")
    .update({
      name: data.name,
      user_id: userId,
      description: data.description,
      prep_time: data.prepTime,
      cook_time: data.cookTime,
      total_time: data.totalTime,
      tags: data.tags || ["other"],
      recipe_id: recipeId,
    })
    .eq("recipe_id", recipeId);

  if (error) throw error;
};

// Ingredients
export const updateIngredients = async (recipeId, ingredients) => {
  const ingredientsToUpsert = ingredients.map((ingredient) => ({
    recipe_id: recipeId,
    name: ingredient.name,
    quantity: ingredient.quantity,
  }));

  const { error } = await supabase
    .from("recipe_ingredients")
    .upsert(ingredientsToUpsert, {
      onConflict: ["recipe_id", "name"],
    });

  if (error) throw error;
};

// Steps
export const updateSteps = async (recipeId, steps) => {
  const stepsToUpsert = steps.map((step, index) => ({
    recipe_id: recipeId,
    step_number: index + 1,
    instruction: step.instruction,
  }));

  const { error } = await supabase.from("recipe_steps").upsert(stepsToUpsert, {
    onConflict: ["recipe_id", "step_number"],
  });

  if (error) throw error;
};

/* DELETE */
export const deleteFavorite = async ({ profile_id, recipe_id }) => {
  try {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("recipe_id", recipe_id);

    console.log("delete favorite:", profile_id, recipe_id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("delete favorite error:", error);
    throw error;
  }
};

export const deleteRecipe = async (recipeId) => {
  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("recipe_id", recipeId);

  if (error) throw error;
};
