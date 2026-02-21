"""
Exportar cookies de TikTok desde el navegador
Ejecuta este script después de iniciar sesión en TikTok en tu navegador
"""

import subprocess
import sys
import os

def export_cookies():
    print("=" * 50)
    print("  EXPORTAR COOKIES DE TIKTOK")
    print("=" * 50)
    print()
    print("Este script exportará las cookies de TikTok desde tu navegador.")
    print("Asegúrate de haber iniciado sesión en TikTok en Chrome/Edge/Firefox.")
    print()

    # Detectar navegadores disponibles
    browsers = ['chrome', 'edge', 'firefox', 'brave', 'opera']

    print("Navegadores disponibles para exportar:")
    for i, browser in enumerate(browsers, 1):
        print(f"  {i}. {browser.capitalize()}")

    print()
    choice = input("Selecciona el navegador (1-5) o presiona Enter para Chrome: ").strip()

    if choice == "" or choice == "1":
        browser = "chrome"
    elif choice == "2":
        browser = "edge"
    elif choice == "3":
        browser = "firefox"
    elif choice == "4":
        browser = "brave"
    elif choice == "5":
        browser = "opera"
    else:
        browser = "chrome"

    cookies_file = os.path.join(os.path.dirname(__file__), "cookies", "tiktok_cookies.txt")
    os.makedirs(os.path.dirname(cookies_file), exist_ok=True)

    print(f"\nExportando cookies desde {browser.capitalize()}...")
    print("(Esto puede tomar unos segundos)")
    print()

    try:
        # Usar yt-dlp para exportar cookies
        cmd = [
            'yt-dlp',
            '--cookies-from-browser', browser,
            '--cookies', cookies_file,
            '--skip-download',
            '--no-warnings',
            'https://www.tiktok.com/@tiktok/video/7000000000000000000'  # URL dummy
        ]

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if os.path.exists(cookies_file) and os.path.getsize(cookies_file) > 100:
            print("✅ ¡Cookies exportadas exitosamente!")
            print(f"   Archivo: {cookies_file}")
            print()
            print("Ahora el sistema puede acceder a TikTok con tu sesión.")
            return True
        else:
            print("❌ No se pudieron exportar las cookies.")
            print("   Asegúrate de haber iniciado sesión en TikTok en tu navegador.")
            if result.stderr:
                print(f"   Error: {result.stderr[:200]}")
            return False

    except subprocess.TimeoutExpired:
        print("❌ Timeout al exportar cookies")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = export_cookies()
    print()
    input("Presiona Enter para cerrar...")
    sys.exit(0 if success else 1)
