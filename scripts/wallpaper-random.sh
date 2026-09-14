#!/usr/bin/env bash
# Change wallpaper randomly from ~/Pictures/wallpapers

WALLPAPER_DIR="${HOME}/Pictures/wallpapers"

if [ ! -d "$WALLPAPER_DIR" ]; then
    echo "Wallpaper directory not found: $WALLPAPER_DIR"
    exit 1
fi

# Find random image
wallpaper=$(find "$WALLPAPER_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | shuf -n1)

if [ -z "$wallpaper" ]; then
    echo "No wallpapers found in $WALLPAPER_DIR"
    exit 1
fi

echo "Setting wallpaper: $wallpaper"
swww img "$wallpaper" --transition-type random

# Optionally update hyprland
if command -v hyprpaper &>/dev/null; then
    hyprpaper reload , "$wallpaper"
fi
