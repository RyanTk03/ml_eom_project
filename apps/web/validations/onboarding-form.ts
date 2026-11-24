import z from "zod";

export const onboardingSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters"),
  lastName: z
    .string()
    .trim()
    .min(3, "Last name must be at least 3 characters"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
