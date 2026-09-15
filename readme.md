# Cronomix (Updated 2026 Edition)

**All-in-one timer, stopwatch, pomodoro, alarm, todo, time tracker, and flashcards GNOME Shell extension.**

> [!NOTE]
> **Credits & Attribution**: This extension is an updated fork of the original **Cronomix** extension created by **[zagortenay333](https://github.com/zagortenay333)** ([Original Repository](https://github.com/zagortenay333/cronomix)).

![preview](./data/images/screenshots/todo.png)

---

## Overview & Features

- **Modern GNOME Shell Support**: Compatible with GNOME Shell **45, 46, 47, 48, 49, and 50+**.
- **Theme & MacTahoe Compatibility**: Automatic system dark/light theme detection with full support for custom GTK/Shell themes (including **MacTahoe GTK Theme**).
- **Flexible Top Bar Layout**: Choose between individual top bar buttons for each applet or a **Single Combined Menu Button** with a tabbed interface.

---

## How to Access Extension Settings

> **To access the settings for the extension**:
> - **Right-click** any of the Cronomix applet icons/logos in the top bar and select **Settings**.
> - Alternatively, click the wrench icon (**⚙**) inside any applet menu or combined tab bar.

In the settings menu, you can:
- Enable or disable individual applets (`Todo`, `Alarm`, `Timer`, `Pomodoro`, `Stopwatch`, `Flashcards`).
- Change the **Top bar button layout**:
  - **`Separate buttons`**: Shows individual icons for each applet in the top panel.
  - **`Single combined menu button`**: Collages all applets into one single top bar button with a tabbed dropdown menu.
- Custom theme CSS selection & lazy list page size options.

---

## Step-by-Step Build & Installation Guide

### Step 1: Install Build Dependencies
Ensure you have Node.js, npm, and gettext installed on your system:

**Fedora / RHEL:**
```bash
sudo dnf install nodejs gettext
```

**Ubuntu / Debian:**
```bash
sudo apt update && sudo apt install nodejs npm gettext
```

---

### Step 2: Clone the Repository
Clone your fork to your local machine:
```bash
git clone https://github.com/fuckyou-c0rp/cronomix-updated-2026.git
cd cronomix-updated-2026
```

---

### Step 3: Build the Extension
Run the build script to compile TypeScript files and copy assets into your GNOME extensions directory:
```bash
./scripts/build
```
*(This automatically compiles all `.ts` files into `.js` bundle files and places them in `~/.local/share/gnome-shell/extensions/cronomix@zagortenay333`)*

---

### Step 4: Reload GNOME Shell
GNOME Shell needs to index the newly installed extension directory on startup:

- **Wayland (Default on modern GNOME)**: Log out of your desktop session and log back in.
- **X11**: Press <kbd>Alt</kbd> + <kbd>F2</kbd>, type `r`, and press <kbd>Enter</kbd>.

---

### Step 5: Enable the Extension
Once logged back in, enable the extension using the command line:
```bash
gnome-extensions enable cronomix@zagortenay333
```
*(Or enable **Cronomix** using the **Extension Manager** / **Extensions** GUI app)*

---

## Credits & License

- **Original Author**: [zagortenay333](https://github.com/zagortenay333)
- **Original Project**: [zagortenay333/cronomix](https://github.com/zagortenay333/cronomix)
- **License**: MIT License
