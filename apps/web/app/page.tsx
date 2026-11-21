import React from "react";
import {
  GitBranch,
  GitPullRequest,
  ShieldCheck,
  Layers,
  Terminal,
  ArrowRight,
  CheckCircle2,
  FolderGit2,
  Workflow,
  BarChart3,
  Lock,
  Sparkles,
  Box,
} from "lucide-react";
import Link from "next/link"
import { authLinks, userDashboardLinks } from "@/libs/links";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas bg-telemetry-grid relative overflow-hidden">
      {/* Halo lumineux supérieur */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[960px] rounded-full bg-accent/10 blur-[130px]" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-subtle/80 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 border border-accent/40 text-accent">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight">
              MODEL<span className="text-accent">FORGE</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-secondary">
            <a href="#templates" className="hover:text-primary transition-colors">
              Project Templates
            </a>
            <a href="#governance" className="hover:text-primary transition-colors">
              CI/CD Quality Gates
            </a>
            <a href="#hub" className="hover:text-primary transition-colors">
              Multi-Project Hub
            </a>
            <a href="#integrations" className="hover:text-primary transition-colors">
              Stack
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href={authLinks.login} className="hidden sm:inline-block text-sm text-secondary hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href={userDashboardLinks.createProjects} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              Start New Project
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            {/* Pitch SaaS */}
            <div className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-3.5 py-1.5 text-xs font-mono text-secondary">
                <span className="h-2 w-2 rounded-full bg-status-healthy animate-pulse" />
                <span>ML GOVERNANCE & OBSERVABILITY CONTROL PLANE</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.08]">
                Standardize, validate, and monitor every{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
                  ML repo at scale.
                </span>
              </h1>

              <p className="text-lg text-secondary leading-relaxed max-w-xl">
                Stop ML chaos across teams. Scaffold compliant repositories, enforce automated PR quality gates with CML & MLflow, and unify telemetry across all your models in one multi-project cockpit.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                  Create Organization
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-subtle bg-surface px-5 py-3.5 text-sm font-mono text-primary hover:bg-elevated transition-colors">
                  <Terminal className="h-4 w-4 text-accent" />
                  mf init --template=cv-prod
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-status-healthy" /> GitHub Actions & CML Native
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-status-healthy" /> Built-in MLflow & DVC Registry
                </span>
              </div>
            </div>

            {/* Aperçu Interactif : Multi-Project Governance Cockpit */}
            <div className="lg:col-span-6">
              <div className="rounded-xl border border-subtle bg-surface/95 p-5 shadow-2xl backdrop-blur">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-subtle pb-3.5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-status-critical/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-status-warning/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-status-healthy/80" />
                    <span className="ml-2 font-mono text-xs text-secondary">
                      org / ml-platform-cockpit
                    </span>
                  </div>
                  <span className="rounded bg-accent/10 border border-accent/30 px-2 py-0.5 font-mono text-[11px] text-accent">
                    3 ACTIVE PROJECTS
                  </span>
                </div>

                {/* Liste des Projets Standardisés */}
                <div className="space-y-2.5 mb-4">
                  {/* Projet 1 : Validé */}
                  <div className="flex items-center justify-between rounded-lg border border-subtle bg-canvas p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="h-4 w-4 text-accent" />
                        <span className="font-mono text-xs font-semibold text-primary">
                          fraud-scoring-tabular
                        </span>
                        <span className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-secondary">
                          v2.4.1
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-muted">
                        DVC: synced • F1: 0.942 • Latency: 11ms
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-status-healthy/10 border border-status-healthy/30 px-2.5 py-0.5 font-mono text-[11px] text-status-healthy">
                      <CheckCircle2 className="h-3 w-3" /> APPROVED
                    </span>
                  </div>

                  {/* Projet 2 : Bloqué par Quality Gate */}
                  <div className="flex items-center justify-between rounded-lg border border-status-warning/40 bg-canvas p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="h-4 w-4 text-status-warning" />
                        <span className="font-mono text-xs font-semibold text-primary">
                          nlp-ticket-router
                        </span>
                        <span className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-secondary">
                          PR #84
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-status-warning">
                        CML Gate: Drift PSI 0.24 &gt; 0.20 threshold
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-status-warning/10 border border-status-warning/30 px-2.5 py-0.5 font-mono text-[11px] text-status-warning">
                      <Lock className="h-3 w-3" /> GATE HOLD
                    </span>
                  </div>

                  {/* Projet 3 : Validé */}
                  <div className="flex items-center justify-between rounded-lg border border-subtle bg-canvas p-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FolderGit2 className="h-4 w-4 text-accent" />
                        <span className="font-mono text-xs font-semibold text-primary">
                          defect-vision-yolov8
                        </span>
                        <span className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-secondary">
                          v1.9.0
                        </span>
                      </div>
                      <div className="font-mono text-[11px] text-muted">
                        DVC: synced • mAP@50: 0.89 • FastAPI Pod: 4/4
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-status-healthy/10 border border-status-healthy/30 px-2.5 py-0.5 font-mono text-[11px] text-status-healthy">
                      <CheckCircle2 className="h-3 w-3" /> PROD LIVE
                    </span>
                  </div>
                </div>

                {/* Bandeau télémétrie agrégée */}
                <div className="grid grid-cols-3 gap-2.5 rounded-lg border border-subtle bg-elevated/60 p-3 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-muted">POLICY COMPLIANCE</div>
                    <div className="text-sm font-bold text-status-healthy">98.4%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted">SHARED WORKFLOWS</div>
                    <div className="text-sm font-bold text-primary">142 runs/d</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted">PROMETHEUS ALERTS</div>
                    <div className="text-sm font-bold text-accent">0 critical</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM BAR (Outils du cahier des charges) */}
        <section id="integrations" className="border-y border-subtle bg-surface/40 py-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                Orchestrating your open-source MLOps stack:
              </span>
              <div className="flex flex-wrap justify-center gap-3 font-mono text-xs text-secondary">
                {[
                  "GitHub Actions",
                  "MLflow",
                  "DVC",
                  "CML",
                  "Docker",
                  "FastAPI",
                  "Prometheus",
                  "Grafana",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-subtle bg-canvas px-3 py-1.5 text-primary/90"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 : PROJECT TEMPLATES & REUSABLE WORKFLOWS */}
        <section id="templates" className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                <Box className="h-3.5 w-3.5" /> STANDARDIZED SCAFFOLDING
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                One blueprint for every ML team.
              </h2>
              <p className="text-secondary leading-relaxed">
                Eliminate bespoke repo setups. Bootstrap production-ready projects pre-wired with DVC pipelines, MLflow tracking, FastAPI inference endpoints, and reusable GitHub Actions workflows.
              </p>
              <ul className="space-y-3 text-sm text-secondary pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Identical directory structure across Tabular, NLP & Vision repos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Centralized reusable CI/CD workflows updated from one source</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>Pre-configured Dockerfiles & Prometheus `/metrics` exporters</span>
                </li>
              </ul>
            </div>

            {/* Code / Repo Blueprint Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-subtle bg-surface p-5 font-mono text-xs shadow-xl">
                <div className="flex items-center justify-between border-b border-subtle pb-3 mb-4 text-muted">
                  <span>.github/workflows/ml-governance.yml</span>
                  <span className="text-status-healthy">Reusable Org Workflow</span>
                </div>
                <pre className="overflow-x-auto leading-relaxed text-secondary">
                  <code>
                    <span className="text-purple-400">name:</span> Standardized ML Validation{"\n"}
                    <span className="text-purple-400">on:</span> [pull_request]{"\n\n"}
                    <span className="text-purple-400">jobs:</span>{"\n"}
                    {"  "}<span className="text-sky-400">quality-gate:</span>{"\n"}
                    {"    "}<span className="text-purple-400">uses:</span> modelforge-org/shared-workflows/.github/workflows/cml-gate.yml@v2{"\n"}
                    {"    "}<span className="text-purple-400">with:</span>{"\n"}
                    {"      "}<span className="text-accent">min_f1_score:</span> 0.88{"\n"}
                    {"      "}<span className="text-accent">max_latency_ms:</span> 25{"\n"}
                    {"      "}<span className="text-accent">dvc_remote:</span> s3://org-ml-artifacts{"\n"}
                    {"      "}<span className="text-accent">require_mlflow_signature:</span> true
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : GOVERNANCE & QUALITY GATES (CML + MLFLOW) */}
        <section id="governance" className="border-y border-subtle bg-surface/50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-14">
              <div className="inline-flex items-center gap-2 rounded-md bg-status-healthy/10 px-2.5 py-1 font-mono text-xs text-status-healthy mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> AUTOMATED APPROVAL POLICIES
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                No model reaches production without passing your rules.
              </h2>
              <p className="text-secondary">
                Turn governance into code. Every Pull Request triggers automated CML reports comparing candidate models against your production baseline in MLflow.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-subtle bg-canvas p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <GitPullRequest className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Automated CML PR Reports</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Confusion matrices, ROC curves, and metric diffs posted directly inside GitHub Pull Requests before human review.
                </p>
              </div>

              <div className="rounded-xl border border-subtle bg-canvas p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-status-healthy/10 text-status-healthy">
                  <Workflow className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Stage Promotion Approval</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Enforce multi-step sign-off workflows to promote models from <code className="text-primary">Staging</code> to <code className="text-primary">Production</code> in the MLflow Registry.
                </p>
              </div>

              <div className="rounded-xl border border-subtle bg-canvas p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-status-warning/10 text-status-warning">
                  <GitBranch className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Full Lineage & DVC Audit</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Trace every Docker image back to its exact Git commit, DVC dataset hash, hyperparameters, and approver signature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 : CENTRALIZED MULTI-PROJECT DASHBOARD */}
        <section id="hub" className="mx-auto max-w-7xl px-6 py-24">
          <div className="rounded-2xl border border-subtle bg-surface p-8 md:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  <BarChart3 className="h-3.5 w-3.5" /> UNIFIED OBSERVABILITY
                </div>
                <h2 className="text-3xl font-bold tracking-tight">
                  One dashboard across all projects, teams, and clusters.
                </h2>
                <p className="text-secondary leading-relaxed">
                  Stop switching between 10 separate Grafana instances and MLflow servers. Aggregate FastAPI inference latency, Prometheus resource metrics, and data drift alerts across your entire organization.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 font-mono">
                  <div className="rounded-lg border border-subtle bg-canvas p-4">
                    <div className="text-2xl font-bold text-accent">100%</div>
                    <div className="text-xs text-secondary mt-1">Reproducible runs via DVC</div>
                  </div>
                  <div className="rounded-lg border border-subtle bg-canvas p-4">
                    <div className="text-2xl font-bold text-status-healthy">-70%</div>
                    <div className="text-xs text-secondary mt-1">Time to deploy new ML repo</div>
                  </div>
                </div>
              </div>

              {/* Quality Gate Simulation Card */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-subtle bg-canvas p-5 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-secondary pb-2 border-b border-subtle">
                    <span>QUALITY GATE CHECKLIST • PR #128</span>
                    <span className="text-status-healthy">4/4 PASSED</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-surface p-2.5">
                    <span className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-4 w-4 text-status-healthy" /> Repo structure & DVC lockfile
                    </span>
                    <span className="text-status-healthy">OK</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-surface p-2.5">
                    <span className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-4 w-4 text-status-healthy" /> Accuracy delta (+1.8% vs Prod)
                    </span>
                    <span className="text-status-healthy">0.941</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-surface p-2.5">
                    <span className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-4 w-4 text-status-healthy" /> FastAPI Docker container P95 &lt; 30ms
                    </span>
                    <span className="text-status-healthy">18.4ms</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-surface p-2.5">
                    <span className="flex items-center gap-2 text-primary">
                      <CheckCircle2 className="h-4 w-4 text-status-healthy" /> Lead ML Engineer Sign-off
                    </span>
                    <span className="text-accent">@rayane</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-b from-elevated to-surface px-8 py-16 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                <Sparkles className="h-3.5 w-3.5" /> FREE FOR UP TO 3 PROJECTS & 5 TEAM MEMBERS
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Bring order and governance to your ML pipelines.
              </h2>
              <p className="text-secondary">
                Connect your GitHub organization, pick a standardized template, and deploy your first governed model in minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-canvas hover:bg-cyan-400 transition-all">
                  Launch Free Workspace
                </button>
                <button className="rounded-lg border border-subtle bg-canvas px-6 py-3 text-sm font-semibold text-primary hover:bg-elevated transition-colors">
                  Explore Governance Docs
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
