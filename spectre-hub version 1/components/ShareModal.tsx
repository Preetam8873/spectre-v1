"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, X } from "lucide-react"

export default function ShareModal({ videoUrl, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: "/favicon/whattsap.png",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`,
    },
    { name: "X", icon: "/favicon/x.png", url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}` },
    {
      name: "Facebook",
      icon: "/favicon/facebook.png",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`,
    },
    {
      name: "Email",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
      url: `mailto:?body=${encodeURIComponent(videoUrl)}`,
    },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Video</DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-wrap gap-4 py-4 justify-center">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-muted">
                <img src={option.icon || "/placeholder.svg"} alt={option.name} className="w-8 h-8 object-contain" />
              </div>
              <span className="text-xs">{option.name}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Input value={videoUrl} readOnly className="flex-1" />
          <Button size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

