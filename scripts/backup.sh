#!/usr/bin/env bash
# Backup Caelestia configs
# Creates timestamped backup of all configs

BACKUP_DIR="${HOME}/.caelestia-backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_PATH="${BACKUP_DIR}/caelestia-${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "Backing up Caelestia configs to:"
echo "  $BACKUP_PATH"

tar -czf "$BACKUP_PATH" \
    --exclude='.git' \
    --exclude='.github' \
    -C "$(pwd)/.." \
    end4-Caelestia 2>/dev/null || true

echo "Done! Backup created."
echo ""
echo "To restore:"
echo "  tar -xzf $BACKUP_PATH -C ~"
