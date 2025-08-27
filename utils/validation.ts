// utils/validation/recipeSchema.ts
import { z } from "zod";

// Step schema with conditional logic
const StepSchema = z
  .object({
    step_number: z.number().optional(),
    section_title: z.string().optional(),
    instruction: z
      .string()
      .min(3, { message: "Please type more than 3 characters!" }),
  })
  .refine(
    (step) => {
      const hasAny = step.section_title?.trim() || step.instruction?.trim();
      const hasInstruction = !!step.instruction?.trim();
      return !hasAny || hasInstruction;
    },
    {
      message: "Instruction required if section has content.",
    }
  );

// Full recipe schema
export const RecipeSchema = z.object({
  name: z
    .string()
    .min(1, { message: "* Enter a recipe name" })
    .max(100, { message: "Recipe name is too long." }),
  description: z
    .string()
    .max(500, { message: "Description is too long." })
    .optional(),
  // sourceUrl: z.string().url({ message: "Invalid URL." }).optional(),
  sourceName: z
    .string()
    .max(50, { message: "Author name is too long." })
    .optional(),
  sourceUrl: z.string().optional(),
  imageUrl: z.url().optional(),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, { error: "* Missing ingredient name" }),
        quantity: z.string().min(1, { error: "* Missing quantity" }),
      })
    )
    .min(1, { error: "At least one ingredient is required." }),

  steps: z
    .array(StepSchema)
    .min(1, { message: "At least one step is required." }),

  prepTime: z.coerce.number().nonnegative().optional(),

  cookTime: z.coerce.number().nonnegative().optional(),

  totalTime: z.coerce
    .number()
    .min(1, { error: "* Enter cook and/or prep time" }),
  tags: z.array(z.string()).default(["other"]).optional(),

  // sourceInfo: z.boolean().optional(),
});

// You can also export the type if needed:
export type RecipeFormData = z.infer<typeof RecipeSchema>;
