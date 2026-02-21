"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Download,
  CheckCircle,
  FileVideo,
  RefreshCw,
  Clock,
  HardDrive,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api, FileInfo } from "@/lib/api"

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

interface FileListProps {
  type: 'downloads' | 'processed'
}

export function FileList({ type }: FileListProps) {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFiles = async () => {
    setLoading(true)
    try {
      const data = type === 'downloads'
        ? await api.getDownloadedFiles()
        : await api.getProcessedFiles()
      setFiles(data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
    const interval = setInterval(fetchFiles, 10000) // Refresh every 10s
    return () => clearInterval(interval)
  }, [type])

  const isDownloads = type === 'downloads'

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            {isDownloads ? (
              <Download className="h-5 w-5 text-blue-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            {isDownloads ? 'Downloaded' : 'Processed'}
          </CardTitle>
          <CardDescription>
            {files.length} {files.length === 1 ? 'file' : 'files'}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchFiles} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
              <FileVideo className="h-10 w-10 mb-2 opacity-50" />
              <p className="text-sm">No files yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${isDownloads ? 'bg-blue-500/10' : 'bg-green-500/10'}`}>
                    <FileVideo className={`h-4 w-4 ${isDownloads ? 'text-blue-500' : 'text-green-500'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        {formatBytes(file.size)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(file.modified)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
