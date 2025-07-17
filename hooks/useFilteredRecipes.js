import { useMemo } from "react";
export function useFilteredRecipes(
  recipes = [],
  { searchTerm, selectedTags, sortBy }
) {
  return useMemo(() => {
    const requiredTags = ["vegetarian", "vegan"];

    return recipes
      .filter((recipe) => {
        // Text search
        const matchSearch =
          !searchTerm ||
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchTerm.toLowerCase())
          );

        // Extract required and optional tags from selected
        const selectedRequiredTags = selectedTags.filter((tag) =>
          requiredTags.includes(tag)
        );
        const optionalTags = selectedTags.filter(
          (tag) => !requiredTags.includes(tag)
        );

        // Must match all required tags
        const matchesRequiredTags = selectedRequiredTags.every((tag) =>
          recipe.tags.includes(tag)
        );

        // Must match at least one optional tag, if any are selected
        const matchesOptionalTags =
          optionalTags.length === 0 ||
          optionalTags.some((tag) => recipe.tags.includes(tag));

        const matchTags = matchesRequiredTags && matchesOptionalTags;

        return matchSearch && matchTags;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === "favorites") {
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        } else if (sortBy === "mostMade") {
          return b.madeCount - a.madeCount;
        }
        return 0;
      });
  }, [recipes, searchTerm, selectedTags, sortBy]);
}
