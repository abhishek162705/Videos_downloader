"""
Modules Package
Contains all the core functionality modules for video processing
"""

# Core modules - always import
from .downloader import VideoDownloader, download_video

# Optional modules - may fail if dependencies not installed
try:
    from .video_processor import VideoProcessor
except ImportError:
    VideoProcessor = None

try:
    from .subtitle_generator import SubtitleGenerator
except ImportError:
    SubtitleGenerator = None

try:
    from .uploader import TikTokUploader, upload_to_tiktok
except ImportError:
    TikTokUploader = None
    upload_to_tiktok = None

__all__ = [
    'VideoDownloader',
    'download_video',
    'VideoProcessor',
    'SubtitleGenerator',
    'TikTokUploader',
    'upload_to_tiktok',
]
