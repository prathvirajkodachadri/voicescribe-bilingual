# VoiceScribe Bilingual — EN ⇄ JA (GitHub Pages + Google Sites)

**Speak in English *or* Japanese → See BOTH languages instantly.  
Mic also listens to computer sound (Meet/Zoom/YouTube) when you enable System Audio capture.**

This is a **ready-to-deploy website** for GitHub Pages. It can also be embedded inside **Google Sites**.

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

### 🔗 Embed inside Google Sites

Google Sites doesn't allow heavy custom JS directly, but you can embed your GitHub Pages site:

1. Deploy to GitHub Pages first (above)
2. In Google Sites → **Insert → Embed → By URL**
3. Paste your GitHub Pages URL: `https://YOURUSERNAME.github.io/voicescribe-bilingual/`
4. Or **Insert → Embed → Embed code** and paste:
```html
<iframe src="https://YOURUSERNAME.github.io/voicescribe-bilingual/" width="100%" height="750" frameborder="0" allow="microphone; display-capture; clipboard-write"></iframe>
```
5. **Important:** In Google Sites, you must check `allow="microphone; display-capture"` — otherwise mic will be blocked.

Alternative: Upload `index.html` directly via **Google Sites → Embed → Upload** (if your Workspace allows HTML embed).

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
