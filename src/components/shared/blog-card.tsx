import Link from "next/link"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  slug: string
  image?: string
  category: string
  title: string
  excerpt: string
  author: string
  date: string
}

export function BlogCard({ slug, image, category, title, excerpt, author, date }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
    >
      <div className="aspect-[16/9] bg-muted">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted-foreground/30">
            🕌
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {category}
        </span>
        <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> {author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" /> {date}
          </span>
        </div>
      </div>
    </Link>
  )
}
