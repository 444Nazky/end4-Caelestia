# Caelestia
> A beautifully crafted Hyprland rice with Catppuccin Mocha aesthetics

A complete desktop environment setup featuring Hyprland (Wayland compositor), Fish shell, Foot terminal, and Starship prompt — all unified under the dreamy Catppuccin Mocha color palette.

## Screenshots

| Desktop | Terminal |
|---------|----------|
| ![Desktop](.github/screenshots/desktop.png) | ![Terminal](.github/screenshots/terminal.png) |

## Features

- **Hyprland** — Dynamic tiling Wayland compositor
- **Fish Shell** — Smart, user-friendly shell with autocompletion
- **Foot Terminal** — Fast, lightweight Wayland-native terminal
- **Starship** — Minimal, blazing-fast prompt
- **Catppuccin Mocha** — Soothing pastel dark theme

## Quick Install

```bash
git clone https://github.com/444Nazky/end4-Caelestia.git
cd end4-Caelestia
./install.sh
```

## Manual Install

### Hyprland

```bash
# Backup existing config
[ -d ~/.config/hypr ] && mv ~/.config/hypr ~/.config/hypr.bak

# Link configs
ln -s end4-Caelestia/hypr ~/.config/hypr
ln -s end4-Caelestia/caelestia/hypr ~/.config/hyprland
```

### Fish Shell

```bash
# Install fisher (plugin manager)
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher

# Link config
ln -s end4-Caelestia/fish/config.fish ~/.config/fish/config.fish
ln -s end4-Caelestia/fish/conf.d ~/.config/fish/conf.d
ln -s end4-Caelestia/fish/functions ~/.config/fish/functions
```

### Foot Terminal

```bash
ln -s end4-Caelestia/foot/foot.ini ~/.config/foot/foot.ini
```

### Starship Prompt

```bash
# Install starship
curl -sS https://starship.rs/install.sh | sh

# Link config
ln -s end4-Caelestia/starship.toml ~/.config/starship.toml
```

## Configuration Structure

```
end4-Caelestia/
├── caelestia/          # Main dotter templates
│   ├── dotter/         # Dotter package manager
│   ├── hypr/           # Hyprland module
│   └── monitors/       # Multi-monitor configs
├── fish/               # Fish shell configuration
│   ├── conf.d/         # Shell extensions
│   └── functions/      # Custom functions
├── foot/               # Foot terminal config
├── hypr/               # Hyprland configs
└── starship.toml       # Starship prompt config
```

## Requirements

- Hyprland (Wayland compositor)
- Fish Shell 3.0+
- Foot terminal emulator
- Starship prompt
- A Nerd Font (recommended: JetBrains Nerd Font)

## Theming

All components use **Catppuccin Mocha** palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Rosewater | `#f5e0dc` | Highlights |
| Flamingo | `#f2cdcd` | Accents |
| Pink | `#f5c2e7` | Links |
| Mauve | `#cba6f7` | Variables |
| Peach | `#fab387` | Warnings |
| Green | `#a6e3a1` | Success |
| Teal | `#94e2d5` | Info |
| Blue | `#89b4fa` | Commands |
| Lavender | `#b4befe` | Keywords |

## Keybindings

| Key | Action |
|-----|--------|
| `Super + Enter` | Launch terminal |
| `Super + Q` | Close window |
| `Super + D` | App launcher |
| `Super + 1-9` | Switch workspaces |
| `Super + Shift + F` | Move window |
| `Super + F` | Toggle float |
| `Super + M` | Exit Hyprland |

## Troubleshooting

### Black screen after install
- Check `hyprland.conf` for errors: `Hyprland --version`
- Check `~/.cache/hyprland` for logs

### Fish shell not loading
- Ensure Fish is default shell: `chsh -s /usr/bin/fish`
- Check config: `fish -C "set -l debug"` for errors

## Credits

- [Hyprland](https://hyprland.org/) — Wayland compositor
- [Catppuccin](https://catppuccin.com/) — Color palette
- [Fish Shell](https://fishshell.com/) — Shell
- [Foot](https://codeberg.org/dnkl/foot) — Terminal
- [Starship](https://starship.rs/) — Prompt

## License

MIT License — feel free to use, modify, and share.
