"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Reply, Trash } from "lucide-react"

type Comment = {
  id: string
  userId: string
  userName: string
  userImage?: string
  content: string
  likes: number
  dislikes: number
  createdAt: string
}

export default function CommentSection({ videoId }: { videoId: number }) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load comments from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments-${videoId}`)
    if (storedComments) {
      setComments(JSON.parse(storedComments))
    }
  }, [videoId])

  // Save comments to localStorage
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${videoId}`, JSON.stringify(comments))
    }
  }, [comments, videoId])

  const handleAddComment = () => {
    if (!user || !newComment.trim()) return

    setIsLoading(true)

    // Create new comment
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userImage: user.image,
      content: newComment,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
    }

    // Add to comments
    setComments((prev) => [comment, ...prev])
    setNewComment("")
    setIsLoading(false)
  }

  const handleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  const handleDislike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment)),
    )
  }

  const handleDelete = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comments ({comments.length})</h3>

      {user ? (
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddComment} disabled={!newComment.trim() || isLoading}>
                Comment
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4 text-center">
            <p className="mb-2">Sign in to add a comment</p>
            <Button variant="outline" onClick={() => {}}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      )}

      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.userImage || ""} alt={comment.userName} />
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-1">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    onClick={() => handleDislike(comment.id)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{comment.dislikes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <Reply className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                  {user && user.id === comment.userId && (
                    <button
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-card rounded-lg text-center">
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

