# VoiceScribe Bilingual — EN ⇄ JA (GitHub Pages)

**Speak in English *or* Japanese → See BOTH languages instantly.  
Mic also listens to computer sound (Meet/Zoom/YouTube) when you enable System Audio capture.**

This is a **ready-to-deploy standalone website** for GitHub Pages. Open its HTTPS URL directly in your browser; no Google Sites embed is needed.

---

### ✨ Features for Japanese Collaboration
- 🎤 **One Mic Button listens for BOTH English & Japanese** — auto-detects which you spoke
- 🇺🇸🇯🇵 **Dual Output:** Left = English, Right = Japanese. Always both, no need to pick source/target
- 🖥️ **Capture Computer Sound:** Click "Capture System Audio" → Share the Meet/Zoom/YouTube tab → Mic hears your colleague's voice too
- 🔄 Auto-translate, continuous listening, live preview
- 📋 Copy / 🔊 Listen / 📤 Share / 🕘 History
- 📱 Works on phone + laptop, installable as app (PWA)

---

### 🚀 Deploy to GitHub Pages (2 minutes)

1. Create a new GitHub repo named `voicescribe-bilingual` (public)
2. Upload all files in this folder (`index.html`, `manifest.json`, `icon-192.png`, `README.md`)
3. Go to Repo → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / `root` → **Save**
4. Wait 30 sec → Your site is live at `https://YOURUSERNAME.github.io/voicescribe-bilingual/`

> That's it! Send that link to your Japanese team — no install needed. They open it in Chrome and it works.

### 🔗 Use the website directly

After deployment, open `https://YOURUSERNAME.github.io/voicescribe-bilingual/` directly in your browser.
For computer-sound capture, use desktop Chrome or Edge over HTTPS and allow screen sharing when prompted. Mobile browsers may not support computer-sound capture.

---

### 🎧 How to make Mic hear COMPUTER sound (Meet/Zoom)

Browsers block system audio for privacy, so we give you 2 working options:

**Option A: One-click System Audio Capture (Recommended for meetings)**
1. On the site, click **🖥️ Capture Computer Sound**
2. Chrome popup: Select the **Tab/Window** where your colleague is speaking (e.g., Google Meet)
3. **✅ CHECK "Share system audio"** at bottom-left (very important)
4. Click Share → Now the site listens to *both* your mic AND the computer sound
5. Speak in English or Japanese → see both translations

**Option B: Enable Stereo Mix (Windows) / BlackHole (Mac) — permanent**
- **Windows:** Control Panel → Sound → Recording → Right-click → Show Disabled Devices → Enable **Stereo Mix** → Set as Default
- **Mac:** Install BlackHole (free) → Audio MIDI Setup → Create Multi-Output Device
- Then our normal Mic button will hear computer output through speakers

> For best results with Japanese colleagues on **Google Meet**: Use **Chrome Extension version** (we also include it) — it can directly capture Meet tab audio via `tabCapture`.

---

### 📂 Files Included
- `index.html` — Full bilingual app (single-file, easy to host)
- `manifest.json` + icons — Makes it installable as phone app
- `README.md` — This guide

### 🔧 How Bilingual Detection Works
We auto-detect language: If text contains Hiragana/Katakana/Kanji (`[\u3040-\u30FF\u4E00-\u9FFF]`) → Japanese else English. Then we translate to the *other* language automatically via MyMemory API (free). You can also force direction.

### 🌐 For Kannada?
Your original request included Kannada. This bilingual site defaults to EN↔JA for your work, but you can change the `targetLangs` array in `index.html` to add `kn` anytime.

---

Made for cross-language teamwork — Hyderabad ⇄ Japan
