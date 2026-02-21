import { ViralAutomation } from "@/components/viral-automation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Viral Content Automation - TikTok, Instagram, YouTube",
  description:
    "Automate viral content creation. Download videos from TikTok, Instagram, YouTube Shorts. Process with AI subtitles, mirror effects, and auto-upload to TikTok.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ViralAutomation />
    </main>
  )
}
