"use client"

import { useState, useEffect } from "react"

export default function VideoPlayer({ video }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
  }, [video.url])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black mb-4">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src={video.url}
        className="w-full h-full"
        allowFullScreen
        onLoad={handleIframeLoad}
        title={video.title}
      ></iframe>
    </div>
  )
}

