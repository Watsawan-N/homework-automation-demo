#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_VERSION_FILE="$PROJECT_ROOT/.nvmrc"

if [[ ! -f "$NODE_VERSION_FILE" ]]; then
  echo "Missing $NODE_VERSION_FILE" >&2
  exit 1
fi

REQUIRED_NODE_VERSION="$(tr -d '[:space:]' < "$NODE_VERSION_FILE")"

if [[ -z "$REQUIRED_NODE_VERSION" ]]; then
  echo "Node version file is empty: $NODE_VERSION_FILE" >&2
  exit 1
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"

if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm is required to run this project automatically." >&2
  echo "Install nvm or switch to Node $REQUIRED_NODE_VERSION manually, then retry." >&2
  exit 1
fi

# shellcheck source=/dev/null
source "$NVM_DIR/nvm.sh"

nvm install "$REQUIRED_NODE_VERSION" >/dev/null
nvm use "$REQUIRED_NODE_VERSION" >/dev/null

if [[ $# -eq 0 ]]; then
  node -v
  exit 0
fi

exec "$@"
