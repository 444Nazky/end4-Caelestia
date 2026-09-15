# Caelestia

Hyprland rice built around Catppuccin Mocha — Fish, Foot, Starship, Waybar, and supporting scripts for a cohesive Wayland desktop.

## Quick start

```bash
git clone https://github.com/444Nazky/end4-Caelestia.git
cd end4-Caelestia
./install.sh
```

The installer checks for Hyprland, Fish, Foot, and Starship, backs up existing configs, then symlinks this repo into `~/.config`.

Update later without losing local edits:

```bash
./update.sh
```

Log out and back in after install, or run `exec fish`.

## What you get

| Component | Role |
|-----------|------|
| **Hyprland** | Tiling Wayland compositor (Lua + conf overlays) |
| **Fish** | Interactive shell with Starship, zoxide, eza, and git abbrs |
| **Foot** | Wayland-native terminal (JetBrains Mono Nerd Font) |
| **Starship** | Catppuccin Mocha powerline prompt |
| **Waybar** | Status bar with CPU, memory, network bandwidth, temperature, disk, battery |
| **wlogout** | Logout menu styling |
| **Scripts** | Backup, Catppuccin theme switch, random wallpaper (`swww`) |

## Screenshots

Add PNGs under [`.github/screenshots/`](.github/screenshots/) as `desktop.png` and `terminal.png` (1920×1080 recommended). Until then, the gallery is intentionally empty so the README does not link to missing images.

## Requirements

| Package | Notes |
|---------|--------|
| `hyprland` | Wayland compositor |
| `fish` | Shell 3.0+ |
| `foot` | Terminal |
| `starship` | Prompt |
| Nerd Font | JetBrains Mono Nerd Font recommended |
| `waybar` | Optional — for the included bar config |
| `swww` | Optional — for `scripts/wallpaper-random.sh` |

On Arch:

```bash
sudo pacman -S hyprland fish foot starship waybar ttf-jetbrains-mono-nerd
# optional
sudo pacman -S swww
```

## Manual install

Run these from the repo root so paths resolve correctly:

```bash
REPO="$(pwd)"

# Hyprland
[ -e ~/.config/hypr ] && mv ~/.config/hypr ~/.config/hypr.bak
[ -e ~/.config/hyprland ] && mv ~/.config/hyprland ~/.config/hyprland.bak
ln -s "$REPO/hypr" ~/.config/hypr
ln -s "$REPO/caelestia/hypr" ~/.config/hyprland

# Fish
mkdir -p ~/.config/fish
ln -sf "$REPO/fish/config.fish" ~/.config/fish/config.fish
ln -sf "$REPO/fish/conf.d" ~/.config/fish/conf.d
ln -sf "$REPO/fish/functions" ~/.config/fish/functions

# Foot
mkdir -p ~/.config/foot
ln -sf "$REPO/foot/foot.ini" ~/.config/foot/foot.ini

# Starship
ln -sf "$REPO/starship.toml" ~/.config/starship.toml

# Waybar / wlogout (optional)
mkdir -p ~/.config/waybar ~/.config/wlogout
ln -sf "$REPO/waybar/config.jsonc" ~/.config/waybar/config.jsonc
ln -sf "$REPO/wlogout/style.css" ~/.config/wlogout/style.css
```

Set Fish as your login shell if needed:

```bash
chsh -s /usr/bin/fish
```

## Layout

```
end4-Caelestia/
├── caelestia/           # Dotter templates, Hypr Lua modules, monitors
├── hypr/                # Hyprland conf overlays (monitors, prefs)
├── fish/                # config.fish, conf.d, functions
├── foot/                # foot.ini
├── waybar/              # Status bar config
├── wlogout/             # Logout menu styles
├── scripts/             # backup, themeswitch, wallpaper-random
├── starship.toml
├── install.sh
└── update.sh
```

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/backup.sh` | Timestamped tarball under `~/.caelestia-backups/` |
| `scripts/themeswitch.sh` | Switch Catppuccin flavors: `mocha`, `latte`, `macchiato`, `frappe` |
| `scripts/wallpaper-random.sh` | Random image from `~/Pictures/wallpapers` via `swww` |

```bash
./scripts/themeswitch.sh mocha
./scripts/wallpaper-random.sh
./scripts/backup.sh
```

## Theming

Default palette is **Catppuccin Mocha**:

| Color | Hex | Typical use |
|-------|-----|-------------|
| Text | `#cdd6f4` | Foreground |
| Mauve | `#cba6f7` | Accents / prompt |
| Blue | `#89b4fa` | Paths / links |
| Green | `#a6e3a1` | Success |
| Peach | `#fab387` | Warnings |
| Red | `#f38ba8` | Errors |
| Base | `#1e1e2e` | Background |
| Surface0 | `#313244` | Panels |

## Keybindings

Defaults expected by this rice (defined in the Hyprland keybinds module):

| Key | Action |
|-----|--------|
| `Super + Enter` | Launch terminal |
| `Super + Q` | Close window |
| `Super + D` | App launcher |
| `Super + F` | Toggle float |
| `Super + 1`–`9` | Switch workspace |
| `Super + Shift + 1`–`9` | Move window to workspace |
| `Super + M` | Exit Hyprland |

Customize monitors in `hypr/monitors.conf` and personal prefs in `hypr/userprefs.conf` or `~/.config/caelestia/hypr-user.lua`.

## Troubleshooting

**Black screen after login**

- Validate Hyprland: `Hyprland --version`
- Check logs under `~/.cache/hyprland` / journal: `journalctl --user -b -u hyprland`

**Fish config not loading**

- Confirm shell: `echo $SHELL` and `chsh -s /usr/bin/fish`
- Test config: `fish -l`

**Broken symlinks**

- Re-run `./install.sh` from the cloned repo directory (absolute paths via `$(pwd)`)

**Waybar modules missing**

- Install `waybar` and ensure `~/.config/waybar/config.jsonc` points at this repo
- Temperature needs a valid `thermal-zone` for your hardware

## Credits

- [Hyprland](https://hyprland.org/)
- [Catppuccin](https://catppuccin.com/)
- [Fish](https://fishshell.com/)
- [Foot](https://codeberg.org/dnkl/foot)
- [Starship](https://starship.rs/)
- [Waybar](https://github.com/Alexays/Waybar)

## License

MIT — use, modify, and share freely.
