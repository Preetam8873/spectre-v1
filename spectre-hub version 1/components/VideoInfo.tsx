"use client"

import { useState } from "react"
import { Share, ThumbsUp, ThumbsDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ShareModal from "./ShareModal"
import CommentSection from "./CommentSection"

export default function VideoInfo({ video }) {
  const [likes, setLikes] = useState(Number.parseInt(video.likes) || 0)
  const [dislikes, setDislikes] = useState(0)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const handleLike = () => {
    setLikes(likes + 1)
  }

  const handleDislike = () => {
    setDislikes(dislikes + 1)
  }

  const handleShare = () => {
    setIsShareModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{video.title}</h1>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          {video.views} views • {video.uploadDate}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleLike}>
            <ThumbsUp className="h-4 w-4 mr-2" />
            <span>{likes}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleDislike}>
            <ThumbsDown className="h-4 w-4 mr-2" />
            <span>{dislikes}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4 mr-2" />
            <span>Share</span>
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-1">Uploaded by {video.uploader}</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{video.description}</p>
        </CardContent>
      </Card>

      <CommentSection videoId={video.id} />

      {isShareModalOpen && (
        <ShareModal
          videoUrl={`${window.location.origin}/video/${video.id}`}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  )
}

