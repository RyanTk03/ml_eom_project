import z from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(80, "Project name is too long"),
  repoName: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._-]*$/,
      "Only letters, numbers, dots, underscores and hyphens are allowed"
    )
    .optional()
    .or(z.literal("")),
  org: z.string().trim().max(60).optional().or(z.literal("")),
  private: z.boolean(),
  description: z.string().trim().max(300, "Max 300 characters").optional(),
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
