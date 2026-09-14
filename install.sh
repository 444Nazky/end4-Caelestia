#!/usr/bin/env bash
# Caelestia Installer
# One-command setup for the full desktop environment

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_header() {
    echo -e "${BLUE}"
    echo "  ██████╗ ███████╗██╗   ██╗███████╗"
    echo "  ██╔══██╗██╔════╝██║   ██║██╔════╝"
    echo "  ██║  ██║█████╗  ██║   ██║███████╗"
    echo "  ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║"
    echo "  ██████╔╝███████╗ ╚████╔╝ ███████║"
    echo "  ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝"
    echo -e "${NC}"
    echo -e "${YELLOW}Caelestia Installer${NC} - Hyprland Rice Setup"
    echo "======================================"
    echo ""
}

check_deps() {
    echo -e "${BLUE}[*]${NC} Checking dependencies..."
    local missing=()

    command -v hyprland &>/dev/null || missing+=("hyprland")
    command -v fish &>/dev/null || missing+=("fish")
    command -v foot &>/dev/null || missing+=("foot")
    command -v starship &>/dev/null || missing+=("starship")

    if [ ${#missing[@]} -ne 0 ]; then
        echo -e "${RED}[!]${NC} Missing dependencies: ${missing[*]}"
        echo -e "${YELLOW}[!]${NC} Install with: sudo pacman -S ${missing[*]}"
        exit 1
    fi
    echo -e "${GREEN}[+]${NC} All dependencies satisfied"
}

backup_config() {
    local config=$1
    local backup="${config}.bak.$(date +%s)"
    if [ -d "$config" ] || [ -f "$config" ]; then
        echo -e "${YELLOW}[!]${NC} Backing up existing: $config -> $backup"
        cp -r "$config" "$backup"
    fi
}

install_hypr() {
    echo -e "${BLUE}[*]${NC} Installing Hyprland config..."
    backup_config ~/.config/hypr
    backup_config ~/.config/hyprland

    mkdir -p ~/.config
    ln -sf "$(pwd)/hypr" ~/.config/hypr
    ln -sf "$(pwd)/caelestia/hypr" ~/.config/hyprland
    echo -e "${GREEN}[+]${NC} Hyprland configured"
}

install_fish() {
    echo -e "${BLUE}[*]${NC} Installing Fish shell config..."
    backup_config ~/.config/fish

    mkdir -p ~/.config/fish
    ln -sf "$(pwd)/fish/config.fish" ~/.config/fish/config.fish
    ln -sf "$(pwd)/fish/conf.d" ~/.config/fish/conf.d
    ln -sf "$(pwd)/fish/functions" ~/.config/fish/functions
    echo -e "${GREEN}[+]${NC} Fish shell configured"
}

install_foot() {
    echo -e "${BLUE}[*]${NC} Installing Foot terminal config..."
    backup_config ~/.config/foot

    mkdir -p ~/.config/foot
    ln -sf "$(pwd)/foot/foot.ini" ~/.config/foot/foot.ini
    echo -e "${GREEN}[+]${NC} Foot terminal configured"
}

install_starship() {
    echo -e "${BLUE}[*]${NC} Installing Starship prompt..."
    if ! command -v starship &>/dev/null; then
        echo -e "${YELLOW}[!]${NC} Starship not found, installing..."
        curl -sS https://starship.rs/install.sh | sh
    fi

    backup_config ~/.config/starship.toml
    ln -sf "$(pwd)/starship.toml" ~/.config/starship.toml
    echo -e "${GREEN}[+]${NC} Starship prompt configured"
}

main() {
    print_header
    check_deps

    echo ""
    echo -e "${BLUE}[*]${NC} Starting installation in: $(pwd)"
    echo ""

    install_hypr
    install_fish
    install_foot
    install_starship

    echo ""
    echo -e "${GREEN}[+]${NC} Caelestia installed successfully!"
    echo -e "${YELLOW}[!]${NC} Log out and log back in, or run: exec fish"
    echo ""
    echo "For multi-monitor setup, edit: ~/.config/hypr/monitors.conf"
    echo "For custom keybinds, edit: ~/.config/hypr/hyprland.conf"
}

main "$@"
