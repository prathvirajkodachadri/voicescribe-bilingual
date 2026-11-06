# VoiceScribe Bilingual — EN ⇄ JA ⇄ KN (GitHub Pages)

**Type or speak English, Japanese or Kannada → See all three languages.
Mic also listens to computer sound (Meet/Zoom/YouTube) when you enable System Audio capture.**

This is a **ready-to-deploy standalone website** for GitHub Pages. Open its HTTPS URL directly in your browser; no Google Sites embed is needed.

---

### ✨ Features for Japanese Collaboration
- 🎤 **Three speech languages** — select English, Japanese or Kannada before listening (browser support varies)
- 🇺🇸🇯🇵 **Three editable panels:** English, Japanese and Kannada. Edit any one to translate into the other two
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
5. Select your speech language, then speak → see all three languages

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

### 🔧 Language detection and editing

Type in any language panel to translate into the other two after a short pause. Source text, cursor and spacing are preserved. Use the one-tap **English / 日本語 / ಕನ್ನಡ** switch to choose the source for both speech and quick typing. Switching preserves existing drafts and stops active listening; tap the microphone again when ready. Text entered in a language panel is always interpreted as that panel’s language.

Choose **English**, **日本語**, or **ಕನ್ನಡ** using the language switch before speaking. There is no automatic spoken-language detection; select the correct speech language before listening. Speech recognition support depends on your browser and speech provider. Kannada read-aloud requires an installed Kannada voice.

All three languages are included in local drafts, history, Copy All, sharing, TXT and CSV exports. Older English/Japanese drafts remain compatible.

---

Made for cross-language teamwork — Hyderabad ⇄ Japan

### Translation service and accuracy

Translations now go directly from the selected source to each target using the existing Google web translation endpoint. Translation-memory results are no longer silently substituted. Malformed or failed responses are marked as failures, and old target text is cleared rather than shown as a new translation.

This is an unofficial browser endpoint, not a supported production API, and may be blocked or rate-limited. Machine translation can still be inaccurate, particularly for romanized input, names, and short phrases. Production-grade availability requires a supported translation API behind a backend; never put provider secrets in this static site. Automated tests use mocked responses and check routing and state handling, not linguistic accuracy.

Translation requests use AbortController cancellation and a 15-second timeout. Editing or changing source cancels obsolete requests; version checks also prevent late responses from replacing newer drafts.
