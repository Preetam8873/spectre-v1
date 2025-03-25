"use client"

import { useState, useEffect } from "react"
import VideoGrid from "@/components/VideoGrid"
import Header from "@/components/Header"
import { videos } from "@/lib/data"

export default function Home() {
  const [filteredVideos, setFilteredVideos] = useState(videos)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
      document.body.classList.add("light-mode")
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle("light-mode")
    localStorage.setItem("theme", isDarkMode ? "light" : "dark")
  }

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredVideos(videos)
      return
    }

    const filtered = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.uploader.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredVideos(filtered)
  }

  return (
    <main className="min-h-screen">
      <Header onSearch={handleSearch} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <section className="video-grid container mx-auto px-4 py-6">
        <VideoGrid videos={filteredVideos} />
      </section>
    </main>
  )
}

