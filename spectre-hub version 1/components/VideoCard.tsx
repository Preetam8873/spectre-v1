"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VideoCard({ video, index }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const truncatedDescription =
    video.description.length > 100 ? video.description.substring(0, 100) + "..." : video.description

  return (
    <div
      ref={cardRef}
      className={cn(
        "group bg-card rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl hover:translate-y-[-8px]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <Link href={`/video/${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={video.thumbnail || "/placeholder.svg"}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.views} views
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{video.uploader}</p>
          <p className="text-xs text-muted-foreground mt-1">{video.uploadDate}</p>
          <div
            className={cn(
              "text-xs text-muted-foreground mt-2 transition-all duration-300",
              isExpanded ? "" : "line-clamp-2",
            )}
            onClick={(e) => {
              e.preventDefault()
              setIsExpanded(!isExpanded)
            }}
          >
            {video.description}
          </div>
        </div>
      </Link>
    </div>
  )
}

