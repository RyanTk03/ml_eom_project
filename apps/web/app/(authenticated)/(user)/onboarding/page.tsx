"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, ArrowRight, User } from "lucide-react";
import { FormField } from "@/components/FormField";
import { Loader } from "@/components/Loader";
import { type OnboardingFormValues, onboardingSchema } from "@/validations/onboarding-form";
import { updateUser } from "@/api/endpoints/user";
import { userDashboardLinks } from "@/libs/links";

export default function OnboardingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    const userResponse = await updateUser(data);

    if (userResponse.data.data.user) {
      return navigation.navigate(userDashboardLinks.viewProjects);
    }
  };

  return (
    <div className="min-h-screen bg-canvas bg-telemetry-grid flex flex-col justify-center py-12 px-6 relative overflow-hidden">
      {/* Halo lumineux supérieur */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 border border-accent/40 text-accent group-hover:bg-accent/25 transition-all">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-mono text-xl font-bold tracking-tight text-primary">
              MODEL<span className="text-accent">FORGE</span>
            </span>
          </Link>
        </div>

        <div className="flex justify-center mb-3">
          <span className="rounded-full border border-subtle bg-surface px-3 py-1 font-mono text-xs text-accent">
            LAST STEP • PROFILE SETUP
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold tracking-tight text-primary">
          Complete your profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="rounded-2xl border border-subtle bg-surface p-8 shadow-2xl backdrop-blur">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormField
                id="firstname"
                label="First Name"
                type="text"
                placeholder="Rayane"
                autoComplete="given-name"
                icon={User}
                error={errors.firstName?.message}
                {...register("firstName")}
              />
            </div>

            <div>
              <FormField
                id="lastname"
                label="Last Name"
                type="text"
                placeholder="Mansouri"
                autoComplete="family-name"
                icon={User}
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader variant="inline" />
                    <span>Saving profile...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Workspace</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
