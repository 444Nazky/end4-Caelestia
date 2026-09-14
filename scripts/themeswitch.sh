#!/usr/bin/env bash
# Theme Switcher
# Toggle between Catppuccin Mocha, Latte, Macchiato, Frappe

THEME="${1:-mocha}"

case "$THEME" in
    mocha)
        export COL1="#CDD6F4"  # Text
        export COL2="#CBA6F7"  # Mauve
        export COL3="#89B4FA"  # Blue
        export COL4="#F5E0DC"  # Rosewater
        export COL5="#A6E3A1"  # Green
        export COL_BG="#1E1E2E"  # Base
        export COL_BG2="#313244"  # Surface0
        ;;
    latte)
        export COL1="#4C4F69"  # Text
        export COL2="#7287FD"  # Mauve
        export COL3="#1E66F5"  # Blue
        export COL4="#DC8A78"  # Rosewater
        export COL5="#40A02B"  # Green
        export COL_BG="#EFF1F5"  # Base
        export COL_BG2="#DCE0E8"  # Surface0
        ;;
    macchiato)
        export COL1="#CAD3F5"  # Text
        export COL2="#C6A0F6"  # Mauve
        export COL3="#8AADF4"  # Blue
        export COL4="#F4DBD6"  # Rosewater
        export COL5="#A6DA95"  # Green
        export COL_BG="#24273A"  # Base
        export COL_BG2="#363A4F"  # Surface0
        ;;
    frappe)
        export COL1="#C6D0F5"  # Text
        export COL2="#CA9EE6"  # Mauve
        export COL3="#8CAAEE"  # Blue
        export COL4="#F2CDCD"  # Rosewater
        export COL5="#A6D189"  # Green
        export COL_BG="#303446"  # Base
        export COL_BG2="#414559"  # Surface0
        ;;
    *)
        echo "Usage: themeswitch {mocha|latte|macchiato|frappe}"
        exit 1
        ;;
esac

echo "Switched to Catppuccin $THEME"
echo "Base: $COL_BG"
echo "Text: $COL1"

# Update waybar colors
sed -i "s/\"background\": \"[^\"]*\"/\"background\": \"$COL_BG\"/" ~/.config/waybar/config.jsonc 2>/dev/null || true

# Update hyprland
sed -i "s/col\.accent\s* = .*/col\.accent = $COL2/" ~/.config/hypr/hyprland.conf 2>/dev/null || true

echo "Theme applied. Reload Hyprland (Super + Shift R) to see changes."
