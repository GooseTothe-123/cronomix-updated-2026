# ⏳✨ Cronomix (2026 Enhanced Edition) ✨⏳

> **The ultimate all-in-one productivity power tool for GNOME Shell!**  
> *Timers ⏱️ • Stopwatches ⏱️ • Pomodoro 🍅 • Alarms ⏰ • Todo 📝 • Time Tracker 📊 • Flashcards 🎴*

---

### 💖 Credits & Acknowledgments
> 🪄 **Original Creator**: Designed & crafted by the awesome **[zagortenay333](https://github.com/zagortenay333)** ([Original Repository](https://github.com/zagortenay333/cronomix)).  
> 🌟 **2026 Enhanced Edition**: Upgraded for modern GNOME 45–50+ compatibility, MacTahoe theme polish, and new top bar collage layout modes!

---

![preview](./data/images/screenshots/todo.png)

## 🌟 Whimsical Features & Cool Stuff

- 🚀 **GNOME Shell 45 – 50+ Ready**: Works seamlessly on the latest GNOME Shell releases!
- 🎨 **Adaptive Theme Magic**: Automatically detects Dark & Light desktop modes (with zero-headache support for custom themes like **MacTahoe GTK Theme**).
- 🧩 **Top Bar Collaging**:
  - 💥 *Separate Mode*: Give every applet its own shiny top bar button!
  - 🪄 *Single Combined Mode*: Collage all applets into **one master button** with a slick tabbed dropdown menu!
- ⚡ **Lightweight & Supercharged**: Instant tab switching, keyboard shortcuts, and crisp audio notifications!

---

## ⚙️ How to Access Settings ⚙️

> 💡 **Pro-Tip for Quick Access**:
> - 🖱️ **Right-click** any of the Cronomix applet icons/logos on your top panel and select **Settings**!
> - ⚙️ Or click the wrench icon (**⚙️**) inside any dropdown menu or tab header!

Inside the settings portal, you can:
- 🎛️ Enable or disable individual applets (`Todo` 📝, `Alarm` ⏰, `Timer` ⏱️, `Pomodoro` 🍅, `Stopwatch` ⏱️, `Flashcards` 🎴).
- 🪄 Switch **Top bar button layout** (`Separate buttons` vs. `Single combined menu button`).
- 🎨 Personalize theme CSS files and custom list page sizes!

---

## 🚀 Step-by-Step Installation & Build Guide 🚀

### 📦 Step 1: Grab Build Dependencies
Make sure you have Node.js, npm, and gettext ready on your system:

**Fedora / RHEL:**
```bash
sudo dnf install nodejs gettext
```

**Ubuntu / Debian / Pop!_OS:**
```bash
sudo apt update && sudo apt install nodejs npm gettext
```

---

### 📦 Step 2: Clone the Repo 🐙
```bash
git clone https://github.com/fuckyou-c0rp/cronomix-updated-2026.git
cd cronomix-updated-2026
```

---

### 📦 Step 3: Magic Build 🪄
Run the build script to compile all TypeScript magic and package assets straight into your local GNOME extensions directory:
```bash
./scripts/build
```

---

### 📦 Step 4: Refresh GNOME Shell 🔄
Let GNOME Shell discover your shiny new extension:

- **Wayland (Default)**: Log out of your desktop session and log back in 🚪
- **X11**: Press <kbd>Alt</kbd> + <kbd>F2</kbd>, type `r`, and hit <kbd>Enter</kbd> ⌨️

---

### 📦 Step 5: Enable & Enjoy! 🎉
Activate Cronomix from your terminal:
```bash
gnome-extensions enable cronomix@zagortenay333
```
*(Or flip the toggle in the **Extension Manager** app!)*

---

## 📜 License & Credits

- 🎨 **Original Author**: [zagortenay333](https://github.com/zagortenay333)
- 🔗 **Original Project**: [zagortenay333/cronomix](https://github.com/zagortenay333/cronomix)
- ⚖️ **License**: MIT License
