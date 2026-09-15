# Cronomix (Updated Edition for Modern GNOME Shell)

**The ultimate all-in-one timer, stopwatch, pomodoro, alarm, todo, time tracker, and flashcards GNOME Shell extension.**

[![GNOME Shell 45-50+](https://img.shields.io/badge/GNOME%20Shell-45--50%2B-blue?style=for-the-badge&logo=gnome)](https://github.com/fuckyou-c0rp/cronomix-updated-2026)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/fuckyou-c0rp/cronomix-updated-2026)
[![MacTahoe GTK](https://img.shields.io/badge/MacTahoe%20GTK-Compatible-orange?style=for-the-badge)](https://github.com/fuckyou-c0rp/cronomix-updated-2026)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://github.com/fuckyou-c0rp/cronomix-updated-2026)

> [!NOTE]
> **Respect to the Original Creator**: Full credit and massive respect to **[zagortenay333](https://github.com/zagortenay333)** ([Original Repository](https://github.com/zagortenay333/cronomix)) for building this fucking awesome extension in the first place. You are a legendary dev. This repo is an updated fork keeping this shit running on modern GNOME Shell releases.

![preview](./data/images/screenshots/todo.png)

---

## What the Fuck is This? (Overview & Features)

- **GNOME Shell 45–50+ Compatible**: Fixed the broken shit so it actually works on modern GNOME Shell versions (45, 46, 47, 48, 49, 50+) without crashing like a moron.
- **MacTahoe & Custom Theme Compatibility**: Fixed light/dark mode auto-detection so light themes (like **MacTahoe GTK Theme**) don't show unreadable white text on light backgrounds like an asshole.
- **Top Bar Layout Modes**:
  - **`Separate buttons`**: Show every single applet icon in the top panel if you want your bar filled with shit.
  - **`Single combined menu button`**: Collage all your applets into one single master button with a slick tabbed dropdown menu so your top panel doesn't look like a cluttered dick.

---

## How to Access Settings (Read This Shit)

> [!TIP]
> **Don't Be a Moron — Accessing Settings**:
> - **Right-click** any of the Cronomix applet logos/icons in your top bar and click **Settings**.
> - Or click the wrench icon (**⚙**) inside any applet dropdown menu or combined tab header.

Inside the settings portal, you can:
- Enable or disable whatever applets you give a fuck about (`Todo`, `Alarm`, `Timer`, `Pomodoro`, `Stopwatch`, `Flashcards`).
- Change the **Top bar button layout** (`Separate buttons` vs `Single combined menu button`).
- Tweak custom theme CSS files and lazy list page size options so your desktop doesn't run like shit.

---

## Step-by-Step Installation & Build Guide

### Step 1: Install Build Dependencies
Get your system dependencies installed so the build doesn't throw a bitch fit:

**openSUSE (Tumbleweed / Leap):**
```bash
sudo zypper install nodejs npm gettext-tools
```

**Arch Linux / Manjaro:**
```bash
sudo pacman -S nodejs npm gettext
```

**Fedora / RHEL:**
```bash
sudo dnf install nodejs gettext
```

**Ubuntu / Debian / Pop!_OS:**
```bash
sudo apt update && sudo apt install nodejs npm gettext
```

---

### Step 2: Clone this Shit
```bash
git clone https://github.com/fuckyou-c0rp/cronomix-updated-2026.git
cd cronomix-updated-2026
```

---

### Step 3: Build the Code
Run the build script to compile the TypeScript sources into JavaScript and install the build to your local extensions directory:
```bash
./scripts/build
```
*(Outputs the compiled extension files directly to `~/.local/share/gnome-shell/extensions/cronomix@zagortenay333`)*

---

### Step 4: Reload GNOME Shell
GNOME Shell needs to index the new extension directory on startup:
- **Wayland**: Log out of your desktop session and log back in.
- **X11**: Press <kbd>Alt</kbd> + <kbd>F2</kbd>, type `r`, and hit <kbd>Enter</kbd>.

---

### Step 5: Enable the Extension
Enable the extension via CLI:
```bash
gnome-extensions enable cronomix@zagortenay333
```
*(Or flip the toggle in the **Extension Manager** app)*

---

## Credits & License

- **Original Author**: [zagortenay333](https://github.com/zagortenay333) (Huge respect to the original mastermind!)
- **Original Project**: [zagortenay333/cronomix](https://github.com/zagortenay333/cronomix)
- **License**: MIT License
