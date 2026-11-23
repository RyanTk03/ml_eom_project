"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, ArrowRight, Lock, Mail, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/FormField";
import { RegisterFormValues, registerValidationSchema } from "@/validations/register-form";
import { register as authRegister } from "@/api/endpoints/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidationSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const resp = await authRegister(data);

    if (resp.data) {
      console.log(resp.data);
    }
  };

  return (
    <div className="min-h-screen bg-canvas bg-telemetry-grid flex flex-col justify-center py-12 px-6 relative overflow-hidden">
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

        <h2 className="text-center text-2xl font-bold tracking-tight text-primary">
          Create your free workspace
        </h2>
        <p className="mt-2 text-center text-sm font-mono text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="rounded-2xl border border-subtle bg-surface p-8 shadow-2xl backdrop-blur">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <FormField
                id="email"
                label="Work Email"
                type="email"
                placeholder="engineer@company.ml"
                autoComplete="email"
                icon={Mail}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div>
              <FormField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="new-password"
                icon={Lock}
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div>
              <FormField
                id="confirm-password"
                label="Confirm Password"
                type="password"
                placeholder="••••••••••••"
                autoComplete="new-password"
                icon={Lock}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? "Initializing..." : "Initialize Workspace"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-subtle pt-6 space-y-2.5 font-mono text-xs text-secondary">
            <div className="flex items-center gap-2 text-muted">
              <CheckCircle2 className="h-4 w-4 text-status-healthy shrink-0" />
              <span>Free tier: up to 3 projects & 5 team members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
