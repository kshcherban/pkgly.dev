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
  width: number;
  height: number;
};

export type ComparisonValue = string | boolean;

export type ComparisonRow = {
  label: string;
  pkgly: ComparisonValue;
  artifactory: ComparisonValue;
  nexus: ComparisonValue;
  repoflow: ComparisonValue;
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
      "Open-source self-hosted package registry and artifact manager with npm, Docker, Maven, Python, Cargo, NuGet, S3 storage, ACLs, SSO, cleanup policies, webhooks, and MCP tools for AI assistants.",
    keywords:
      "self-hosted package registry, open-source artifact manager, Artifactory alternative, Nexus alternative, RepoFlow alternative, npm registry, Docker registry, Maven repository, PyPI repository, MCP server",
    url: "https://pkgly.dev/",
    image: "https://pkgly.dev/images/og-card.png",
  },
  hero: {
    wordmark: "pkgly",
    title: "Self-hosted package registry",
    subtitle:
      "Host private packages and cache public registries on your infrastructure.",
    screenshot: {
      image: "/images/overview.png",
      previewImage: "/images/previews/overview.webp",
      alt: "Pkgly repository overview UI",
      title: "Pkgly repository overview",
      width: 1280,
      height: 786,
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
    "MCP server",
  ],
  spotlight: {
    label: "Core features",
    title: "Control access. Keep packages moving.",
    features: [
      "Hosted, proxy, and virtual repositories",
      "S3 storage with local disk caching",
      "Users, ACLs, and repository permissions",
      "SSO support, tokens, and audit logs",
      "Repository cleanup policies",
      "Webhooks for package events",
      "Pkgly CLI for automation",
      "MCP tools for AI assistants: package search, uploads, and downloads",
    ],
    benchmarkLabel: "Verified mixed-package workload",
    benchmarkValue: "200 RPS",
    benchmarkDetail: "4 vCPU / 8 GB RAM server",
  } satisfies Spotlight,
  packageTypes: [
    { name: "npm", icon: "/images/npm.svg" },
    { name: "Go", icon: "/images/go.svg" },
    { name: "Helm", icon: "/images/helm.svg" },
    { name: "Maven", icon: "/images/maven.svg" },
    { name: "Python", icon: "/images/pypi.svg" },
    { name: "Cargo", icon: "/images/cargo.svg" },
    { name: "RubyGems", icon: "/images/rubygems.svg" },
    { name: "Docker / OCI", icon: "/images/docker.svg" },
    { name: "Debian", icon: "/images/debian.svg" },
    { name: "PHP Composer", icon: "/images/composer.svg" },
    { name: "NuGet", icon: "/images/nuget.svg" },
  ],
  architecture: {
    label: "Architecture",
    title: "A small stack you can operate",
    body: "One Rust service, an embedded Vue.js UI, PostgreSQL, and your choice of artifact storage.",
    clients: {
      label: "Clients",
      title: "Package managers and CI",
      body: "One endpoint for developers, automation, and the browser.",
    },
    app: {
      label: "Runtime",
      title: "Rust app",
      body: "Registry APIs, authentication, and the embedded Vue.js UI.",
    },
    stores: [
      {
        label: "State",
        title: "PostgreSQL",
        body: "Users, permissions, and package metadata.",
      },
      {
        label: "Artifacts",
        title: "Local disk or S3",
        body: "Package artifacts, with local disk caching.",
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
      title: "Access and identity",
      body: "SSO, scoped tokens, repository ACLs, and audit logs.",
    },
    {
      title: "Storage and retention",
      body: "S3 or local disk, caching, and per-repository cleanup policies.",
    },
    {
      title: "Automation and AI tools",
      body: "Package webhooks, the Pkgly CLI, and scoped MCP tools for search, uploads, and downloads.",
    },
    {
      title: "An open migration path",
      body: "An Artifactory migration script and source code you can inspect.",
    },
  ],
  demoCards: [
    {
      eyebrow: "Demo",
      title: "Explore pkgly in action",
      body: "Watch a walkthrough of the registry interface.",
      image: "/images/demo.gif",
      previewImage: "/images/demo.gif",
      alt: "Animated walkthrough of the pkgly registry interface",
      width: 1120,
      height: 700,
    },
    {
      eyebrow: "Search",
      title: "Find the package you need",
      body: "Search packages, tags, and metadata across your repositories.",
      image: "/images/search-view.png",
      previewImage: "/images/previews/search-view.webp",
      alt: "Pkgly package search view",
      width: 1280,
      height: 776,
    },
    {
      eyebrow: "Repositories",
      title: "One place for every repository",
      body: "Browse hosted, proxy, and virtual repositories from one UI.",
      image: "/images/repository-view.png",
      previewImage: "/images/previews/repository-view.webp",
      alt: "Pkgly repository detail view",
      width: 1280,
      height: 786,
    },
    {
      eyebrow: "Admin",
      title: "Keep administration straightforward",
      body: "Manage repositories, package visibility, and users in the same interface.",
      image: "/images/admin-repositories.png",
      previewImage: "/images/previews/admin-repositories.webp",
      alt: "Pkgly admin repository management view",
      width: 1280,
      height: 780,
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
      priceLabel: "Free CE; Pro from $7,500/year",
      detail: "Community Edition is free. Pro adds SSO, audit logs, and support.",
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
      nexus: "Free CE; Pro from $7,500/year",
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
      artifactory: "Hosted, proxy, virtual",
      nexus: "Hosted, proxy, virtual",
      repoflow: "Hosted, proxy, virtual",
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
      label: "Virtual repositories",
      pkgly: true,
      artifactory: true,
      nexus: true,
      repoflow: true,
    },
    {
      label: "S3 artifact storage",
      pkgly: true,
      artifactory: true,
      nexus: true,
      repoflow: false,
    },
    {
      label: "SSO",
      pkgly: true,
      artifactory: true,
      nexus: true,
      repoflow: true,
    },
    {
      label: "Audit trail",
      pkgly: true,
      artifactory: true,
      nexus: true,
      repoflow: true,
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
      pkgly: true,
      artifactory: true,
      nexus: true,
      repoflow: false,
    },
    {
      label: "Migration help",
      pkgly: "Artifactory-to-pkgly migration script",
      artifactory: "Vendor migration services",
      nexus: "Artifactory migration services advertised",
      repoflow: "Migration guides for Artifactory and Nexus",
    },
  ] satisfies ComparisonRow[],
  quickstart: {
    title: "Run pkgly on your infrastructure",
    body: "With Docker running, run the installer, then open the setup URL it prints.",
    commands: [
      "curl -fsSL https://pkgly.dev/install.sh | bash",
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
    {
      label: "MCP setup",
      href: "https://docs.pkgly.dev/cli/mcp.html",
    },
  ] satisfies Cta[],
  sourceNote:
    "Self-hosted pricing checked November 10, 2026. Feature comparison checked July 20, 2026. Plans and features vary by edition.",
};
