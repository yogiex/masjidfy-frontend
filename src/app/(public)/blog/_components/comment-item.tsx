import { ThumbsUp, Reply } from "lucide-react"

interface CommentItemProps {
  author: string
  date: string
  content: string
  likes: number
  isAuthor?: boolean
  children?: React.ReactNode
}

export function CommentItem({ author, date, content, likes, isAuthor, children }: CommentItemProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {author.charAt(0)}
            </span>
            <span className="font-medium">{author}</span>
            {isAuthor && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                Penulis
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed">{content}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <ThumbsUp className="h-3.5 w-3.5" /> {likes}
          </button>
          <button className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <Reply className="h-3.5 w-3.5" /> Balas
          </button>
        </div>
      </div>
      {children && <div className="ml-6 space-y-3 border-l-2 pl-4">{children}</div>}
    </div>
  )
}
