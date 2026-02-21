"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Download,
  CheckCircle,
  Zap,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { api } from "@/lib/api"

export function StatsCards() {
  const [downloadCount, setDownloadCount] = useState(0)
  const [processedCount, setProcessedCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [downloads, processed] = await Promise.all([
          api.getDownloadedFiles(),
          api.getProcessedFiles()
        ])
        setDownloadCount(downloads.files.length)
        setProcessedCount(processed.files.length)
      } catch (error) {
        console.error('Error fetching counts:', error)
      }
    }

    fetchCounts()
    const interval = setInterval(fetchCounts, 10000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      title: "Downloaded",
      value: downloadCount,
      icon: Download,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Processed",
      value: processedCount,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Success Rate",
      value: downloadCount > 0 ? Math.round((processedCount / downloadCount) * 100) : 0,
      suffix: "%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Status",
      value: "Ready",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      isText: true,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">
                  {stat.isText ? stat.value : (
                    <>
                      {stat.value}
                      {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
                    </>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
