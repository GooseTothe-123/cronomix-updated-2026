# Cronomix

**All-in-one timer, stopwatch, pomodoro, alarm, todo, time tracker and flashcards gnome-shell extension.**

![preview](./data/images/screenshots/todo.png)

## Overview & Features

- **GNOME Shell Support**: Works on GNOME Shell 45, 46, 47, 48, 49, 50+.
- **Theme Compatibility**: Automatic dark/light theme detection with full support for custom GTK/Shell themes (such as **MacTahoe GTK Theme**).
- **Flexible Top Bar Layout**: Choose between individual panel buttons for each applet or a **Single Combined Menu Button** with a tabbed interface.

## How to Access Settings

> **To access the extension settings**:
> - **Right-click** any of the Cronomix applet icons/logos in the top bar and select **Settings**.
> - Alternatively, click the wrench icon (**⚙**) inside any applet menu or combined tab header.

In the settings menu, you can:
- Enable or disable individual applets (`Todo`, `Alarm`, `Timer`, `Pomodoro`, `Stopwatch`, `Flashcards`).
- Change the **Top bar button layout** (`Separate buttons` vs. `Single combined menu button`).
- Custom theme CSS selection & lazy list page size.

## Installation

1. **Manual Installation**:
   - Clone or download this repository.
   - Run `./scripts/build` to build the extension.
   - The compiled files will be installed to `~/.local/share/gnome-shell/extensions/cronomix@zagortenay333`.
   - Log out and log back in to reload GNOME Shell.
   - Enable the extension via:
     ```bash
     gnome-extensions enable cronomix@zagortenay333
     ```
     or using the **Extension Manager** app.

## Contributing

- Before reporting a bug, check you have a supported GNOME Shell version.
- If you want to build the project, run `./scripts/build`.
