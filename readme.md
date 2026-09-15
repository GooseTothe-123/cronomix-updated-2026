# Cronomix (Updated Edition)

**All-in-one timer, stopwatch, pomodoro, alarm, todo, time tracker, and flashcards GNOME Shell extension.**

> [!NOTE]
> **Credits & Attribution**: This extension is an updated fork of **Cronomix**, originally created by **[zagortenay333](https://github.com/zagortenay333)** ([Original Repository](https://github.com/zagortenay333/cronomix)).

![preview](./data/images/screenshots/todo.png)

---

## Overview & Features

- **GNOME Shell 45–50+ Compatibility**: Full support for modern GNOME Shell releases.
- **Theme & MacTahoe Compatibility**: Automatic system dark/light theme detection with full support for custom GTK/Shell themes (such as **MacTahoe GTK Theme**).
- **Flexible Top Bar Layout**: Choose between individual panel buttons for each applet or a **Single Combined Menu Button** with a tabbed interface.

---

## Accessing Extension Settings

> [!TIP]
> **Quick Access to Settings**:
> - **Right-click** any of the Cronomix applet icons in the top bar and select **Settings**.
> - Alternatively, click the wrench icon (**⚙**) inside any applet menu or combined tab header.

In the settings menu, you can:
- Enable or disable individual applets (`Todo`, `Alarm`, `Timer`, `Pomodoro`, `Stopwatch`, `Flashcards`).
- Change the **Top bar button layout**:
  - **`Separate buttons`**: Individual top bar buttons for each applet.
  - **`Single combined menu button`**: Collages all enabled applets into a single top bar button with a tabbed dropdown menu.
- Custom theme CSS selection & lazy list page size options.

---

## Step-by-Step Build & Installation Guide

### Step 1: Install Build Dependencies
Ensure Node.js, npm, and gettext are installed on your system:

**Fedora / RHEL:**
```bash
sudo dnf install nodejs gettext
```

**Ubuntu / Debian / Pop!_OS:**
```bash
sudo apt update && sudo apt install nodejs npm gettext
```

---

### Step 2: Clone the Repository
```bash
git clone https://github.com/fuckyou-c0rp/cronomix-updated-2026.git
cd cronomix-updated-2026
```

---

### Step 3: Build the Extension
Run the build script to compile TypeScript files and install assets to your local GNOME extensions folder:
```bash
./scripts/build
```
*(Files are output to `~/.local/share/gnome-shell/extensions/cronomix@zagortenay333`)*

---

### Step 4: Reload GNOME Shell
- **Wayland (Default)**: Log out of your desktop session and log back in.
- **X11**: Press <kbd>Alt</kbd> + <kbd>F2</kbd>, type `r`, and press <kbd>Enter</kbd>.

---

### Step 5: Enable the Extension
```bash
gnome-extensions enable cronomix@zagortenay333
```
*(Or enable **Cronomix** using the **Extension Manager** app)*

---

## Credits & License

- **Original Author**: [zagortenay333](https://github.com/zagortenay333)
- **Original Project**: [zagortenay333/cronomix](https://github.com/zagortenay333/cronomix)
- **License**: MIT License
