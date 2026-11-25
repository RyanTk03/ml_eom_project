"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Layers,
  Plus,
  Search,
  FolderGit2,
  GitBranch,
  Lock,
  Globe,
  User,
  ArrowUpRight,
  RefreshCw,
  Activity,
} from "lucide-react";
import { Loader } from "@/components/Loader";
import type { Project } from "@ml-eom/shared-types/database-schema";
import { userDashboardLinks } from "@/libs/links";
import { listProjects } from "@/api/endpoints/my-project";

function getProjectSlug(project: Project, index: number): string {
  return (
    project.repoId ||
    project.repoName ||
    `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<
    "ALL" | "PRIVATE" | "PUBLIC"
  >("ALL");

  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: listProjects,
  });

  const filteredProjects = useMemo(() => {
    return response?.data?.data?.projects.filter((project) => {
      const q = search.toLowerCase();
      const matchesQuery =
        project.name.toLowerCase().includes(q) ||
        (project.repoName?.toLowerCase().includes(q) ?? false) ||
        (project.org?.toLowerCase().includes(q) ?? false) ||
        project.createdBy.toLowerCase().includes(q) ||
        (project.description?.toLowerCase().includes(q) ?? false);

      const matchesVisibility =
        visibilityFilter === "ALL" ||
        (visibilityFilter === "PRIVATE" && Boolean(project.private)) ||
        (visibilityFilter === "PUBLIC" && !project.private);

      return matchesQuery && matchesVisibility;
    }) ?? [];
  }, [response, search, visibilityFilter]);

  const privateCount = response?.data.data.projects.filter((p) => Boolean(p.private)).length;
  const publicCount = (response?.data.data.projects.length ?? privateCount ?? 0) - (privateCount ?? 0);

  return (
    <div className="min-h-screen bg-canvas bg-telemetry-grid relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-accent/10 blur-[120px]" />

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-subtle/80 bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/40 text-accent">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-mono text-base font-bold tracking-tight">
                MODEL<span className="text-accent">FORGE</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block text-subtle">/</span>
            <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-secondary">
              Projects
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-2 font-mono text-xs text-secondary hover:text-primary hover:bg-elevated transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isFetching ? "animate-spin text-accent" : ""}`}
              />
              <span>Refresh</span>
            </button>
            <Link
              href={userDashboardLinks.createProjects}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <Plus className="h-4 w-4" />
              <span>New Project</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 relative z-10 space-y-8">
        {/* Header & Stats */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-3 py-1 font-mono text-xs text-accent mb-3">
              <Activity className="h-3.5 w-3.5" />
              <span>MULTI-PROJECT GOVERNANCE</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-1 text-sm text-secondary">
              Standardized ML repositories, shared CI/CD workflows, and governance policies.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="rounded-xl border border-subtle bg-surface px-4 py-3">
              <div className="text-[11px] text-muted">TOTAL</div>
              <div className="text-lg font-bold text-primary">
                {response?.data.data.projects.length ?? 0}
              </div>
            </div>
            <div className="rounded-xl border border-subtle bg-surface px-4 py-3">
              <div className="text-[11px] text-muted">PRIVATE</div>
              <div className="text-lg font-bold text-accent">{privateCount}</div>
            </div>
            <div className="rounded-xl border border-subtle bg-surface px-4 py-3">
              <div className="text-[11px] text-muted">PUBLIC</div>
              <div className="text-lg font-bold text-status-healthy">
                {publicCount}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Visibility Filter */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, repo, org, or author..."
              className="w-full rounded-lg border border-subtle bg-surface pl-10 pr-4 py-2 text-sm font-mono text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div className="flex gap-2 font-mono text-xs">
            {(["ALL", "PRIVATE", "PUBLIC"] as const).map((mode) => {
              const active = visibilityFilter === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setVisibilityFilter(mode)}
                  className={`rounded-lg border px-3 py-1.5 transition-colors ${
                    active
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-subtle bg-surface text-secondary hover:text-primary"
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <Loader variant="card" label="Loading projects..." />
        ) : isError ? (
          <div className="rounded-xl border border-status-critical/40 bg-surface p-6 text-center space-y-3">
            <p className="font-mono text-sm text-status-critical">
              Unable to fetch projects.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border border-subtle bg-elevated px-4 py-2 font-mono text-xs text-primary hover:border-accent"
            >
              Retry
            </button>
          </div>
        ) : filteredProjects?.length === 0 ? (
          <div className="rounded-xl border border-subtle bg-surface p-10 text-center space-y-2">
            <p className="font-mono text-sm text-secondary">
              No matching project found.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setVisibilityFilter("ALL");
              }}
              className="font-mono text-xs text-accent hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredProjects?.map((project, index) => {
              const slug = getProjectSlug(project, index);
              const isPrivate = Boolean(project.private);

              return (
                <Link
                  key={slug}
                  href={`/projects/${encodeURIComponent(slug)}`}
                  className="group rounded-xl border border-subtle bg-surface p-5 hover:border-accent/50 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-subtle bg-canvas text-accent group-hover:border-accent/40 transition-colors">
                          <FolderGit2 className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <h2 className="font-semibold text-base text-primary truncate group-hover:text-accent transition-colors">
                            {project.name}
                          </h2>
                          <div className="flex items-center gap-1.5 font-mono text-xs text-muted truncate">
                            <GitBranch className="h-3 w-3 shrink-0" />
                            <span className="truncate">
                              {project.org ? `${project.org}/` : ""}
                              {project.repoName || "unlinked-repo"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] shrink-0 ${
                          isPrivate
                            ? "border-subtle bg-elevated text-secondary"
                            : "border-status-healthy/30 bg-status-healthy/10 text-status-healthy"
                        }`}
                      >
                        {isPrivate ? (
                          <>
                            <Lock className="h-3 w-3" /> PRIVATE
                          </>
                        ) : (
                          <>
                            <Globe className="h-3 w-3" /> PUBLIC
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-secondary line-clamp-2 leading-relaxed">
                      {project.description ||
                        "No description provided for this ML project."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-subtle/70 pt-3 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <User className="h-3.5 w-3.5 text-secondary shrink-0" />
                      <span className="truncate">{project.createdBy}</span>
                      {project.repoId && (
                        <span className="text-subtle">• {project.repoId}</span>
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1 group-hover:text-accent shrink-0 transition-colors">
                      <span>Open</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
