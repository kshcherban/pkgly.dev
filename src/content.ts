export type Cta = {
  label: string;
  href: string;
};

export type DemoCard = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
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

export const siteContent = {
  hero: {
    wordmark: "pkgly",
    title: "Own your packages",
    subtitle:
      "Pkgly is the open-source repository manager for public and private packages. Run npm, Docker, Helm, Maven, Python, Cargo, and more from one fast, self-hosted control plane.",
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
    "Hosted + proxy + virtual repositories",
    "S3 storage with local disk caching",
    "Users, ACLs, and repository permissions",
    "SSO support",
  ],
  spotlight: {
    label: "Core features",
    title: "Practical features for teams that need control",
    features: [
      "Hosted, proxy, and virtual repositories",
      "S3 storage with local disk caching",
      "Users, ACLs, and repository permissions",
      "SSO support, tokens, and audit logs",
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
  pillars: [
    {
      title: "Open-source by default",
      body: "Run it without a self-hosted license bill and keep full control over your packages, infrastructure, and upgrade path.",
    },
    {
      title: "One home for mixed ecosystems",
      body: "Manage public and private packages across the ecosystems teams actually use instead of bolting together multiple single-purpose registries.",
    },
    {
      title: "Enterprise features without enterprise drag",
      body: "Ship with token auth, SSO support, audit logging, search, and S3-backed storage without inheriting a bloated operator experience.",
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
      alt: "Pkgly package search view",
    },
    {
      eyebrow: "Repositories",
      title: "Browse hosted and proxy repositories from one control plane",
      body: "Show developers the repositories they need, while platform teams keep storage, auth, and repository behavior under control.",
      image: "/images/repository-view.png",
      alt: "Pkgly repository detail view",
    },
    {
      eyebrow: "Admin",
      title: "Manage repositories, packages, and users without the usual bloat",
      body: "Repository setup, package visibility, and user administration live in one UI with a modern workflow instead of an archaeology dig.",
      image: "/images/admin-repositories.png",
      alt: "Pkgly admin repository management view",
    },
  ] satisfies DemoCard[],
  competitorCallouts: [
    {
      name: "Artifactory",
      priceLabel: "Starts at $27,000/year",
      detail: "JFrog lists Artifactory Pro X self-managed pricing starting at $27,000 per year.",
      sourceHref: "https://jfrog.com/artifactory/buy-now/",
    },
    {
      name: "Nexus",
      priceLabel: "Quote required for self-hosted",
      detail: "Sonatype publishes cloud pricing starting at $135 + consumption per month and routes self-hosted buyers to sales.",
      sourceHref: "https://www.sonatype.com/products/sonatype-nexus-repository/cloud/offer",
    },
    {
      name: "RepoFlow",
      priceLabel: "Starts at $1,999/year self-hosted",
      detail: "RepoFlow advertises self-hosted pricing starting at $1,999 per year with unlimited users and requests.",
      sourceHref: "https://www.repoflow.io/",
    },
  ] satisfies CompetitorCallout[],
  comparisonRows: [
    {
      label: "License cost to self-host",
      pkgly: "$0",
      artifactory: "$27,000/year+",
      nexus: "Quote required",
      repoflow: "$1,999/year+",
    },
    {
      label: "Open-source codebase",
      pkgly: "Yes",
      artifactory: "No",
      nexus: "No",
      repoflow: "No",
    },
    {
      label: "Public + private packages",
      pkgly: "Yes",
      artifactory: "Yes",
      nexus: "Yes",
      repoflow: "Yes",
    },
    {
      label: "Mixed ecosystem support",
      pkgly: "Major package types",
      artifactory: "40+ technologies",
      nexus: "20+ formats",
      repoflow: "Major package types",
    },
  ],
  quickstart: {
    title: "Get a working instance up fast",
    body: "The first version of pkgly.dev should convert curiosity into a running install. Keep the path short and make the docs one click away.",
    commands: [
      "git clone https://github.com/kshcherban/pkgly.git",
      "cd pkgly",
      "docker compose up --build --detach",
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
  sourceNote: "Comparison references checked against official vendor pages on April 4, 2026.",
};
