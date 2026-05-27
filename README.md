# 🛡️ Manhwa Rescue

> *"For those who can't bring themselves to close a 7-hour YouTube video before it ends."*

**Manhwa Rescue** is a sleek browser extension designed to save your time and productivity from the ultimate pitfall: endless YouTube video recaps and autoplay playlists. 

If you've ever started a recap video "just for a few minutes" and found yourself still watching 3 hours later instead of working, this extension is your rescue team.

---

## ✨ Features

- **⚡ Instant Presets**: Set a timer for 20 minutes, 30 minutes, or 1 hour with a single click.
- **🕒 Custom 24-Hour Selector**: Pick an exact target time (forced 24h layout, bypassing browser-language AM/PM quirks) for your session to end.
- **🔒 Anti-Procrastination Lock**: Once a timer is active, the extension popup completely locks up. All inputs are disabled, showing a live, non-bypassable countdown to your rescue.
- **🛑 Smart URL Blocking**: When the timer expires, the active YouTube URL (video or full playlist) is blocked for **15 minutes**.
- **🎯 Playlist-Aware Interceptor**: Attempting to bypass the block by opening another video in the same playlist or reloading the page will redirect you straight back to the lock screen.
- **🔄 Auto-Release**: A beautiful, custom glassmorphic warning page handles the 15-minute countdown and redirects you automatically back to your video once the break is over.

---

## 🛠️ Installation

### 🦊 For Firefox (Developer & Local Load)

1. Open Firefox and type `about:debugging` in the address bar.
2. In the left menu, click on **This Firefox** (or *Ce Firefox*).
3. Click the **Load Temporary Add-on...** (or *Installer un module temporaire...*) button.
4. Select the `manifest.json` file inside your local **Manhwa Rescue** folder.

*Note: For a permanent installation, compress the folder contents into a `.zip` and submit it to [addons.mozilla.org (AMO)](https://addons.mozilla.org/developers/) as an **unlisted self-distributed add-on** to get your signed permanent `.xpi` file.*

### 🌐 For Chrome, Brave, and Edge

1. Go to `chrome://extensions/`.
2. Toggle the **Developer mode** switch in the top-right corner.
3. Click **Load unpacked** (or *Charger l'extension non empaquetée*) in the top-left.
4. Select the **Manhwa Rescue** folder.

---

## 📂 Project Structure

```text
├── manifest.json      # Extension metadata, permissions & service workers
├── popup.html         # Custom picker popup with premium styling
├── popup.js           # Live UI state restoration & countdown handling
├── background.js      # URL interception, alarms & dynamic blocking logic
├── content.js         # Video injection script (pauses active playback)
├── blocked.html       # The 15-minute break screen
├── blocked.js         # Time countdown and auto-redirect back to content
└── icons/             # Custom designed icons (16px, 48px, 128px)
```

---

## 💡 How It Works

1. Open any YouTube video.
2. Click the **Manhwa Rescue** extension icon 🧩.
3. Choose a duration or set an exact hour.
4. Click **Démarrer le chronomètre**.
5. *Focus on your work!*
6. Once the time is up, the active tab redirects to a gorgeous, glowing lock screen for exactly **15 minutes**. You cannot reload or watch any videos from that playlist.
7. Once the 15 minutes are up, the extension automatically loads the video back for you. Enjoy your guilt-free break!

---

## 📄 License

Created with ❤️ to rescue developers and students from procrastination.
