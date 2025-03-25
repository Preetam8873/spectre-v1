"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import VideoPlayer from "@/components/VideoPlayer"
import VideoInfo from "@/components/VideoInfo"
import RelatedVideos from "@/components/RelatedVideos"
import { videos } from "@/lib/data"

export default function VideoPage() {
  const params = useParams()
  const videoId = Number.parseInt(params.id as string)
  const [video, setVideo] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
      document.body.classList.add("light-mode")
    }

    // Find the current video
    const currentVideo = videos.find((v) => v.id === videoId)
    setVideo(currentVideo)

    // Get related videos (excluding current video)
    if (currentVideo) {
      const related = videos.filter((v) => v.id !== videoId).slice(0, 10) // Limit to 10 related videos
      setRelatedVideos(related)
    }
  }, [videoId])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle("light-mode")
    localStorage.setItem("theme", isDarkMode ? "light" : "dark")
  }

  if (!video) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <VideoPlayer video={video} />
            <VideoInfo video={video} />
          </div>

          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-bold mb-4">Related Videos</h3>
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </div>
    </div>
  )
}

