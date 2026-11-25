"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Layers,
  ArrowLeft,
  ArrowRight,
  FolderGit2,
  GitBranch,
  Building2,
  Lock,
  Globe,
  FileText,
} from "lucide-react";
import { FormField } from "@/components/FormField";
import { Loader } from "@/components/Loader";
import { createProjectSchema, CreateProjectValues } from "@/validations/new-project-form";
import { userDashboardLinks } from "@/libs/links";
import { createProject } from "@/api/endpoints/my-project";

export default function NewProjectPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      repoName: "",
      org: "",
      private: true,
      description: "",
    },
  });

  const isPrivate = watch("private");

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/projects");
    },
  });

  const onSubmit = (data: CreateProjectValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-canvas bg-telemetry-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-accent/10 blur-[120px]" />

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-subtle/80 bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/40 text-accent">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-mono text-base font-bold tracking-tight">
                MODEL<span className="text-accent">FORGE</span>
              </span>
            </Link>
            <span className="text-subtle">/</span>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-wider text-secondary hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <span className="text-subtle">/</span>
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              New
            </span>
          </div>

          <Link
            href={userDashboardLinks.viewProjects}
            className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-1.5 font-mono text-xs text-secondary hover:text-primary hover:bg-elevated transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 relative z-10">
        <div className="mb-8">
          <span className="inline-block rounded-full border border-subtle bg-surface px-3 py-1 font-mono text-xs text-accent mb-3">
            PROJECT SCAFFOLDING
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Create a new ML project
          </h1>
          <p className="mt-1 text-sm text-secondary">
            Initialize a standardized repository with MLflow tracking, DVC lineage, and CML governance gates.
          </p>
        </div>

        <div className="rounded-2xl border border-subtle bg-surface p-8 shadow-2xl backdrop-blur">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Project Name */}
            <div>
              <FormField
                id="name"
                label="Project Name *"
                type="text"
                placeholder="Fraud Scoring Tabular"
                icon={FolderGit2}
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            {/* Org & Repo Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FormField
                  id="org"
                  label="GitHub Organization"
                  type="text"
                  placeholder="modelforge-org"
                  icon={Building2}
                  error={errors.org?.message}
                  {...register("org")}
                />
              </div>

              <div>
                <FormField
                  id="repoName"
                  label="Repository Name"
                  type="text"
                  placeholder="fraud-scoring-tabular"
                  icon={GitBranch}
                  error={errors.repoName?.message}
                  {...register("repoName")}
                />
              </div>
            </div>

            {/* Visibility Selector */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-secondary mb-2">
                Repository Visibility
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setValue("private", true)}
                  className={`flex items-center gap-3 rounded-lg border p-3.5 text-left transition-all ${
                    isPrivate
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-subtle bg-canvas text-secondary hover:border-subtle/80"
                  }`}
                >
                  <Lock
                    className={`h-4 w-4 shrink-0 ${
                      isPrivate ? "text-accent" : "text-muted"
                    }`}
                  />
                  <div>
                    <div className="font-mono text-xs font-semibold">PRIVATE</div>
                    <div className="text-[11px] text-muted">
                      Restricted to organization
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setValue("private", false)}
                  className={`flex items-center gap-3 rounded-lg border p-3.5 text-left transition-all ${
                    !isPrivate
                      ? "border-accent bg-accent/10 text-primary"
                      : "border-subtle bg-canvas text-secondary hover:border-subtle/80"
                  }`}
                >
                  <Globe
                    className={`h-4 w-4 shrink-0 ${
                      !isPrivate ? "text-accent" : "text-muted"
                    }`}
                  />
                  <div>
                    <div className="font-mono text-xs font-semibold">PUBLIC</div>
                    <div className="text-[11px] text-muted">
                      Visible to anyone
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-secondary mb-2"
              >
                <FileText className="h-3.5 w-3.5 text-muted" />
                <span>Description</span>
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Briefly describe the ML problem, dataset, and deployment target..."
                {...register("description")}
                className="w-full rounded-lg border border-subtle bg-canvas px-3.5 py-2.5 text-sm font-mono text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none"
              />
              {errors.description && (
                <p className="mt-1 text-xs font-mono text-status-critical">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Mutation Error */}
            {mutation.isError && (
              <div className="rounded-lg border border-status-critical/40 bg-status-critical/10 px-4 py-3 font-mono text-xs text-status-critical">
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "An unexpected error occurred."}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-subtle">
              <Link
                href="/projects"
                className="rounded-lg border border-subtle bg-canvas px-4 py-2.5 font-mono text-xs text-secondary hover:text-primary transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader variant="inline" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Create Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
