# How to Export TikTok Cookies

TikTok requires authentication cookies for downloading videos. Here are three methods to export them.

## Method 1: Browser Extension (Recommended)

### Step 1: Install Extension

Install one of these extensions in Chrome/Edge:

- **Get cookies.txt LOCALLY** (recommended): [Chrome Web Store](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
- **cookies.txt**: [Chrome Web Store](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg)

### Step 2: Log in to TikTok

1. Go to https://www.tiktok.com
2. Log in with your account

### Step 3: Export Cookies

1. While on tiktok.com, click the extension icon
2. Click "Export" or "Download"
3. Save the file as `cookies/tiktok_cookies.txt` in the project root

### Step 4: Restart the Server

Close and reopen the backend for changes to take effect.

---

## Method 2: Use Edge Instead of Chrome

Edge sometimes works better for cookie extraction:

```bash
yt-dlp --cookies-from-browser edge --cookies cookies/tiktok_cookies.txt -F "https://www.tiktok.com/@tiktok"
```

---

## Method 3: Firefox (Most Compatible)

Firefox doesn't encrypt cookies like Chrome, making extraction more reliable:

1. Install Firefox if you don't have it
2. Log in to TikTok in Firefox
3. Run:

```bash
yt-dlp --cookies-from-browser firefox --cookies cookies/tiktok_cookies.txt -F "https://www.tiktok.com/@tiktok"
```

---

## Notes

- Cookie files are stored in the `cookies/` directory (gitignored for security)
- Cookies expire over time; re-export if downloads start failing
- Keep your browser **closed** when the app tries to extract cookies from it
