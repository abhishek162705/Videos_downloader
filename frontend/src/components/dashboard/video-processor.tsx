"use client"

import * as React from "react"
import { useState } from "react"
import {
  Link2,
  Eye,
  Loader2,
  Sparkles,
  Upload,
  FlipHorizontal,
  Gauge,
  Subtitles,
  Palette,
  Languages,
  Flame,
  CheckCircle2,
  AlertCircle,
  Play,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api, ProcessingOptions, VideoInfo } from "@/lib/api"

interface ProcessingState {
  status: 'idle' | 'loading' | 'processing' | 'success' | 'error';
  progress: number;
  message: string;
}

export function VideoProcessor() {
  const [url, setUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [description, setDescription] = useState("")
  const [transcription, setTranscription] = useState("")

  // Processing options
  const [reframe, setReframe] = useState(true)
  const [backgroundType, setBackgroundType] = useState<'blur' | 'solid'>('blur')
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [applyMirror, setApplyMirror] = useState(true)
  const [applySpeed, setApplySpeed] = useState(true)
  const [speedFactor, setSpeedFactor] = useState(1.02)
  const [generateSubtitles, setGenerateSubtitles] = useState(true)
  const [subtitleLanguage, setSubtitleLanguage] = useState("es")
  const [burnSubtitles, setBurnSubtitles] = useState(true)

  // State
  const [processing, setProcessing] = useState<ProcessingState>({
    status: 'idle',
    progress: 0,
    message: ''
  })
  const [previewLoading, setPreviewLoading] = useState(false)

  const handlePreview = async () => {
    if (!url.trim()) return

    setPreviewLoading(true)
    try {
      const info = await api.getVideoInfo(url)
      setVideoInfo(info)
    } catch (error) {
      console.error('Preview error:', error)
    } finally {
      setPreviewLoading(false)
    }
  }

  const handleProcess = async (autoUpload: boolean = false) => {
    if (!url.trim()) return
    if (autoUpload && !description.trim()) {
      alert('Please add a description for TikTok upload')
      return
    }

    setProcessing({ status: 'processing', progress: 10, message: 'Starting...' })

    try {
      const options: ProcessingOptions = {
        url,
        description,
        reframe,
        background_type: backgroundType,
        background_color: backgroundColor,
        apply_mirror: applyMirror,
        apply_speed: applySpeed,
        speed_factor: speedFactor,
        generate_subtitles: generateSubtitles,
        subtitle_language: subtitleLanguage,
        burn_subtitles: burnSubtitles,
        auto_upload: autoUpload,
      }

      setProcessing({ status: 'processing', progress: 30, message: 'Downloading video...' })

      const result = await api.processVideo(options)

      if (result.success) {
        setProcessing({ status: 'success', progress: 100, message: 'Completed!' })
        if (result.data?.transcription) {
          setTranscription(result.data.transcription)
        }
      } else {
        throw new Error(result.error || 'Processing failed')
      }
    } catch (error: any) {
      setProcessing({
        status: 'error',
        progress: 0,
        message: error.message || 'An error occurred'
      })
    }
  }

  const getPlatformBadge = (platform: string) => {
    const colors: Record<string, string> = {
      tiktok: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
      instagram: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      youtube: 'bg-red-500/10 text-red-500 border-red-500/20',
      facebook: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    }
    return colors[platform] || 'bg-gray-500/10 text-gray-500 border-gray-500/20'
  }

  return (
    <div className="space-y-6">
      {/* URL Input Section */}
      <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Video URL
          </CardTitle>
          <CardDescription>
            Paste a URL from TikTok, Instagram Reels, YouTube Shorts, or Facebook
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="https://tiktok.com/@user/video/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={previewLoading || !url.trim()}
            >
              {previewLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="ml-2 hidden sm:inline">Preview</span>
            </Button>
          </div>

          {/* Video Preview */}
          {videoInfo && videoInfo.success && (
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-start gap-4">
                {videoInfo.thumbnail && (
                  <img
                    src={videoInfo.thumbnail}
                    alt="Thumbnail"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{videoInfo.title}</h4>
                  <p className="text-sm text-muted-foreground">@{videoInfo.uploader}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className={getPlatformBadge(videoInfo.platform)}>
                      {videoInfo.platform}
                    </Badge>
                    {videoInfo.duration > 0 && (
                      <Badge variant="secondary">
                        {Math.floor(videoInfo.duration / 60)}:{(videoInfo.duration % 60).toString().padStart(2, '0')}
                      </Badge>
                    )}
                    {videoInfo.width > 0 && (
                      <Badge variant="secondary">
                        {videoInfo.width}x{videoInfo.height}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Options */}
      <Tabs defaultValue="video" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Video Options
          </TabsTrigger>
          <TabsTrigger value="subtitles" className="flex items-center gap-2">
            <Subtitles className="h-4 w-4" />
            Subtitles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Anti-Copyright Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reframe */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Reframe to 9:16
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Convert to vertical format for TikTok
                  </p>
                </div>
                <Switch checked={reframe} onCheckedChange={setReframe} />
              </div>

              {reframe && (
                <div className="ml-6 space-y-4 border-l-2 border-primary/20 pl-4">
                  <div className="space-y-2">
                    <Label>Background Type</Label>
                    <Select value={backgroundType} onValueChange={(v) => setBackgroundType(v as 'blur' | 'solid')}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blur">Blurred Background</SelectItem>
                        <SelectItem value="solid">Solid Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {backgroundType === 'solid' && (
                    <div className="flex items-center gap-3">
                      <Label>Color</Label>
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <span className="text-sm text-muted-foreground">{backgroundColor}</span>
                    </div>
                  )}
                </div>
              )}

              <Separator />

              {/* Mirror */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <FlipHorizontal className="h-4 w-4" />
                    Mirror Effect
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Flip video horizontally to avoid detection
                  </p>
                </div>
                <Switch checked={applyMirror} onCheckedChange={setApplyMirror} />
              </div>

              <Separator />

              {/* Speed */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Gauge className="h-4 w-4" />
                    Speed Change (1.02x)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Slight speed increase to bypass copyright
                  </p>
                </div>
                <Switch checked={applySpeed} onCheckedChange={setApplySpeed} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subtitles" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Subtitles className="h-5 w-5 text-primary" />
                AI Subtitles (Whisper)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generate Subtitles */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Generate Subtitles</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto-transcribe audio using Whisper AI
                  </p>
                </div>
                <Switch checked={generateSubtitles} onCheckedChange={setGenerateSubtitles} />
              </div>

              {generateSubtitles && (
                <>
                  <Separator />

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Audio Language
                    </Label>
                    <Select value={subtitleLanguage} onValueChange={setSubtitleLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="auto">Auto-detect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center gap-2">
                        <Flame className="h-4 w-4" />
                        Burn Subtitles
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently embed subtitles in video
                      </p>
                    </div>
                    <Switch checked={burnSubtitles} onCheckedChange={setBurnSubtitles} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Transcription Preview */}
          {transcription && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transcription</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            TikTok Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write a viral description with hashtags... #fyp #viral #trending"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Progress */}
      {processing.status !== 'idle' && (
        <Card className={
          processing.status === 'success' ? 'border-green-500/50 bg-green-500/5' :
          processing.status === 'error' ? 'border-red-500/50 bg-red-500/5' :
          'border-primary/50 bg-primary/5'
        }>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {processing.status === 'processing' && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
                {processing.status === 'success' && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {processing.status === 'error' && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">{processing.message}</span>
              </div>
              {processing.status === 'processing' && (
                <Progress value={processing.progress} className="h-2" />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          size="lg"
          className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          onClick={() => handleProcess(false)}
          disabled={processing.status === 'processing' || !url.trim()}
        >
          {processing.status === 'processing' ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Sparkles className="h-5 w-5 mr-2" />
          )}
          Process Video
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 border-primary/50 hover:bg-primary/10"
          onClick={() => handleProcess(true)}
          disabled={processing.status === 'processing' || !url.trim()}
        >
          <Upload className="h-5 w-5 mr-2" />
          Process & Upload to TikTok
        </Button>
      </div>
    </div>
  )
}
