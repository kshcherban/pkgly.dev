// ABOUTME: Defines landing page copy, product claims, SEO fields, and links.
// ABOUTME: Keeps comparison data centralized so rendering stays simple.
export type Cta = {
  label: string;
  href: string;
};

export type DemoCard = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  previewImage: string;
  alt: string;
};

export type CompetitorCallout = {
  name: string;
  priceLabel: string;
  detail: string;
  sourceHref: string;
};

export type Spotlight = {
  label: string;
  title: string;
  features: string[];
  benchmarkLabel: string;
  benchmarkValue: string;
  benchmarkDetail: string;
};

export type ArchitectureNode = {
  label: string;
  title: string;
  body: string;
  items?: string[];
};

export const siteContent = {
  seo: {
    title: "pkgly - Open-source self-hosted package registry",
    description:
      "Open-source self-hosted package registry and artifact manager for npm, Docker, Maven, Python, Cargo, NuGet, S3 storage, ACLs, SSO, cleanup policies, webhooks, and more.",
    keywords:
      "self-hosted package registry, open-source artifact manager, Artifactory alternative, Nexus alternative, RepoFlow alternative, npm registry, Docker registry, Maven repository, PyPI repository",
    url: "https://pkgly.dev/",
    image: "https://pkgly.dev/images/og-card.png",
  },
  hero: {
    wordmark: "pkgly",
    title: "Self-hosted package registry",
    subtitle:
      "Manage public and private packages across npm, Docker / OCI, Maven, Python, and more with hosted, proxy, and virtual repositories, S3 storage, ACLs, and SSO.",
    screenshot: {
      image: "/images/overview.png",
      previewImage: "/images/previews/overview.webp",
      alt: "Pkgly repository overview UI",
      title: "Pkgly repository overview",
    },
    primaryCta: {
      label: "Star on GitHub",
      href: "https://github.com/kshcherban/pkgly",
    } satisfies Cta,
    docsCta: {
      label: "Read docs",
      href: "https://docs.pkgly.dev",
    } satisfies Cta,
    quickstartCta: {
      label: "Quickstart",
      href: "https://docs.pkgly.dev/quickstart.html",
    } satisfies Cta,
  },
  statChips: [
    "Free and open source",
    "10+ package ecosystems",
    "SSO support",
    "Hosted, proxy and virtual repositories",
    "S3 storage with local disk caching",
    "Users, ACLs",
    "Repository cleanup policies",
    "Webhooks for packages",
    "Pkgly CLI",
  ],
  spotlight: {
    label: "Core features",
    title: "Practical features for teams that need control",
    features: [
      "Hosted, proxy, and virtual repositories",
      "S3 storage with local disk caching",
      "Users, ACLs, and repository permissions",
      "SSO support, tokens, and audit logs",
      "Repository cleanup policies",
      "Webhooks for package events",
      "Pkgly CLI for automation",
    ],
    benchmarkLabel: "Verified mixed-package workload",
    benchmarkValue: "200 RPS",
    benchmarkDetail: "4 vCPU / 8 GB RAM server",
  } satisfies Spotlight,
  packageTypes: [
    "npm",
    "Docker / OCI",
    "Helm",
    "Maven",
    "Python",
    "Cargo",
    "RubyGems",
    "Go",
    "Debian",
    "PHP Composer",
    "Nuget",
  ],
  architecture: {
    label: "Architecture",
    title: "Small surface area, clear storage boundaries",
    body: "Pkgly runs as a Rust application with the Vue.js frontend embedded in the server. Runtime state lives in PostgreSQL, while package artifacts are stored on local disk or S3.",
    clients: {
      label: "Clients",
      title: "Developers, CI, and browsers",
      body: "Package managers, automation, and admins connect to one pkgly endpoint.",
    },
    app: {
      label: "Runtime",
      title: "Rust app",
      body: "Serves registry traffic, API requests, and the embedded Vue.js frontend from one deployable service.",
      items: ["Registry APIs", "Embedded Vue.js frontend", "Auth and repository rules"],
    },
    stores: [
      {
        label: "State",
        title: "PostgreSQL",
        body: "Users, repositories, permissions, package metadata, and application state.",
      },
      {
        label: "Artifacts",
        title: "Local disk or S3",
        body: "Package blobs and cached artifacts stay in the storage backend you choose.",
      },
    ],
  } satisfies {
    label: string;
    title: string;
    body: string;
    clients: ArchitectureNode;
    app: ArchitectureNode;
    stores: ArchitectureNode[];
  },
  pillars: [
    {
      title: "Open-source by default",
      body: "Run it without a self-hosted license bill and keep full control over your packages, infrastructure, and upgrade path. This is the core of open-source artifact management.",
    },
    {
      title: "One home for mixed ecosystems",
      body: "Manage public and private packages across the ecosystems teams actually use instead of bolting together multiple single-purpose registries. Centralize your self-hosted package registry.",
    },
    {
      title: "Enterprise features without enterprise drag",
      body: "Ship with token auth, SSO support, audit logging, search, and S3-backed storage without inheriting a bloated operator experience. Enterprise features for your self-hosted package registry.",
    },
    {
      title: "Built for real workloads",
      body: "Pkgly already handles a verified mixed-package test workload at 200 RPS on modest hardware, and the product surface stays simple.",
    },
  ],
  demoCards: [
    {
      eyebrow: "Search",
      title: "Find packages without hunting through storage paths",
      body: "Search packages, tags, and metadata from one UI instead of sending users into repo-specific dead ends.",
      image: "/images/search-view.png",
      previewImage: "/images/previews/search-view.webp",
      alt: "Pkgly package search view",
    },
    {
      eyebrow: "Repositories",
      title: "Browse hosted and proxy repositories from one control plane",
      body: "Show developers the repositories they need, while platform teams keep storage, auth, and repository behavior under control.",
      image: "/images/repository-view.png",
      previewImage: "/images/previews/repository-view.webp",
      alt: "Pkgly repository detail view",
    },
    {
      eyebrow: "Admin",
      title: "Manage repositories, packages, and users without the usual bloat",
      body: "Repository setup, package visibility, and user administration live in one UI with a modern workflow instead of an archaeology dig.",
      image: "/images/admin-repositories.png",
      previewImage: "/images/previews/admin-repositories.webp",
      alt: "Pkgly admin repository management view",
    },
  ] satisfies DemoCard[],
  competitorCallouts: [
    {
      name: "Artifactory",
      priceLabel: "Starts at $27,000/year",
      detail: "JFrog lists Artifactory Pro X self-managed pricing from $27,000/year for one server.",
      sourceHref: "https://jfrog.com/artifactory/buy-now/",
    },
    {
      name: "Nexus",
      priceLabel: "Free CE, quote for self-hosted Pro",
      detail: "Sonatype lists a free Community Edition and routes air-gapped or self-hosted Pro deployments to quote.",
      sourceHref: "https://www.sonatype.com/products/pricing",
    },
    {
      name: "RepoFlow",
      priceLabel: "Starts at $1,999/year self-hosted",
      detail: "RepoFlow lists a non-commercial Personal plan and commercial self-hosted Standard from $1,999/year.",
      sourceHref: "https://www.repoflow.io/pricing",
    },
  ] satisfies CompetitorCallout[],
  comparisonRows: [
    {
      label: "Self-hosted commercial cost",
      pkgly: "$0",
      artifactory: "From $27,000/year",
      nexus: "Free CE; Pro quote required",
      repoflow: "From $1,999/year",
    },
    {
      label: "Source availability",
      pkgly: "Open source",
      artifactory: "Commercial source closed",
      nexus: "Community source available; Pro commercial",
      repoflow: "Commercial source closed",
    },
    {
      label: "Repository modes",
      pkgly: "Hosted, proxy, virtual",
      artifactory: "Local, remote, virtual",
      nexus: "Hosted, proxy, group",
      repoflow: "Local, remote, virtual",
    },
    {
      label: "Hosted format coverage",
      pkgly: "npm, Docker / OCI, Helm, Maven, Python, Cargo, RubyGems, Go, Debian, Composer, NuGet",
      artifactory: "50+ technologies",
      nexus: "20+ formats",
      repoflow: "Major package types",
    },
    {
      label: "Proxy cache coverage",
      pkgly: "Most formats; Cargo and Helm are hosted-only today",
      artifactory: "Broad public registry proxying",
      nexus: "Proxy repositories across supported formats",
      repoflow: "Store and proxy across major package types",
    },
    {
      label: "Virtual / group repositories",
      pkgly: "Virtual repositories",
      artifactory: "Virtual repositories",
      nexus: "Group repositories",
      repoflow: "Virtual repositories",
    },
    {
      label: "S3 artifact storage",
      pkgly: "Yes, with local disk cache",
      artifactory: "Yes",
      nexus: "Blob storage options",
      repoflow: "No",
    },
    {
      label: "SSO",
      pkgly: "Yes",
      artifactory: "Enterprise access control",
      nexus: "Pro includes SSO",
      repoflow: "Yes, SSO + LDAP",
    },
    {
      label: "Audit trail",
      pkgly: "Yes",
      artifactory: "Yes on paid tiers",
      nexus: "Pro audit APIs",
      repoflow: "No",
    },
    {
      label: "Package cleanup / retention",
      pkgly: "Per-repository cleanup policies",
      artifactory: "Automated cleanup on higher tiers",
      nexus: "Repository cleanup policies",
      repoflow: "Retention rules advertised",
    },
    {
      label: "Webhooks",
      pkgly: "Package publish/delete webhooks",
      artifactory: "Platform integrations and alerts",
      nexus: "Customized workflow automation",
      repoflow: "No",
    },
    {
      label: "Migration help",
      pkgly: "Artifactory-to-pkgly migration script",
      artifactory: "Vendor migration services",
      nexus: "Artifactory migration services advertised",
      repoflow: "Migration guides for Artifactory and Nexus",
    },
  ],
  quickstart: {
    title: "Get a working instance up fast",
    body: "Just run a docker compose command and open the UI to get a working instance of Pkgly up in minutes.",
    commands: [
      "git clone https://github.com/kshcherban/pkgly.git",
      "cd pkgly",
      "docker compose up --detach",
      "open http://localhost:8000/admin/install",
    ],
  },
  footerLinks: [
    {
      label: "GitHub",
      href: "https://github.com/kshcherban/pkgly",
    },
    {
      label: "Docs",
      href: "https://docs.pkgly.dev",
    },
    {
      label: "Quickstart",
      href: "https://docs.pkgly.dev/quickstart.html",
    },
  ] satisfies Cta[],
  // sourceNote:
    // "Checked against official vendor pages on April 30, 2026. Vendor packaging changes; verify pricing before purchase.",
};
