# TikTok Download Troubleshooting

## The Problem

TikTok has anti-bot protections that can cause download errors:

```
ERROR: [TikTok] Video not available, status code 0
```

Below are solutions ordered from easiest to most involved.

---

## Solution 1: Use Chrome Cookies (Recommended)

The system automatically extracts cookies from Chrome.

### Steps:
1. Open **Chrome** and go to https://www.tiktok.com
2. **Log in** to your TikTok account
3. **Navigate** to the video you want to download and let it load
4. Go back to the app and retry the download

### Important:
- Chrome must be **closed** when running the download
- yt-dlp needs direct access to Chrome's cookie storage

---

## Solution 2: Export Cookies Manually

If Solution 1 doesn't work, export cookies manually.

See the full [Cookie Export Guide](COOKIES_GUIDE.md) for detailed steps.

Quick version:
1. Install the "Get cookies.txt LOCALLY" Chrome extension
2. Log in to TikTok
3. Export cookies and save to `cookies/tiktok_cookies.txt`
4. Restart the application

---

## Solution 3: Use a Different Browser

Edit `modules/downloader.py` and change the browser source:

```python
# Find this line:
'cookiesfrombrowser': ('chrome',)

# Change to your browser:
'cookiesfrombrowser': ('firefox',)  # or 'edge', 'opera', 'brave', 'vivaldi', 'safari'
```

Supported browsers: `chrome`, `firefox`, `edge`, `opera`, `brave`, `vivaldi`, `safari` (macOS only)

---

## Solution 4: Try Alternative URL Formats

TikTok has multiple URL formats. Try converting:

| Format | Example |
|---|---|
| Standard | `https://www.tiktok.com/@username/video/7575269424215772423` |
| Mobile | `https://vm.tiktok.com/VIDEO_ID` |
| Direct | `https://www.tiktok.com/video/7575269424215772423` |

---

## Solution 5: Manual Download

If nothing works, use an external service:

1. **SnapTik.app**: https://snaptik.app
2. **SaveTik.co**: https://savetik.co
3. **TikMate.app**: https://tikmate.app

Download the video manually and place it in the `downloads/` folder.

---

## General Tips

### Update yt-dlp Regularly

TikTok changes its API frequently. Update weekly:

```bash
pip install -U yt-dlp
```

### Check Video Availability

Private or restricted videos cannot be downloaded. Ensure the video is public.

### Use a VPN

TikTok may block by region. Try a US-based VPN.

### Rate Limiting

If downloading many videos in sequence, wait ~30 seconds between downloads.

---

## Verify Your Setup

```bash
# Check yt-dlp version
yt-dlp --version

# Test a download
yt-dlp --cookies-from-browser chrome -o test.mp4 "VIDEO_URL"
```

## Still Not Working?

1. Check [yt-dlp issues](https://github.com/yt-dlp/yt-dlp/issues) for known TikTok problems
2. Include your yt-dlp version (`yt-dlp --version`) and the full error message
3. TikTok issues are often fixed within days by the yt-dlp team
