"use client"

import { useState, useEffect } from "react"
import VideoCard from "./VideoCard"

export default function VideoGrid({ videos }) {
  const [visibleVideos, setVisibleVideos] = useState([])

  useEffect(() => {
    // Add animation delay for staggered appearance
    const timer = setTimeout(() => {
      setVisibleVideos(videos)
    }, 100)

    return () => clearTimeout(timer)
  }, [videos])

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">No videos found</h2>
        <p className="text-muted-foreground">Try searching for something else</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {visibleVideos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  )
}

