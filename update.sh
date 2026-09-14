#!/usr/bin/env bash
# Caelestia Updater
# Pull latest changes without losing local modifications

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}[*]${NC} Updating Caelestia..."
echo ""

# Check if in git repo
if [ ! -d .git ]; then
    echo -e "${RED}[!]${NC} Not a git repository. Run from the repo directory."
    exit 1
fi

# Stash local changes
if ! git diff --quiet; then
    echo -e "${YELLOW}[!]${NC} Local changes detected, stashing..."
    git stash push -m "local-$(date +%Y%m%d-%H%M%S)"
    stashed=true
fi

# Pull latest
echo -e "${BLUE}[*]${NC} Pulling from remote..."
git pull origin main

# Restore stashed changes
if [ "$stashed" = true ]; then
    echo ""
    echo -e "${YELLOW}[!]${NC} Restoring local changes..."
    git stash pop || echo -e "${RED}[!]${NC} Merge conflict - check 'git stash list'"
fi

echo ""
echo -e "${GREEN}[+]${NC} Caelestia updated!"
