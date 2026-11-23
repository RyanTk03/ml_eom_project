"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight, Lock, Mail, Terminal } from "lucide-react";
import { FormField } from "@/components/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginValidationSchema } from "@/validations/login-form";
import { login } from "@/api/endpoints/auth";
import { redirect } from "next/navigation";
import { userDashboardLinks } from "@/libs/links";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const resp = await login(data);

    if (resp.data) {
      localStorage.setItem("access_token", resp.data.data.access_token);
      redirect(userDashboardLinks.viewProjects);
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
          Sign in to your control plane
        </h2>
        <p className="mt-2 text-center text-sm font-mono text-secondary">
          Or{" "}
          <Link href="/register" className="text-accent hover:underline underline-offset-4">
            create a new organization workspace
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="rounded-2xl border border-subtle bg-surface p-8 shadow-2xl backdrop-blur">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              id="email"
              label="Work Email"
              type="email"
              placeholder="engineer@company.ml"
              autoComplete="email"
              icon={Mail}
              {...register('email')}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••••••"
              autoComplete="current-password"
              icon={Lock}
              rightElement={
                <Link href="/auth/forgot-password" className="text-xs font-mono text-accent hover:underline">
                  Forgot password?
                </Link>
              }
              {...register("password")}
            />

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Authenticate
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-subtle pt-6">
            <div className="rounded-lg border border-subtle bg-canvas p-3 font-mono text-xs text-secondary flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent" />
                Or login via CLI
              </span>
              <span className="text-muted">mf login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
