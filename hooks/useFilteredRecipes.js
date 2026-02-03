import { useMemo } from "react";

export function useFilteredRecipes(
  recipes = [],
  { searchTerm, selectedTags, sortBy }
) {
  return useMemo(() => {
    const requiredTags = ["vegetarian", "vegan"];

    return recipes
      .map((recipe) => {
        const searchWords = searchTerm
          .toLowerCase()
          .split(" ")
          .filter((w) => w);

        // Title match includes plurals
        const inTitle = searchWords.some((word) => {
          const w = word.toLowerCase();
          const titleWords = recipe.name?.toLowerCase().split(" ") || [];
          return titleWords.some((tw) => w.startsWith(tw) || tw.startsWith(w));
        });

        // Count matching ingredients
        const matchedIngredients =
          recipe.ingredients?.filter((ing) => {
            const text = typeof ing === "string" ? ing : ing?.name;
            const ingredientWords = text?.toLowerCase().split(" ") || [];
            // includes plurals for insensitive matching
            return searchWords.some((w) =>
              ingredientWords.some((iw) => w.startsWith(iw) || iw.startsWith(w))
            );
          }) || [];

        const matchCount = matchedIngredients.length;

        const matchSearch =
          searchWords.length === 0 || inTitle || matchCount > 0;

        // Tag filtering
        const selectedRequiredTags = selectedTags.filter((tag) =>
          requiredTags.includes(tag)
        );
        const optionalTags = selectedTags.filter(
          (tag) => !requiredTags.includes(tag)
        );

        const matchesRequiredTags = selectedRequiredTags.every((tag) =>
          recipe.tags.includes(tag)
        );

        const matchesOptionalTags =
          optionalTags.length === 0 ||
          optionalTags.some((tag) => recipe.tags.includes(tag));

        const matchTags = matchesRequiredTags && matchesOptionalTags;

        if (matchSearch && matchTags) {
          return {
            ...recipe,
            matchCount, // ✅ Add match count to recipe
          };
        }

        return null;
      })
      .filter(Boolean) // remove nulls
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === "favorites") {
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        } else if (sortBy === "mostMade") {
          return b.madeCount - a.madeCount;
        } else if (sortBy === "quickest") {
          return a.total_time - b.total_time;
        } else if (sortBy === "longest") {
          return b.total_time - a.total_time;
        } else if (sortBy === "alphabetical") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [recipes, searchTerm, selectedTags, sortBy]);
}
