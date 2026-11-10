#!/usr/bin/env bash
# ABOUTME: Installs a persistent local Pkgly and PostgreSQL stack using Docker Compose.
# ABOUTME: Supports piped execution and preserves existing installation files on repeat runs.
set -euo pipefail

usage() {
    cat <<'EOF'
Usage: bash install.sh [--dir PATH] [--version TAG] [--port PORT] [--no-start]

Requires Docker Engine, Docker Compose v2, and curl. No sudo is used.
  --dir PATH      Installation directory (default: ./pkgly)
  --version TAG   GHCR release tag (default: v0.1.1)
  --port PORT     Local HTTP port (default: 8000)
  --no-start      Write files only, for inspection before starting
  --help          Show this help

Existing installations retain their configuration, image version, and port.
EOF
}

die() { printf 'Error: %s\n' "$*" >&2; exit 1; }

write_config() {
    local password=$1 port=$2
    cat > config.toml <<EOF
mode = "Release"
suggested_local_storage_path = "/data/storages"

[database]
user = "pkgly"
password = "$password"
database = "pkgly"
host = "postgres"
port = 5432

[sessions]
lifespan = 86400
cleanup_interval = 3600
database_location = "/data/sessions.redb"

[site]
app_url = "http://localhost:$port"
is_https = false

[log.levels]
default = "Info"

[log.loggers.console]
type = "Console"

[log.loggers.console.config]
format = "compact"
ansi_color = false
EOF
}

write_compose() {
    local password=$1 version=$2
    cat > compose.yaml <<EOF
# ABOUTME: Runs the local Pkgly application and its private PostgreSQL database.
# ABOUTME: Persists package files, sessions, and database records in named volumes.
services:
  postgres:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_DB: pkgly
      POSTGRES_USER: pkgly
      POSTGRES_PASSWORD: "$password"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pkgly -d pkgly"]
      interval: 2s
      timeout: 5s
      retries: 30
  pkgly:
    image: ghcr.io/kshcherban/pkgly:$version
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    command: ["start", "--config", "/data/config.toml"]
    ports:
      - "127.0.0.1:\${PKGLY_PORT}:6742"
    volumes:
      - pkgly_data:/data
      - ./config.toml:/data/config.toml:ro
volumes:
  postgres_data:
  pkgly_data:
EOF
}

prepare_installation() {
    local directory=$1 version=$2 port=$3
    umask 077
    mkdir -p -- "$directory"
    cd -- "$directory"
    if [ -e compose.yaml ] || [ -e config.toml ] || [ -e .env ]; then
        [ -f compose.yaml ] && [ -f config.toml ] && [ -f .env ] ||
            die "Incomplete installation in $PWD; existing files were preserved"
        printf 'Using existing installation in %s; settings are preserved.\n' "$PWD"
    else
        [ -z "$(ls -A)" ] || die "Installation directory is not empty: $PWD; choose another --dir"
        local password instance
        password=$(od -An -N24 -tx1 /dev/urandom | tr -d ' \n')
        instance=$(od -An -N6 -tx1 /dev/urandom | tr -d ' \n')
        cat > .env <<EOF
COMPOSE_PROJECT_NAME=pkgly-$instance
PKGLY_PORT=$port
EOF
        write_config "$password" "$port"
        write_compose "$password" "$version"
    fi
}

start_installation() {
    local port
    docker compose up --detach --wait --wait-timeout 120 </dev/null
    local attempt
    # Read the saved port without sourcing operator-controlled shell code.
    port=$(sed -n 's/^PKGLY_PORT=//p' .env)
    [[ "$port" =~ ^[0-9]{1,5}$ ]] || die "Invalid PKGLY_PORT in .env"
    for attempt in {1..60}; do
        if curl --fail --silent --max-time 2 "http://localhost:$port/health" >/dev/null; then
            printf '\nPkgly is ready: http://localhost:%s/admin/install\n' "$port"
            printf 'Create your admin account, then a storage and repository in the UI.\n'
            printf 'Manage this instance from %s with docker compose logs, stop, or up --detach.\n' "$PWD"
            return
        fi
        sleep 2
    done
    die "Pkgly did not become ready; inspect docker compose logs in $PWD"
}

main() {
    local directory=./pkgly version=v0.1.1 port=8000 start=true
    while [ "$#" -gt 0 ]; do
        case "$1" in
            --help|-h) usage; return ;;
            --no-start) start=false; shift ;;
            --dir|--version|--port)
                [ "$#" -ge 2 ] || die "$1 requires a value"
                case "$1" in
                    --dir) directory=$2 ;;
                    --version) version=$2 ;;
                    --port) port=$2 ;;
                esac
                shift 2 ;;
            *) die "Unknown option: $1 (see --help)" ;;
        esac
    done
    [[ "$version" =~ ^v[0-9]+\.[0-9]+\.[0-9]+([.-][a-zA-Z0-9.-]+)?$ ]] || die "Invalid release tag: $version"
    [[ "$port" =~ ^[0-9]{1,5}$ ]] || die "Invalid port: $port"
    port=$((10#$port))
    [ "$port" -ge 1 ] && [ "$port" -le 65535 ] || die "Invalid port: $port"
    [ -n "$directory" ] || die "Installation directory must not be empty"
    command -v docker >/dev/null || die "Install Docker Engine and Docker Compose v2 first"
    docker compose version >/dev/null || die "Install the Docker Compose v2 plugin first"
    command -v curl >/dev/null || die "Install curl first"
    if "$start"; then
        docker info >/dev/null 2>&1 || die "Docker is not running or is inaccessible"
    fi

    prepare_installation "$directory" "$version" "$port"
    docker compose config --quiet
    printf 'Installation files: %s\n' "$PWD"
    if ! "$start"; then
        printf 'Review config.toml and compose.yaml, then run docker compose up --detach.\n'
        return
    fi
    start_installation
}

main "$@"
