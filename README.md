# 🛡️ Manhwa Rescue

> *"For those who can't bring themselves to close a 7-hour YouTube video before it ends."*

**Manhwa Rescue** is a sleek browser extension designed to save your time and productivity from the ultimate pitfall: endless YouTube video recaps and autoplay playlists. 

If you've ever started a recap video "just for a few minutes" and found yourself still watching 3 hours later instead of working, this extension is your rescue team.

---

## ✨ Features

- **Instant Presets**: Set a timer for 20 minutes, 30 minutes, or 1 hour with a single click.

- **Custom 24-Hour Selector**: Pick an exact target time (forced 24h layout, bypassing browser-language AM/PM quirks) for your session to end.

- **Anti-Procrastination Lock**: Once a timer is active, the extension popup completely locks up. All inputs are disabled, showing a live, non-bypassable countdown to your rescue.

- **Smart URL Blocking**: When the timer expires, the active YouTube video (identified by its unique video ID) is blocked for **15 minutes**.

- **Video ID Interceptor**: Attempting to bypass the block by reloading, accessing the raw video URL directly, or loading it from inside a playlist will be intercepted and redirected to the lock screen. Other playlist videos remain accessible, ensuring the block is strictly targeted to the specific video you were procrastinating on.

- **Focus Preservation Page**: A beautiful, custom glassmorphic warning page handles the 15-minute countdown. Unlike other blockers that pull you back immediately, **Manhwa Rescue does not automatically redirect you back** when the break is over. This preserves your workflow momentum! Once the countdown ends, a "Return to video" button appears so returning is a conscious, active choice.

---

## 🛠️ Installation

### Firefox

1. Open Firefox and type `about:debugging` in the address bar.
2. In the left menu, click on **This Firefox** (or *Ce Firefox*).
3. Click the **Load Temporary Add-on...** (or *Installer un module temporaire...*) button.
4. Select the `manifest.json` file inside your local **Manhwa Rescue** folder.

### Chrome based browsers

1. Go to `chrome://extensions/`.
2. Toggle the **Developer mode** switch in the top-right corner.
3. Click **Load unpacked** (or *Charger l'extension non empaquetée*) in the top-left.
4. Select the **Manhwa Rescue** folder.

---

## 📂 Project structure

```text
├── manifest.json      # Extension metadata, permissions & service workers
├── popup.html         # Custom picker popup with premium styling
├── popup.js           # Live UI state restoration & countdown handling
├── background.js      # URL interception, alarms & dynamic blocking logic
├── content.js         # Video injection script (pauses active playback)
├── blocked.html       # The 15-minute break screen
├── blocked.js         # Time countdown and focus celebration
└── icons/             # Custom designed icons (16px, 48px, 128px)
```

---

## 💡 How it works

1. Open any YouTube video.
2. Click the **Manhwa Rescue** extension icon 🧩.
3. Choose a duration or set an exact hour.
4. Click **Démarrer le chronomètre**.
5. *Focus on your work!*
6. Once the time is up, the active tab redirects to a gorgeous, glowing lock screen for exactly **15 minutes**. You cannot watch this specific video anywhere on YouTube.
7. Once the 15 minutes are up, the page celebrates your focus with a motivational message and displays a **Return to video** button. If you are in the flow of your work, you can keep working undisturbed!
