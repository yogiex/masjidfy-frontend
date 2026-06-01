"use client"

import { Link2, Check } from "lucide-react"
import { useState } from "react"

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  function copyLink() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">Bagikan:</span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent transition-colors"
      >
        📱 WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent transition-colors"
      >
        📘 Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent transition-colors"
      >
        𝕏 Twitter
      </a>
      <button
        onClick={copyLink}
        className="rounded-md border px-2.5 py-1 text-xs hover:bg-accent transition-colors inline-flex items-center gap-1"
      >
        {copied ? <Check className="h-3 w-3" /> : <Link2 className="h-3 w-3" />}
        {copied ? "Tersalin" : "Copy Link"}
      </button>
    </div>
  )
}
